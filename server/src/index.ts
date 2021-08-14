import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createConnection } from 'typeorm';
import { Url } from './entities/Url';
import { UrlResolver } from './resolvers/url';
import cors from 'cors';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { Visit } from './entities/Visit';
import { VisitResolver } from './resolvers/visit';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		database: 'dwarf',
		username: 'postgres',
		password: 'postgres',
		logging: true,
		synchronize: true,
		entities: [Url, User, Visit],
	});

	// await Url.delete({});
	// await User.delete({});

	const app = express();

	const RedisStore = connectRedis(session);
	const redis = new Redis();

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		})
	);

	app.use(
		session({
			name: 'qid',
			store: new RedisStore({ client: redis, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 2, //2 days
				httpOnly: true,
				sameSite: 'lax', //csrf
				secure: false, //cookie only works in https
			},
			saveUninitialized: false,
			secret: 'fsxkdbkjwnijsolqk',
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UrlResolver, UserResolver, VisitResolver],
			validate: false,
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
		context: ({ req, res }) => ({
			req,
			res,
			redis,
		}),
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(4000, () => {
		console.log('Server started at localhost:4000');
	});
};

main();
