import { Url } from '../entities/Url';
import {
	Resolver,
	Arg,
	Mutation,
	Query,
	Ctx,
	UseMiddleware,
} from 'type-graphql';
import { nanoid } from 'nanoid';
import { MyContext } from '../types';
import { isAuth } from '../middleware/isAuth';
import { User } from '../entities/User';

@Resolver(Url)
export class UrlResolver {
	@Query(() => [Url], { nullable: true })
	async Urls(): Promise<Url[] | undefined> {
		return Url.find({
			order: {
				id: 'DESC',
			},
		});
	}

	@Query(() => [Url], { nullable: true })
	async getUserUrls(@Ctx() { req }: MyContext): Promise<Url[] | undefined> {
		return Url.find({
			where: {
				creatorId: req.session.userId,
			},
			order: {
				createdAt: 'DESC',
			},
		});
	}

	@Query(() => Url, { nullable: true })
	async getUrl(@Arg('shortUrl') shortUrl: string): Promise<Url | undefined> {
		return Url.findOne({ where: { shortUrl } });
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Url)
	async createShorterUrl(
		@Arg('longUrl') longUrl: string,
		@Ctx() { req }: MyContext
	) {
		const shortUrl = nanoid(7);
		return Url.create({
			longUrl,
			shortUrl,
			creatorId: req.session.userId,
		}).save();
	}
}
