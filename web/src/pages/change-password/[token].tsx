import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [tokenError, setTokenError] = useState('');
	const [, changePassword] = useChangePasswordMutation();
	return (
		<Layout>
			<div className="justify-center items-center text-white">
				<div className="my-32 w-2/5 mx-auto border-2 border-gray-800 p-10 rounded">
					{tokenError ? (
						<>
							<div className="text-center text-2xl">{tokenError}</div>
							<div className="mt-5 text-center text-lg bg-blue-500 hover:bg-blue-600 ease-in transition cursor-pointer rounded py-3">
								<Link href="/forgot-password">Generate a new token</Link>
							</div>
						</>
					) : (
						<>
							<div className="text-3xl mt-10 mb-3 text-center font-bold">
								Change Password
							</div>
							<div className="text-lg text-center mb-10 text-gray-500">
								Enter a new password for your account
							</div>
							<Formik
								initialValues={{ newPassword: '' }}
								onSubmit={async (values, { setErrors }) => {
									const response = await changePassword({
										newPassword: values.newPassword,
										token:
											typeof router.query.token === 'string'
												? router.query.token
												: '',
									});
									if (response.data?.changePassword.errors) {
										const errorMap = toErrorMap(
											response.data.changePassword.errors
										);
										console.log('errorMap', errorMap);
										if ('token' in errorMap) {
											setTokenError(errorMap.token);
										}
										setErrors(errorMap);
									} else if (response.data?.changePassword.user) {
										router.push('/');
									}
								}}
							>
								{({ isSubmitting, errors, touched }) => (
									<Form className="text-xl">
										<label
											className="text-left p-2 text-gray-300 text-base"
											htmlFor="newPassword"
										>
											New Password
											<span className="ml-1 text-red-400">*</span>
										</label>
										<Field
											className="mt-2 mb-2 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
											id="newPassword"
											name="newPassword"
											autoComplete="off"
										/>
										{errors.newPassword && touched.newPassword ? (
											<div className="text-red-500 text-sm">
												{errors.newPassword}
											</div>
										) : null}
										<button
											className="flex justify-center items-center mx-auto mt-8 mb-6 bg-blue-500 text-white w-full py-2 rounded"
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
											{isSubmitting ? 'Please Wait' : 'Change Password'}
										</button>
									</Form>
								)}
							</Formik>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default ChangePassword;
