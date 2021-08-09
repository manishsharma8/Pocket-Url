import { useRouter } from 'next/router';
import { useGetUrlQuery } from '../generated/graphql';

const RedirectUrl = () => {
	const router = useRouter();
	const [{ data, fetching }] = useGetUrlQuery({
		variables: {
			shortUrl:
				typeof router.query.token === 'string' ? router.query.token : '',
		},
	});

	if (data) {
		const longUrl = data.getUrl?.longUrl;
		if (longUrl?.includes('http')) {
			window.location.assign(longUrl);
		} else {
			window.location.assign(`https://${longUrl}`);
		}
		return null;
	} else return <></>;
};

export default RedirectUrl;
