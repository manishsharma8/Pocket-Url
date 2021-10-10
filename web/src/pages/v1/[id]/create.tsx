import { Field, Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import {
	useCreateShorterUrlMutation,
	useMeQuery,
} from '../../../generated/graphql';
import * as Yup from 'yup';
import Link from 'next/link';
import ActionButton from '../../../components/Dashboard/ActionButton';
import { useCheckUserAuthentication } from '../../../utils/useCheckUserAuthentication';

const UrlSchema = Yup.object().shape({
	longUrl: Yup.string().url('Invalid Url').required('Required'),
	title: Yup.string().required('Required'),
});

const CreateUrl: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [dwarfUrl, setDwarfUrl] = useState<string | null>(null);
	const [urlId, setUrlId] = useState<number>();
	const [, createUrl] = useCreateShorterUrlMutation();
	const user = useCheckUserAuthentication();

	useEffect(() => {
		if (user === null) {
			router.push('/login?redirect=true');
		}
	}, [user, router]);

	let fieldOnSubmit: any;

	if (dwarfUrl) {
		fieldOnSubmit = (
			<div className="mt-5">
				<label
					className="text-left px-3 text-gray-300 text-base"
					htmlFor="dwarfUrl"
				>
					Your Pocket Url
				</label>
				<Field
					className="w-full outline-none rounded px-3 py-2 bg-gray-800 text-gray-300"
					id="dwarfUrl"
					name="dwarfUrl"
					value={dwarfUrl}
				/>
				<ActionButton
					userId={user?.id as string}
					id={urlId as number}
					dwarfUrl={dwarfUrl}
				/>
			</div>
		);
	} else {
		fieldOnSubmit = null;
	}

	if (user) {
		return (
			<DashboardLayout>
				<Link passHref href={`/v1/${user.id}`}>
					<div className="mx-10 my-6 flex text-xl hover:-translate-x-2 ease-in transition transform cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 my-auto mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						Home
					</div>
				</Link>
				<div className="grid m-10">
					<div className="flex justify-center items-center text-white my-10 mx-auto w-2/5">
						<div className="border-2 border-gray-800 p-10 rounded">
							<div className="text-3xl mt-10 mb-3 text-center font-bold">
								Shorten Your Url
							</div>
							<div className="text-lg text-center mb-10 text-gray-500">
								Amet qui eiusmod veniam non veniam et.
							</div>
							<Formik
								initialValues={{ longUrl: '', alias: undefined, title: '' }}
								validationSchema={UrlSchema}
								onSubmit={async (values) => {
									if (dwarfUrl) {
										router.push('/');
									} else {
										const response = await createUrl({
											longUrl: values.longUrl,
											shortUrl: values.alias,
											title: values.title,
										});
										if (response.data?.createShorterUrl) {
											setUrlId(response.data.createShorterUrl.id);
											setDwarfUrl(
												`http://localhost:3000/${response.data?.createShorterUrl.shortUrl}`
											);
										}
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

										<label
											className="text-left p-2 text-gray-300 text-base inline-block mt-5"
											htmlFor="title"
										>
											Title<span className="ml-1 text-red-400">*</span>
										</label>
										<Field
											className="w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
											id="title"
											name="title"
											autoComplete="off"
											placeholder=""
										/>
										{errors.title && touched.title ? (
											<div className="text-base text-left text-red-400 ml-2">
												{errors.title}
											</div>
										) : null}

										<label
											className="text-left p-2 text-gray-300 text-base inline-block mt-5"
											htmlFor="alias"
										>
											Customize your link
										</label>
										<div className="flex justify-center items-center">
											<span className="bg-gray-800 px-3 py-2 text-gray-500 border-r-2 border-gray-700">
												http://localhost:3000/
											</span>
											<Field
												className="w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
												id="alias"
												name="alias"
												autoComplete="off"
												placeholder="alias"
											/>
										</div>

										{fieldOnSubmit}
										<button
											className="block mx-auto mt-12 mb-7 bg-blue-500 text-white w-full py-2 rounded"
											type="submit"
										>
											{!dwarfUrl ? 'Create' : 'Back to Home'}
										</button>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</DashboardLayout>
		);
	} else return null;
};

export default CreateUrl;
