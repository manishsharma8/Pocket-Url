import React, { useEffect, useState } from 'react';
import { useCreateShorterUrlMutation, useMeQuery } from '../generated/graphql';
import * as Yup from 'yup';
import Image from 'next/image';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { isServer } from '../utils/isServer';
import heroImage from '../public/hero_image.svg';

const UrlSchema = Yup.object().shape({
	longUrl: Yup.string().url('Invalid Url').required('Required'),
});

const App = (props: any) => {
	const router = useRouter();
	const [dwarfUrl, setDwarfUrl] = useState<string | null>(null);
	const [, createUrl] = useCreateShorterUrlMutation();
	const [{ data, fetching }] = useMeQuery({ pause: isServer() });

	useEffect(() => {
		if (data?.me) {
			router.push(`/v1/${data.me.id}`);
		}
	}, [data, router]);

	return (
		<Layout>
			<div className="grid grid-cols-5 m-16 h-4/6">
				<div className="col-start-1 col-end-4 my-auto">
					<div className="text-6xl font-bold">Short links, big results</div>
					<p className="text-2xl text-gray-400 mt-7 w-3/4">
						Enim cillum culpa enim incididunt fugiat duis laboris. Commodo nisi
						ex ex id aute.
					</p>
					<button className="bg-blue-500 text-xl rounded px-4 py-3 mt-12 hover:bg-blue-600">
						Get Started
					</button>
				</div>
				<div className="w-4/5 col-start-4 col-end-6 my-auto">
					<Image src={heroImage} alt="hero-image" />
				</div>
			</div>
		</Layout>
	);
};

export default App;
