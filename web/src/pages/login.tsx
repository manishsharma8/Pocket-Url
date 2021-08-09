import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useLoginMutation } from '../generated/graphql';

const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
	return (
		<Layout>
			<div className="flex h-screen justify-center items-center text-white">
				<div className="w-2/5 border-2 border-gray-800 p-10 rounded">
					<div className="text-3xl mt-10 mb-3 text-center font-bold">
						Login and Get Started
					</div>
					<div className="text-lg text-center mb-10 text-gray-500">
						Don&apos;t have an account?{' '}
						<span className="text-blue-500 underline">
							<Link href="/signup">Sign Up</Link>
						</span>
					</div>
					<Formik
						initialValues={{ usernameOrEmail: '', password: '' }}
						onSubmit={async (values, actions) => {
							await login(values);
							await router.push('/');
							router.reload();
						}}
					>
						{({ errors, touched }) => (
							<Form className="text-xl">
								<label
									className="text-left p-2 text-gray-300 text-base"
									htmlFor="usernameOrEmail"
								>
									Email Address or Username
									<span className="ml-1 text-red-400">*</span>
								</label>
								<Field
									className="mt-2 mb-6 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
									id="usernameOrEmail"
									name="usernameOrEmail"
									autoComplete="off"
								/>
								{/* {errors.longUrl && touched.longUrl ? (
									<div className="text-base text-left text-red-400 ml-2">
										{errors.longUrl}
									</div>
								) : null} */}

								<label
									className="text-left p-2 text-gray-300 text-base"
									htmlFor="password"
								>
									Password
									<span className="ml-1 text-red-400">*</span>
								</label>
								<Field
									className="mt-2 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
									id="password"
									name="password"
									autoComplete="off"
								/>
								<div className="float-right mt-2 text-base">
									Forgot Password?
								</div>
								<button
									className="block mx-auto mt-16 mb-6 bg-blue-500 text-white w-full py-2 rounded"
									type="submit"
								>
									Log In
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default Login;