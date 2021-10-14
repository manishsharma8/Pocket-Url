export function getWeek(start = new Date()) {
	return Array.from({ length: 7 }, (_, index) => {
		let temp: any = {};
		const startDay = start.getDay() === 0 ? 7 : start.getDay();
		const day = start.setDate(start.getDate() - startDay + index + 1);

		const dayString = new Date(day).toISOString().slice(0, 10);
		temp = {
			date: dayString,
			count: 0,
		};
		return temp;
	});
}
