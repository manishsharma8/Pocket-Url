import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import { useGetUserUrlsQuery, useMeQuery } from '../../../generated/graphql';

const Dashboard: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data, fetching }] = useMeQuery();
	const [{ data: urls }] = useGetUserUrlsQuery();

	useEffect(() => {
		if (!data?.me && !fetching) {
			router.push('/');
		}
	}, [data, router, fetching]);

	if (fetching) {
		return <div>Loading...</div>;
	}

	const returnDate = (timeStamp: string) => {
		let date = new Date(parseInt(timeStamp));
		var options: any = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		return new Intl.DateTimeFormat('en-US', options).format(date);
	};

	console.log(urls?.getUserUrls);
	if (data?.me) {
		return (
			<DashboardLayout>
				<div className="grid grid-cols-3">
					<div className="bg-gray-900">
						{urls?.getUserUrls?.map((url) => (
							<div key={url.id}>
								<div className="px-8 py-5 cursor-pointer hover:bg-gray-800">
									<div className="text-sm text-gray-400">
										{returnDate(url.createdAt)}
									</div>
									<div className="text-xl">{url.longUrl}</div>
									<div className="mt-2 text-sm text-blue-400">
										{`localhost:3000/${url.shortUrl}`}
									</div>
								</div>
							</div>
						))}
					</div>
					<div>Info</div>
				</div>
			</DashboardLayout>
		);
	} else return null;
};

export default Dashboard;
