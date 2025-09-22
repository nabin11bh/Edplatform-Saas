
import { Request,Response } from "express"
import sequelize from "../../../database/connection"
import { table } from "console"
import { QueryTypes } from "sequelize"

const instituteListForStudent = async(req:Request,res:Response)=>{
    type : QueryTypes.SHOWTABLES
    const tables =   await sequelize.query(`SHOW TABLES LIKE 'institute_%'`)
    res.status(200).json({
        message : " data fetched", data : tables
    })
}

export default instituteListForStudent