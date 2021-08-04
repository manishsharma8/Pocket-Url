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
		window.location.href = data.getUrl?.longUrl as string;
		return null;
	} else return <></>;
};

export default RedirectUrl;
