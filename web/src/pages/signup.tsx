import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import { useSignupMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const SignUp: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, signup] = useSignupMutation();

	return (
		<Layout>
			<div className="flex h-screen justify-center items-center text-white">
				<div className="w-2/5 border-2 border-gray-800 p-10 rounded">
					<div className="text-3xl mt-10 mb-3 text-center font-bold">
						Create an Account Now!
					</div>
					<div className="text-lg text-center mb-10 text-gray-500">
						Already have an account?{' '}
						<span className="text-blue-500 underline">
							<Link href="/login">Login</Link>
						</span>
					</div>
					<Formik
						initialValues={{ username: '', email: '', password: '' }}
						onSubmit={async (values, { setErrors }) => {
							const response = await signup({ options: values });
							if (response.data?.signup.errors) {
								const errorMap = toErrorMap(response.data.signup.errors);
								setErrors(errorMap);
							} else if (response.data?.signup.user) {
								await router.push('/');
								router.reload();
							}
						}}
					>
						{({ errors, touched }) => (
							<Form className="text-xl">
								<label
									className="text-left p-2 text-gray-300 text-base"
									htmlFor="username"
								>
									Username
									<span className="ml-1 text-red-400">*</span>
								</label>
								<Field
									className="mt-2 mb-2 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
									id="username"
									name="username"
									autoComplete="off"
								/>
								{errors.username && touched.username ? (
									<div className="text-base text-left text-red-400 ml-2 mb-4">
										{errors.username}
									</div>
								) : null}

								<label
									className="text-left p-2 text-gray-300 text-base"
									htmlFor="email"
								>
									Email Address
									<span className="ml-1 text-red-400">*</span>
								</label>
								<Field
									className="mt-2 mb-2 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
									id="email"
									name="email"
									autoComplete="off"
								/>
								{errors.email && touched.email ? (
									<div className="text-base text-left text-red-400 ml-2 mb-4">
										{errors.email}
									</div>
								) : null}
								<label
									className="text-left p-2 text-gray-300 text-base"
									htmlFor="password"
								>
									Password
									<span className="ml-1 text-red-400">*</span>
								</label>
								<Field
									className="mt-2 mb-2 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
									id="password"
									name="password"
									autoComplete="off"
								/>
								{errors.password && touched.password ? (
									<div className="text-base text-left text-red-400 ml-2 mb-4">
										{errors.password}
									</div>
								) : null}
								<button
									className="block mx-auto mt-16 mb-6 bg-blue-500 text-white w-full py-2 rounded"
									type="submit"
								>
									Sign Up
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default SignUp;
