import { Url } from '../entities/Url';
import { Resolver, Arg, Mutation, Query } from 'type-graphql';
import { nanoid } from 'nanoid';

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

	@Query(() => Url, { nullable: true })
	async getUrl(@Arg('shortUrl') shortUrl: string): Promise<Url | undefined> {
		return Url.findOne({ where: { shortUrl } });
	}

	@Mutation(() => Url)
	async createShorterUrl(@Arg('longUrl') longUrl: string) {
		const shortUrl = nanoid(7);
		console.log(shortUrl);
		return Url.create({
			longUrl,
			shortUrl,
		}).save();
	}
}
