

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
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//json data--> req.body 
// files--> req.file

/*const registerUser = async (req:Request,res:Response)=>{
    if(req.body == undefined){
        console.log("triggered")
        res.status(400).json({
            message : "No data was send"
        })
        return
    }

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
        password : bcrypt.hashSync(password,10),
        email  : email
    })
    res.status(200).json({
        message : "User registered successfully"
    })
   


}

export {registerUser}
*/

class AuthController{
    static async registerUser(req:Request,res:Response){
     if(req.body == undefined){
         console.log("triggereed")
         res.status(400).json({
             message  : "No data was sent!!"
         })
         return
     }
     const {username,password,email} = req.body
     if(!username || !password || !email){
       res.status(400).json({
          message : "Please provide username, password, email"
      })
      return
     }
 //    const [data] =  await User.findAll({
 //         where : {
 //             email
 //         }
 //     })
 //     if(data){
 //         // already exists with that email 
 //     }
      // insert into Users table 
      await User.create({
          username :username, 
          password : bcrypt.hashSync(password,12), 
          email : email
      })
      res.status(201).json({
          message : "User registered successfully"
      })
    }
   async loginUser(req:Request,res:Response){
        const{email,password}=req.body
        if(!email || ! password){
            res.status(400).json({
                message : "Please provide email, password"
            })
            return
        }
        //check if email exist or not in users table
        const data = await User.findAll({
                where : {
                    email
                }
        })
    
        if(data.length == 0){
            res.status(404).json({
                message : " Not Registered"
            })
        }else{
            //check pw
          const isPasswordMatch = bcrypt.compareSync(password,data[0].password)
          if(isPasswordMatch){
            //login Vayo, token generated
           const token = jwt.sign({id : data[0].id}, "secrete",{
                expiresIn : "90d"
            })
            
    
          }else{
            res.status(403).json({
                message : "Invalid email or Password"
            })
          }

        }
    }
 }
 
 export default AuthController
 
 
 