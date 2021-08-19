import {
	Resolver,
	Arg,
	Mutation,
	ObjectType,
	Field,
	Query,
	Ctx,
} from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { UserFieldInput } from './UserFieldInput';
import { validateRegister } from '../utils/validateRegister';
import { MyContext } from '../types';
import { nanoid } from 'nanoid';
import { FORGOT_PASSWORD_PREFIX } from '../constants';
import { sendMail } from '../utils/sendMail';
import { SimpleConsoleLogger } from 'typeorm';

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver(User)
export class UserResolver {
	@Query(() => User, { nullable: true })
	me(@Ctx() { req, res }: MyContext) {
		if (!req.session.userId) {
			return null;
		} else {
			return User.findOne(req.session.userId);
		}
	}

	@Query(() => [User], { nullable: true })
	allUser(): Promise<User[]> {
		return User.find({});
	}

	@Mutation(() => UserResponse)
	async signup(
		@Arg('options') options: UserFieldInput,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const errors = validateRegister(options);
		if (errors) {
			return { errors };
		}
		const hashedPassword = await argon2.hash(options.password);
		let user;
		try {
			user = await User.create({
				username: options.username,
				email: options.email,
				password: hashedPassword,
			}).save();
		} catch (err) {
			return err;
		}

		req.session.userId = user.id;
		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('usernameOrEmail') usernameOrEmail: string,
		@Arg('password') password: string,
		@Ctx() { req }: MyContext
	) {
		const user = await User.findOne(
			usernameOrEmail.includes('@')
				? { where: { email: usernameOrEmail } }
				: { where: { username: usernameOrEmail } }
		);
		if (!user) {
			return {
				errors: [
					{
						field: 'usernameOrEmail',
						message: "Username or Email doesn't exist",
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, password);
		if (!valid) {
			return {
				errors: [
					{
						field: 'password',
						message: 'Incorrect Password',
					},
				],
			};
		}
		req.session.userId = user.id;
		return { user };
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('email') email: string,
		@Ctx() { redis }: MyContext
	) {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return true;
		}

		const token = nanoid();
		await redis.set(
			FORGOT_PASSWORD_PREFIX + token,
			user.id,
			'ex',
			1000 * 60 * 60 * 24 * 3 // 3 days expiry time
		);

		await sendMail(
			email,
			`<div><a href="http://localhost:3000/change-password/${token}">Reset Password</a></div>`
		);
		return true;
	}

	@Mutation(() => UserResponse)
	async changePassword(
		@Arg('token') token: string,
		@Arg('newPassword') newPassword: string,
		@Ctx() { redis, req }: MyContext
	) {
		if (newPassword.length <= 2) {
			return {
				errors: [
					{
						field: 'newPassword',
						message: 'Password must be at least 2 characters long',
					},
				],
			};
		}

		const key = FORGOT_PASSWORD_PREFIX + token;
		const userId = await redis.get(key);
		if (!userId) {
			return {
				errors: [
					{
						field: 'token',
						message: 'Token Expired!',
					},
				],
			};
		}

		const user = await User.findOne(userId);
		if (!user) {
			return {
				errors: [
					{
						field: 'token',
						message: 'User does not exist.',
					},
				],
			};
		}
		await User.update(
			{ id: userId },
			{ password: await argon2.hash(newPassword) }
		);
		await redis.del(key);
		req.session.userId = user.id;
		return { user };
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) => {
			res.clearCookie(process.env.COOKIE_NAME as string);
			req.session.destroy((err) => {
				if (err) {
					resolve(false);
				}
				resolve(true);
			});
		});
	}
}
