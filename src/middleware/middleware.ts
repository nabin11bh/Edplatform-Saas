

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
    jwt.verify(token,'secret',async (erroraayo,resultaayo : any)=>{
        if(erroraayo){
            res.status(403).json({
                message : "Token invalid "
            })
        }else{
            // verified vayo 
           
            const userData = await User.findByPk(resultaayo.id)
            
            
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