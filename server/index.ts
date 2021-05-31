import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express'
import { connectDB } from "./database";
import express from "express";
import { buildSchema } from 'type-graphql'
import { userResolvers } from "./resolvers/userResolvers"
import { todoResolver } from "./resolvers/todoResolver";
import { houseResolver } from "./resolvers/houseResolver"


(async () => {
  console.log("spinning up express")
  const app = express();
console.log("connecting to SQL database")
  try {
    await connectDB()
  } catch (err) {
    console.log(err)
  }

  console.log('Starting Apollo Server')
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolvers, todoResolver, houseResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;

  console.log('launching server...')
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/`);
  });
})();




















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








