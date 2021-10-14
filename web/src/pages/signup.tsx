import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useSignupMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const SignUp: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, signup] = useSignupMutation();

	return (
		<Layout>
			<div className="flex my-12 justify-center items-center text-white">
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
							console.log(values);
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
								<InputField
									field="username"
									label="Username"
									errors={errors.username}
									touched={touched.username}
									required
								/>
								<InputField
									field="email"
									label="Email Address"
									errors={errors.email}
									touched={touched.email}
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
