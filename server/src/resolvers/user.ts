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
		console.log('me query --->', req.session);
		if (!req.session.userId) {
			return null;
		} else {
			return User.findOne(req.session.userId);
		}
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
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) => {
			res.clearCookie('qid');
			req.session.destroy((err) => {
				if (err) {
					resolve(false);
				}
				resolve(true);
			});
		});
	}
}
