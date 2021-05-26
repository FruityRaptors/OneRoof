import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express'
import { connectDB } from "./database";
import {Request, Response} from "express";
import  express  from "express";
import * as bodyParser from "body-parser";
import {Todo} from "./entity/Todo";
import {Users} from "./entity/Users"
import { buildSchema } from 'type-graphql'
import { userResolver } from "./resolvers/userResolver"

// const PORT = process.env.PORT || 3000;
// const app = express();

connectDB().then(async connection => {
    async function main(){
        const schema = await buildSchema({
            resolvers: [userResolver],
            emitSchemaFile: true
        })
    
        const app = express()
    
    
        const server = new ApolloServer({
            schema,
        })
    
        server.applyMiddleware( {app} )
    
        app.listen(3000, () => 
          console.log('is this shit even running?')
        )
    }
    
    main()
})























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








