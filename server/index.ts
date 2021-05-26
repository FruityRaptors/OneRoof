import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

//declare namespace & interface globally
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT?: string;
        }
    }
}

//create APP class to generate express app
class App {
    public application: express.Application;
    constructor() {
        // this.application = express();
    }
}

const app = new App().application;
const PORT = process.env.PORT || 4000;

//show "successfully started" on browser when you visit localhost:4000
app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Succesfully connected");
});

//show "Server is running at >>> localhost:4000" on your terminal.
app.listen(PORT, () =>
  console.log(`Server is Running at >>> localhost:${PORT}`)  
);