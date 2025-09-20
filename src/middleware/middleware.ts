

import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import User from "../database/models/user.model"
import { IExtendedRequest, UserRole } from "./type"

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
           
            const userData = await User.findByPk(result.id, {
                attributes: ['id', 'currentInstituteNumber', 'role']
              });
              

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

const restrictTo = (...roles:UserRole[]) => {
    return (req: IExtendedRequest, res: Response, next: NextFunction) => {
      // requesting user's role from token
      const userRole = req.user?.role as UserRole
  
      if (roles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({
          message: "You do not have permission to perform this action",
        });
      }
    };
  };
  


export { isLoggedIn,restrictTo}