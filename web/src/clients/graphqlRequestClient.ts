import { GraphQLClient } from 'graphql-request';

const requestHeaders = {
	authorization: 'Bearer MY_TOKEN',
};

const graphqlRequestClient = new GraphQLClient(
	'http://localhost:4000/graphql' as string,
	{ headers: requestHeaders }
);

export default graphqlRequestClient;
