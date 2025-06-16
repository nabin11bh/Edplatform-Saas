import { Sequelize } from "sequelize-typescript";
import {config} from "dotenv";
config()

const sequelize = new Sequelize({
    database:process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    dialect: "mysql",
    port:  Number(process.env.DB_PORT),
    models : [__dirname + '/models']

})

sequelize.authenticate()
  .then(() => {
    console.log("Authenticated,Connected");
  })
  .catch((error) => {
    console.log(error);
  });

  //migrate garne 
  sequelize.sync({force: false})
    .then(()=>{
      console.log("migrated successfully")
    })
  

  export default sequelize
