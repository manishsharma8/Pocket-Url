import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MailConfirmation from '../components/MailConfirmation';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [complete, setComplete] = useState<boolean>(false);
	const [, forgotPassword] = useForgotPasswordMutation();
	return (
		<Layout>
			<div className="flex h-screen justify-center items-center text-white">
				{complete ? (
					<MailConfirmation />
				) : (
					<div className="w-2/5 border-2 border-gray-800 p-10 rounded">
						<div className="text-3xl mt-10 mb-3 text-center font-bold">
							Forgot Your Password?
						</div>
						<div className="text-lg text-center mb-10 text-gray-500">
							Enter your email address below and we will send you a link to
							reset your password
						</div>
						<Formik
							initialValues={{ email: '' }}
							onSubmit={async (values) => {
								await forgotPassword(values);
								setComplete(true);
							}}
						>
							{({ errors, touched, isSubmitting }) => (
								<Form className="text-xl">
									<label
										className="text-left p-2 text-gray-300 text-base"
										htmlFor="email"
									>
										Email Address
										<span className="ml-1 text-red-400">*</span>
									</label>
									<Field
										className="mt-2 mb-6 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
										id="email"
										name="email"
										autoComplete="off"
									/>
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
										{isSubmitting ? 'Please Wait' : 'Reset'}
									</button>
								</Form>
							)}
						</Formik>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default ForgotPassword;
