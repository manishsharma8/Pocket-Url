import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCountPlusOneMutation, useGetUrlQuery } from '../generated/graphql';

const RedirectUrl = () => {
	const router = useRouter();
	const [, countPlusOne] = useCountPlusOneMutation();
	const [{ data, fetching }] = useGetUrlQuery({
		variables: {
			shortUrl:
				typeof router.query.token === 'string' ? router.query.token : '',
		},
	});

	useEffect(() => {
		const count = async () => {
			if (data) {
				const longUrl = data.getUrl?.longUrl;
				await countPlusOne({ id: data.getUrl?.id! });
				if (longUrl?.includes('http')) {
					window.location.assign(longUrl);
				} else {
					window.location.assign(`https://${longUrl}`);
				}
			}
		};
		count();
	}, [data, countPlusOne]);

	return null;
};

export default RedirectUrl;
