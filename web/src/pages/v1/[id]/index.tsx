import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Analytics from '../../../components/Dashboard/Analytics';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import { useGetUserUrlsQuery, useMeQuery } from '../../../generated/graphql';
import { returnDate } from '../../../utils/timestampToDate';

const Dashboard: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data, fetching }] = useMeQuery();
	const [{ data: urls }] = useGetUserUrlsQuery();
	const [selectedUrl, setSelectedUrl] = useState<any>();

	useEffect(() => {
		if (!data?.me && !fetching) {
			router.push('/');
		}
	}, [data, router, fetching]);

	useEffect(() => {
		if (urls?.getUserUrls) {
			setSelectedUrl(urls?.getUserUrls[0]);
		}
	}, [urls]);

	if (fetching) {
		return <div>Loading...</div>;
	}

	if (data?.me) {
		return (
			<div className="h-screen">
				<DashboardLayout>
					{selectedUrl ? (
						<div className="grid grid-cols-7">
							<div className="col-start-1 col-end-3 bg-gray-900 overflow-y-auto divide-y divide-gray-800">
								{urls?.getUserUrls?.map((url) => (
									<div
										onClick={() => {
											setSelectedUrl(url);
										}}
										key={url.id}
									>
										<div
											className={`px-8 py-5 cursor-pointer ${
												url === selectedUrl ? 'bg-gray-800' : ''
											}`}
										>
											<div className="text-sm mb-2 text-gray-400">
												{returnDate(url.createdAt)}
											</div>
											<div className="text-2xl">{url.title}</div>
											<div className="mt-2 text-sm text-blue-400">
												{`localhost:3000/${url.shortUrl}`}
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="col-start-3 col-end-8 overflow-y-auto h-full bg-gray-800">
								<Analytics url={selectedUrl} userId={data.me.id} />
							</div>
						</div>
					) : (
						<div className="text-center mt-32">
							<div className="text-4xl font-bold">
								Create Your First Pocket Url
							</div>
							<button
								onClick={() => router.push(`${router.asPath}/create`)}
								className="bg-purple-500 text-xl px-4 py-3 rounded mt-16"
							>
								Create Url
							</button>
						</div>
					)}
				</DashboardLayout>
			</div>
		);
	} else return null;
};

export default Dashboard;
