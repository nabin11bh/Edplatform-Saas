import { Request,Response } from "express";
import { IExtendedRequest } from "../../../../middleware/type";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

const addChapterToCourse = async(req:IExtendedRequest,res:Response)=>{
    const {courseId} = req.params
    const instituteNumber = req.user?.currentInstituteNumber
    const {chapterName,chapterLevel,chapterDuration} = req.body
    if(!chapterName || !chapterLevel || !chapterDuration || !courseId){
        return res.status(400).json({
            message : "Please provide chaptername, chapterLevel, chapterDuration"
        })
    }

//check if course eixst or not

const [course] = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
    {
      replacements: [courseId],
      type: QueryTypes.SELECT,
    }
  );
  

if(!course){
    return res.status(404).json({
        message : "No couse found with the id"
    })
}

const [courseChapter] = await sequelize.query(`SELECT * FROM course_chapter_${instituteNumber} WHERE chapterName = ? AND courseID=?`,{
    replacements : [chapterName,courseId],
    type : QueryTypes.SELECT
})
if(courseChapter){
    return res.status(400).json({
        message : "Already exists"
    })
}

//add chapter data to chapter table

await sequelize.query(`INSERT INRO course_chapter_${instituteNumber}(chapterName,chapterLevel,chapterDuration,courseId) VALUES(?,?,?,?)`,{
    replacements : [chapterName,chapterLevel,chapterDuration,courseId]
})
res.status(200).json({
    message : "Chapter added successfully"
})

}

const fetchCourseChapter = async(req:IExtendedRequest, res:Response)=>{
    const {courseId} = req.params
    const instituteNumber = req.user?.currentInstituteNumber;
    if(!courseId) return res.status(400).json({
        message : "Please provide courseId"
    })
  const data =  await sequelize.query(`SELECT * FROM course_chapter_${instituteNumber} WHERE courseId=?`)
    if(data){
        res.status(404).json({
            message : "chapter not found",data:[]
        })
    }
 }

 export {addChapterToCourse,fetchCourseChapter}