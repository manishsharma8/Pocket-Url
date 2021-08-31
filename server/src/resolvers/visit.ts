import { Visit } from '../entities/Visit';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver(Visit)
export class VisitResolver {
	@Query(() => [Visit])
	async urlVisits(@Arg('id', () => Int) id: number) {
		return Visit.find({ where: { urlId: id } }); //take
	}

	@Mutation(() => Visit)
	async countPlusOne(@Arg('id', () => Int) id: number) {
		const urlVisits = await Visit.find({ where: { urlId: id } });

		let date = new Date();
		const offset = date.getTimezoneOffset();
		date = new Date(date.getTime() - offset * 60 * 1000);
		const today = date.toISOString().split('T')[0];

		if (urlVisits.length > 0) {
			const res = urlVisits.find((ele) => ele.date == today);
			if (res) {
				const result = await getConnection()
					.createQueryBuilder()
					.update(Visit)
					.set({ count: res?.count! + 1 })
					.where('urlId = :id and date = :today', {
						id,
						today,
					})
					.returning('*')
					.execute();
				return result.raw[0];
			} else {
				return Visit.create({
					date: today,
					urlId: id,
					count: 1,
				}).save();
			}
		} else {
			return Visit.create({
				date: today,
				urlId: id,
				count: 1,
			}).save();
		}
	}

	@Mutation(() => Visit)
	async genCount(@Arg('id', () => Int) id: number) {
		let date = new Date();
		const today = date.toLocaleDateString();

		const re = await Visit.create({
			date: today,
			urlId: id,
		}).save();
		return re;
	}

	@Query(() => [Visit])
	async allVisits() {
		return Visit.find({});
	}
}
