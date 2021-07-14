import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./database";
import express from "express";
import { buildSchema } from "type-graphql";
import { userResolvers } from "./resolvers/userResolvers";
import { todoResolvers } from "./resolvers/todoResolvers";
import { houseResolvers } from "./resolvers/houseResolvers";
import { dmResolvers } from "./resolvers/dmResolvers";
import { choreResolvers } from "./resolvers/choreResolvers";
import { moduleResolvers } from "./resolvers/moduleResolvers";
import { groceryItemResolvers } from "./resolvers/groceryItemResolvers";
import path from "path";
import history from "connect-history-api-fallback";
import sqlConfig from "../ormconfig";

// import { parse } from 'pg-connection-string'
// const databaseUrl:string = process.env.DATABASE_URL
// const connectionOptions = parse(databaseUrl)

(async () => {
  console.log("setting up express");

  const app = express();

  // for dev serving (locally), comment out the following lines:
  app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

  app.use(
    history({
      disableDotRule: true,
      verbose: true,
    })
  );

  app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
  //   // ^^until here^^

  app.set("view engine", "pug");

  app.enable("trust proxy");

  console.log("About to connect SQL Database...");
  try {
    await connectDB();
    console.log("connecting to SQL database");
  } catch (err) {
    console.log("err log when connecting to SQL", err);
  }

  console.log("Starting Apollo Server");
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        userResolvers,
        todoResolvers,
        houseResolvers,
        choreResolvers,
        dmResolvers,
        moduleResolvers,
        groceryItemResolvers,
      ],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist"));
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 8080;

  console.log("launching server...");
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/`);
  });
})();

