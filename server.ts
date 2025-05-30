import app from "./src/app";
import { envConfig } from "./src/config";

//database connection import
import "./src/database/connection"


function startServer(){
    const port = envConfig.portNumber;
    app.listen(port,function(){
        console.log(`Server has started at ${port}`)
    })
}
startServer()