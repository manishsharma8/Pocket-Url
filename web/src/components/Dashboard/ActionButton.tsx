import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDeleteUrlMutation } from '../../generated/graphql';
import Toast from '../Toast';

interface ActionButtonProps {
	userId: string;
	id: number;
	dwarfUrl: string;
	deleteButton?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	dwarfUrl,
	deleteButton,
	id,
	userId,
}) => {
	const [, deleteUrl] = useDeleteUrlMutation();
	const [message, setMessage] = useState<string | null>(null);
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			if (message) {
				setShow(false);
				setMessage(null);
			}
		}, 5000);
		return () => clearInterval(interval);
	}, [message]);

	return (
		<div
			className={`grid ${
				deleteButton ? 'grid-cols-5' : 'grid-cols-4'
			} gap-3 mt-10 text-base text-center`}
		>
			{show && message ? <Toast message={message} /> : null}
			<button
				className="bg-green-500 hover:bg-transparent border-green-500  ease-in transition border-2 px-2 py-2 rounded flex items-center justify-center gap-1"
				type="button"
				onClick={() => window.open(dwarfUrl, '_blank')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
				Redirect
			</button>
			<Link href={`${router.asPath}/edit/${id}`} passHref>
				<button className="bg-green-500 hover:bg-transparent border-green-500 ease-in transition border-2 px-2 py-2 rounded flex items-center justify-center gap-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
					Edit
				</button>
			</Link>
			<button className="bg-green-500 hover:bg-transparent border-green-500 ease-in transition border-2 px-2 py-2 rounded flex items-center justify-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
					/>
				</svg>
				Share
			</button>
			<button
				className="bg-green-500 hover:bg-transparent border-green-500 ease-in transition border-2 px-2 py-2 rounded flex items-center justify-center gap-1"
				type="button"
				onClick={() => {
					navigator.clipboard.writeText(dwarfUrl);
					setMessage('Copied to Clipboard!');
					setShow(true);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
					/>
				</svg>
				Copy
			</button>
			{deleteButton ? (
				<button
					className="bg-green-500 hover:bg-transparent border-green-500 ease-in transition border-2 px-2 py-2 rounded flex items-center justify-center gap-1"
					type="button"
					onClick={async () => {
						await deleteUrl({ id });
						setMessage('Link Deleted!');
						setShow(true);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
					Delete
				</button>
			) : null}
		</div>
	);
};

export default ActionButton;
