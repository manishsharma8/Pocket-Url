import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useLogoutMutation } from '../../generated/graphql';

interface AvatarMenuProps {
	id: string;
	username: string;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ id, username }) => {
	const router = useRouter();
	const [, logout] = useLogoutMutation();

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="rounded-full w-10 h-10 bg-gray-800">
					{username.charAt(0).toUpperCase()}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? 'bg-gray-700' : ''
									} group flex rounded-md items-center w-full px-2 py-2 text-white text-base`}
								>
									Profile
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? 'bg-gray-700' : ''
									} group flex rounded-md items-center w-full px-2 py-2 text-white text-base`}
								>
									Help Center
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? 'bg-gray-700' : ''
									} group flex rounded-md items-center w-full px-2 py-2 text-white text-base`}
								>
									Resources
								</button>
							)}
						</Menu.Item>
					</div>
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={async () => {
										console.log('Out');
										await logout();
										router.reload();
									}}
									className={`${
										active ? 'bg-gray-700' : ''
									} group flex rounded-md items-center w-full px-2 py-2 text-white text-base`}
								>
									Logout
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default AvatarMenu;
