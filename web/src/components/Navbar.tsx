import React from 'react';
import Link from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';

const Navbar: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data, fetching }] = useMeQuery({ pause: isServer() });
	const [, logout] = useLogoutMutation();

	let navLinks;
	if (!data?.me) {
		navLinks = (
			<>
				<div className="hover:text-blue-500">
					<Link href="/login">Login</Link>
				</div>
				<div className="hover:text-blue-500">
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
		<div className="flex px-10 py-4 text-white border-b-2 border-gray-800 bg-gray-900 z-10">
			<div className="text-2xl font-bold">
				<Link href="/">TinyUrl</Link>
			</div>
			<div className="ml-auto">
				<div className="flex text-lg gap-5">{navLinks}</div>
			</div>
		</div>
	);
};

export default Navbar;