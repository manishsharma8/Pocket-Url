import { Url } from '../entities/Url';
import {
	Resolver,
	Arg,
	Mutation,
	Query,
	Ctx,
	UseMiddleware,
	Int,
} from 'type-graphql';
import { nanoid } from 'nanoid';
import { MyContext } from '../types';
import { isAuth } from '../middleware/isAuth';

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

	@Query(() => Url, { nullable: true })
	async getUrlById(@Arg('id', () => Int) id: number): Promise<Url | undefined> {
		return Url.findOne({ id });
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Url)
	async createShorterUrl(
		@Arg('longUrl') longUrl: string,
		@Arg('title') title: string,
		@Arg('shortUrl', { nullable: true }) shortUrl: string,
		@Ctx() { req }: MyContext
	) {
		if (shortUrl) {
			const url = await Url.findOne({ where: { shortUrl: shortUrl } });
			if (!url) {
				try {
					return Url.create({
						longUrl,
						shortUrl,
						creatorId: req.session.userId,
						title,
					}).save();
				} catch (err) {
					return err;
				}
			} else throw new Error('This alias already exists!');
		} else {
			const _shortUrl = nanoid(7);
			return Url.create({
				longUrl,
				shortUrl: _shortUrl,
				creatorId: req.session.userId,
				title,
			}).save();
		}
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Url)
	async editUrl(
		@Arg('id', () => Int) id: number,
		@Arg('title') title: string,
		@Arg('shortUrl') shortUrl: string
	) {
		const url = await Url.findOne({ where: { shortUrl } });
		if (url) {
			if (url?.id === id) {
				await Url.update({ id }, { title, shortUrl });
			} else throw new Error('This alias already exists!');
		} else if (!url) {
			await Url.update({ id }, { title, shortUrl });
		}
		return Url.findOne(id);
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async deleteUrl(@Arg('id', () => Int) id: number, @Ctx() { req }: MyContext) {
		await Url.delete({ id, creatorId: req.session.userId });
		return true;
	}
}
