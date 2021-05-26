import "dotenv/config";
import "reflect-metadata";
import { connectDB } from "./database";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Todo} from "./entity/Todo";
import {Users} from "./entity/Users"


const PORT = process.env.PORT || 3000;
const app = express();


// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
connectDB().then(async connection => {

    //create express app
    const app = express();
    app.use(bodyParser.json());


    let user = new Users();
    user.username = "test subject"
    user.house_key = "super secured house key"
    user.email = "sephiroth69xx@gmail.com"
    user.isAdmin = false
  
    return connection.manager
    .save(user)})
    .then(user => {
        console.log ('god tier has been saved')
    //run app
    app.listen(PORT);    

    console.log(`Express application is up and running on port ${PORT}`)
}).catch(error => console.log(`TypeORM connection error: ${error}`));








// console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");



    // )const startServer = async () => {
//         await app.listen(PORT, () => {
//             console.log(`Server running on port:${PORT}`);
//         });
//     };

// connectDB().then(async connection => {
 
//   })
  
// }).catch(error => console.log(error)