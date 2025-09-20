
import {Table,Column,Model,DataType, PrimaryKey, AllowNull} from "sequelize-typescript"
import { UserRole} from "../../middleware/type"

@Table({
    tableName : 'users', // uta gui ma dekiney name vayo(phpmyadminma)
    modelName : 'User', // project vitra mathi ko table lai access garne name 
    timestamps : true
})

class User extends Model{
    @Column({
        primaryKey : true, 
        type : DataType.UUID, 
        defaultValue : DataType.UUIDV4
    })
    declare id : string
    
    @Column({
        type : DataType.STRING, 
   
    })
    declare userName : string 

    @Column({
        type : DataType.STRING
    })
    declare password : string 

    @Column({
        type : DataType.STRING,
        unique : true
    })
    declare email:string
    @Column({
        type : DataType.ENUM('teacher','institute','super-admin','student'), 
        defaultValue : 'student', 
    })
    declare role:UserRole

    @Column({
        type: DataType.STRING,
        allowNull: true,
      })
      declare currentInstituteNumber: string | null;
      


}

export default User 