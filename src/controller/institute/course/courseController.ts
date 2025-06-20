import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";



const createCourse = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
const {coursePrice, courseName,courseDescription, courseDuration, courseLevel } = req.body 
if(!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel){
    return res.status(400).json({
        messsage : "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel"
    })
}

const courseThumbnail = req.file ? req.file.path : null

const returnedData = await sequelize.query(`INSERT INTO course_${instituteNumber}(coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail) VALUES(?,?,?,?,?,?)`,{
    replacements : [coursePrice, courseName,courseDescription,courseDuration,courseLevel,courseThumbnail]
})

console.log(returnedData)
res.status(200).json({
    message : 'course created successfully'
})
}

const deleteCourse = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber 
    const courseId = req.params.id 
    // first check if course exists or not , if exists --> delete else not delete 
    const [courseData] = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`,{
        replacements : [courseId]
    })

    if(courseData.length == 0){
        return res.status(404).json({
            message : "no course with that id"
        })
    }

    await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`,{
        replacements : [courseId]
    })
    res.status(200).json({
        message : "course deleted successfully"
    })
}


const getAllCourse = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber; 
    const datas = await sequelize.query(`SHOW TABLES LIKE 'course_%';`)
    const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
    res.status(200).json({
        message : "Course fetched", 
        data : courses, 
        datas
    })
}

const getSingleCourse = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber; 
    const courseId = req.params.id
    const course = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ?`,{
        replacements : [courseId]
    })
    res.status(200).json({
        message : "single course fetched", 
        data : course
    })
}

export {createCourse,deleteCourse,getSingleCourse,getAllCourse}