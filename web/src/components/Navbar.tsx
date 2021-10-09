import React from 'react';
import Link from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';

const Navbar: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data }] = useMeQuery({ pause: isServer() });
	const [, logout] = useLogoutMutation();

	let navLinks;
	if (!data?.me) {
		navLinks = (
			<>
				<div className="hover:underline">
					<Link href="/login">Login</Link>
				</div>
				<div className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 cursor:pointer">
					<Link href="/signup">Sign Up</Link>
				</div>
			</>
		);
	} else if (data.me) {
		navLinks = (
			<>
				<div className="hover:text-blue-500">
					<Link href="/login">{data.me.username}</Link>
				</div>
				<div className="hover:text-blue-500">
					<button
						onClick={async () => {
							await logout();
							router.push('/');
							router.reload();
						}}
					>
						Logout
					</button>
				</div>
			</>
		);
	}

	return (
		<div className="flex px-10 py-4 text-white border-b-2 border-gray-800 bg-gray-900 z-50 items-center">
			<div className="text-2xl font-bold">
				<Link href="/">PocketUrl</Link>
			</div>
			<div className="ml-auto">
				<div className="flex text-lg font-medium gap-5 items-center">
					{navLinks}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
