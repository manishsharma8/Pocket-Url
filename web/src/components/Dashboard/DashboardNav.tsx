import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import AvatarMenu from './AvatarMenu';

const DashboardNav: React.FC<{}> = ({}) => {
	const [{ data, fetching }] = useMeQuery();
	const router = useRouter();

	if (fetching) {
		return <></>;
	} else if (data?.me) {
		return (
			<div className="flex px-10 py-4 text-white border-b-2 border-gray-800 bg-gray-900 z-10">
				<div className="text-2xl font-bold">
					<Link href={`/v1/${data.me.id}`}>PocketUrl</Link>
				</div>
				<div className="ml-auto">
					<div className="flex text-lg gap-8">
						<button
							onClick={() => router.push(`${router.asPath}/create`)}
							className="bg-purple-500 text-base px-3 py-2 rounded"
						>
							Create Url
						</button>

						<AvatarMenu id={data.me.id} username={data.me.username} />
					</div>
				</div>
			</div>
		);
	} else return null;
};

export default DashboardNav;
