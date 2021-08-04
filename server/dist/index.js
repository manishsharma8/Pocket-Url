"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const apollo_server_core_1 = require("apollo-server-core");
const typeorm_1 = require("typeorm");
const Url_1 = require("./entities/Url");
const url_1 = require("./resolvers/url");
const cors_1 = __importDefault(require("cors"));
const User_1 = require("./entities/User");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const main = async () => {
    const conn = await typeorm_1.createConnection({
        type: 'postgres',
        database: 'dwarf',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [Url_1.Url, User_1.User],
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: 'qid',
        store: new RedisStore({ client: redis, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 2,
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        },
        saveUninitialized: false,
        secret: 'fsxkdbkjwnijsolqk',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, url_1.UrlResolver, user_1.UserResolver],
            validate: false,
        }),
        plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground()],
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
//# sourceMappingURL=index.js.map