import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
	return (
		<Layout>
			<div className="flex my-12 justify-center items-center text-white">
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
						onSubmit={async (values, { setErrors }) => {
							const response = await login(values);
							if (response.data?.login.errors) {
								const errorMap = toErrorMap(response.data.login.errors);
								setErrors(errorMap);
							} else if (response.data?.login.user) {
								await router.push('/');
								router.reload();
							}
						}}
					>
						{({ errors, touched }) => (
							<Form className="text-xl">
								<InputField
									field="usernameOrEmail"
									label="Username Or Email Address"
									errors={errors.usernameOrEmail}
									touched={touched.usernameOrEmail}
									required
								/>
								<InputField
									field="password"
									label="Password"
									errors={errors.password}
									touched={touched.password}
									required
								/>
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
