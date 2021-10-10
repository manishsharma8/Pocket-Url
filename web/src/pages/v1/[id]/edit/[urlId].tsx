import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../../components/Dashboard/DashboardLayout';
import {
	useEditUrlMutation,
	useGetUrlByIdQuery,
} from '../../../../generated/graphql';
import { useCheckUserAuthentication } from '../../../../utils/useCheckUserAuthentication';

const EditUrl: React.FC<{}> = ({}) => {
	const router = useRouter();
	const user = useCheckUserAuthentication();
	const [{ data: urlData, fetching: urlFetching }] = useGetUrlByIdQuery({
		variables: { id: parseInt(router.query.urlId as string) },
	});
	const [, editUrl] = useEditUrlMutation();

	const [title, setTitle] = useState('');
	const [alias, setAlias] = useState('');
	const [aliasError, setAliasError] = useState<string | null>('');

	useEffect(() => {
		if (user === null) {
			router.push('/login?redirect=true');
		}
		// } else if (
		// 	data?.me?.id !== urlData?.getUrlById?.creatorId &&
		// not!fetching &&
		// not!urlFetching
		// ) {
		// 	router.push(`/v1/${data?.me?.id}`);
		// }

		if (urlData?.getUrlById?.title) {
			setTitle(urlData.getUrlById.title);
		}
		if (urlData?.getUrlById?.shortUrl) {
			setAlias(urlData.getUrlById.shortUrl);
		}
	}, [user, router, urlData, urlFetching]);

	if (user) {
		return (
			<DashboardLayout>
				<div className="grid m-10">
					<div className="flex justify-center items-center text-white my-10 mx-auto w-2/5">
						<div className="border-2 border-gray-800 p-10 rounded">
							<div className="text-3xl mt-10 mb-3 text-center font-bold">
								Edit Link
							</div>
							<Formik
								initialValues={{ alias: '', title: title }}
								onSubmit={async (values) => {
									const response = await editUrl({
										id: parseInt(router.query.urlId as string),
										title: title,
										shortUrl: alias,
									});
									if (response.data?.editUrl) {
										router.push(`/v1/${user.id}`);
									} else if (response.error?.message.includes('alias')) {
										setAliasError('This alias already exists');
									}
								}}
							>
								{({ touched, isSubmitting }) => (
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
											value={urlData?.getUrlById?.longUrl || ''}
										/>

										<label
											className="text-left p-2 text-gray-300 text-base inline-block mt-5"
											htmlFor="title"
										>
											Title
										</label>
										<Field
											className="w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
											id="title"
											name="title"
											value={title}
											onChange={(e: any) => {
												setTitle(e.target.value);
											}}
										/>

										<label
											className="text-left p-2 text-gray-300 text-base inline-block mt-5"
											htmlFor="alias"
										>
											Shorter Link
										</label>
										<div className="flex justify-center items-center">
											<span className="bg-gray-800 px-3 py-2 text-gray-500 border-r-2 border-gray-700">
												http://localhost:3000/
											</span>
											<Field
												className="w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
												id="alias"
												name="alias"
												value={alias}
												onChange={(e: any) => {
													setAlias(e.target.value);
													setAliasError(null);
												}}
											/>
										</div>
										{aliasError && touched.alias ? (
											<div className="text-base text-left text-red-400 ml-2 mb-4">
												{aliasError}
											</div>
										) : null}
										<button
											className="flex justify-center items-center mx-auto mt-5 mb-6 bg-blue-500 text-white w-full py-2 rounded"
											type="submit"
										>
											{isSubmitting ? (
												<svg
													className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
											) : null}
											{isSubmitting ? 'Please Wait' : 'Save'}
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
export default EditUrl;
