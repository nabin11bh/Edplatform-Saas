

/*
 REGISTER/SIGN UP
 incoming data--> username, email, password
 process/checking--> email valid, compulsory data 
 db query--> table ma insert/read/delete



 LOGIN
 LOGOUT
 FORGET PASSWORD
 RESET PASSWORD/OTP

*/
import {Request, Response} from "express"
import User from "../../../database/models/user.model"

//json data--> req.body 
// files--> req.file

const registerUser = async (req:Request,res:Response)=>{
   const  {username,password,email} = req.body
   if(!username||!password||!email){
    res.status(400).json({
        message: "Please provide username, password, email"
    })
    return

   }
    //insert into users table
    await User.create({
        username : username,
        password : password,
        email  : email
    })
    res.status(200).json({
        message : "User registered successfully"
    })
   


}

export {registerUser}