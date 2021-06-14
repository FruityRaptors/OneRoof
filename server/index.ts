import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express'
import { connectDB } from "./database";
import express from "express";
import { buildSchema } from 'type-graphql'
import { userResolvers } from "./resolvers/userResolvers"
import { todoResolvers } from "./resolvers/todoResolvers";
import { houseResolvers } from "./resolvers/houseResolvers";
import { dmResolvers } from "./resolvers/dmResolvers"
import { choreResolvers } from "./resolvers/choreResolvers"
import { modulesResolvers } from "./resolvers/modulesResolvers"
import path from "path"

(async () => {
  console.log("setting up express")
  const app = express();
  app.use(express.static(path.resolve(__dirname,"..", "..", "dist")))
  app.set('view engine', 'pug');
  app.enable('trust proxy');
  console.log('set up express successful!')
  try {
    await connectDB()
    console.log("connecting to SQL database")
  } catch (err) {
    console.log(err)
  }

  console.log('Starting Apollo Server')
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolvers, todoResolvers, houseResolvers, choreResolvers, dmResolvers, modulesResolvers],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"..", "..", "dist"))
  })
  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 8080;

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








