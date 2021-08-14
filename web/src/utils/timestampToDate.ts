export const returnDate = (timeStamp: string) => {
	let date = new Date(parseInt(timeStamp));
	var options: any = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return new Intl.DateTimeFormat('en-US', options).format(date);
};
