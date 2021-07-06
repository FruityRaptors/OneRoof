"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const userResolvers_1 = require("./resolvers/userResolvers");
const todoResolvers_1 = require("./resolvers/todoResolvers");
const houseResolvers_1 = require("./resolvers/houseResolvers");
const dmResolvers_1 = require("./resolvers/dmResolvers");
const choreResolvers_1 = require("./resolvers/choreResolvers");
const modulesResolvers_1 = require("./resolvers/modulesResolvers");
const path_1 = __importDefault(require("path"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
// import { parse } from 'pg-connection-string'
// const databaseUrl:string = process.env.DATABASE_URL
// const connectionOptions = parse(databaseUrl)
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("setting up express");
    const app = express_1.default();
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "..", "dist")));
    app.use(connect_history_api_fallback_1.default({
        disableDotRule: true,
        verbose: true
    }));
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "..", "dist")));
    app.set('view engine', 'pug');
    app.enable('trust proxy');
    console.log("About to connect SQL Database...");
    try {
        yield database_1.connectDB();
        console.log("connecting to SQL database");
    }
    catch (err) {
        console.log("err log when connecting to SQL", err);
    }
    console.log('Starting Apollo Server');
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [userResolvers_1.userResolvers, todoResolvers_1.todoResolvers, houseResolvers_1.houseResolvers, choreResolvers_1.choreResolvers, dmResolvers_1.dmResolvers, modulesResolvers_1.modulesResolvers],
            validate: true
        }),
        context: ({ req, res }) => ({ req, res })
    });
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "..", "..", "dist"));
    });
    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 8080;
    console.log('launching server...');
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}/`);
    });
}))();
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
// connectDB().then(async connection => {
//     //create express app
//     express();
//     app.use(bodyParser.json());
//     let user = new Users();
//     user.username = "test subject"
//     user.house_key = "super secured house key"
//     user.email = "sephiroth69xx@gmail.com"
//     user.isAdmin = false
//     return connection.manager
//     .save(user)})
//     .then(user => {
//         console.log ('god tier has been saved')
//     //run app
//     app.listen(PORT);    
//     console.log(`Express application is up and running on port ${PORT}`)
// }).catch(error => console.log(`TypeORM connection error: ${error}`));
