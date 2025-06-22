

import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import User from "../database/models/user.model"
import { IExtendedRequest } from "./type"

const isLoggedIn = async (req:IExtendedRequest,res:Response,next:NextFunction)=>{

  
    // check if login or not 
    // token accept 
    const token = req.headers.authorization 

    if(!token){
        res.status(401).json({
            message : "please provide token"
        })
        return
        
    }
    // verify garne 
    jwt.verify(token,'secrete',async (error,result : any)=>{
        if(error){
            res.status(403).json({
                message : "Token invalid "
            })
        }else{
            // verified 
           
            const userData = await User.findByPk(result.id)
            
            if(!userData){
                res.status(403).json({
                    message : "No user with that id, invalid token "
                })
            }else{
                req.user = userData
                next()
            }
        }
    })
}



export default isLoggedIn