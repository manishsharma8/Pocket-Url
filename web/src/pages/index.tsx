import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, useField } from 'formik';
import { useCreateShorterUrlMutation, useMeQuery } from '../generated/graphql';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { isServer } from '../utils/isServer';

const UrlSchema = Yup.object().shape({
	longUrl: Yup.string().url('Invalid Url').required('Required'),
});

const App = (props: any) => {
	const router = useRouter();
	const [dwarfUrl, setDwarfUrl] = useState<string | null>(null);
	const [, createUrl] = useCreateShorterUrlMutation();
	const [{ data, fetching }] = useMeQuery({ pause: isServer() });

	let fieldOnSubmit: any;

	useEffect(() => {
		if (data?.me) {
			router.push(`/v1/${data.me.id}`);
		}
	}, [data, router]);

	if (dwarfUrl) {
		fieldOnSubmit = (
			<div className="mt-5">
				<label
					className="text-left px-3 text-gray-300 text-base"
					htmlFor="dwarfUrl"
				>
					Your Tiny Url
				</label>
				<Field
					className="w-full outline-none rounded px-3 py-2 bg-gray-800 text-gray-300"
					id="dwarfUrl"
					name="dwarfUrl"
					value={dwarfUrl}
				/>
				<div className="grid grid-cols-4 gap-3 mt-10 text-base text-center">
					<button
						className="bg-green-500 px-2 py-2 rounded flex items-center justify-center gap-1"
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
					<button className="bg-green-500 px-2 py-2 rounded flex items-center justify-center gap-1">
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
					<button className="bg-green-500 px-2 py-2 rounded flex items-center justify-center gap-1">
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
						className="bg-green-500 px-2 py-2 rounded flex items-center justify-center gap-1"
						type="button"
						onClick={() => {
							navigator.clipboard.writeText(dwarfUrl);
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
				</div>
			</div>
		);
	} else {
		fieldOnSubmit = null;
	}

	return (
		<Layout>
			<div className="grid grid-cols-5 m-16">
				<div className="col-start-1 col-end-4 my-auto">
					<div className="text-6xl font-bold">Short links, big results</div>
					<p className="text-2xl text-gray-400 mt-7 w-3/4">
						Enim cillum culpa enim incididunt fugiat duis laboris. Commodo nisi
						ex ex id aute.
					</p>
					<button className="bg-blue-500 text-xl rounded px-4 py-3 mt-12">
						Get Started for Free
					</button>
				</div>
				<div className="flex col-start-4 col-end-6 justify-center items-center text-white my-10">
					<div className="border-2 border-gray-800 p-10 rounded">
						<div className="text-3xl mt-10 mb-3 text-center font-bold">
							Shorten Your Url
						</div>
						<div className="text-lg text-center mb-10 text-gray-500">
							Amet qui eiusmod veniam non veniam et.
						</div>
						<Formik
							initialValues={{ longUrl: '' }}
							validationSchema={UrlSchema}
							onSubmit={async (values) => {
								const response = await createUrl({ longUrl: values.longUrl });
								if (response.data?.createShorterUrl.shortUrl) {
									setDwarfUrl(
										`http://localhost:3000/${response.data?.createShorterUrl.shortUrl}`
									);
								}
							}}
						>
							{({ errors, touched }) => (
								<Form className="text-xl">
									<label
										className="text-left p-2 text-gray-300 text-base"
										htmlFor="longUrl"
									>
										Your Long Url<span className="ml-1 text-red-400">*</span>
									</label>
									<Field
										className="w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
										id="longUrl"
										name="longUrl"
										autoComplete="off"
										placeholder="Paste you link here!"
									/>
									{errors.longUrl && touched.longUrl ? (
										<div className="text-base text-left text-red-400 ml-2">
											{errors.longUrl}
										</div>
									) : null}

									{fieldOnSubmit}
									<button
										className="block mx-auto my-6 bg-blue-500 text-white w-full py-2 rounded"
										type="submit"
									>
										Submit
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default App;
