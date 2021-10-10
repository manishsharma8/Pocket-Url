import router from 'next/router';
import { useMeQuery } from '../generated/graphql';

export const useCheckUserAuthentication = () => {
	const [{ data, fetching }] = useMeQuery();
	if (data && !fetching) {
		return data.me;
	} else if (!fetching) {
		return null;
	}
};
