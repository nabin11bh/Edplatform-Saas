import express, { Request, Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandling from "../../../services/asyncErrorHandling"
import { createCourse,deleteCourse,getAllCourse,getSingleCourse } from "../../../controller/institute/course/courseController"
import multer from "multer"
import {cloudinary,storage } from "../../../services/cloudinaryConfig"


const upload = multer({storage : storage, 

    fileFilter : (req:Request,file:Express.Multer.File,cb)=>{
        const allowedFileTypes = ['image/png','image/jpeg','image/jpg']
        if(allowedFileTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("Only image !!"))
        }
    }, 
    limits : {
        fileSize : 4 * 1024 * 1024 
    }
})
const router:Router = express.Router()

router.route("/")
.post(upload.single('courseThumbnail'),isLoggedIn, asyncErrorHandling(createCourse))
.get(isLoggedIn, asyncErrorHandling(getAllCourse))


router.route("/:id").get(asyncErrorHandling(getSingleCourse)).delete(isLoggedIn,asyncErrorHandling(deleteCourse))

export default router   