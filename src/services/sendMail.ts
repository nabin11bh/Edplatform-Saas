import nodemailer from "nodemailer"


interface ImailInformation{
    to : string,
    subject : string,
    text : string
}

const sendMail = async (mailInformation:ImailInformation)=>{
    // mail sending logic

 const trasporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.NODEMAILER_GAMIL,
            pass : process.env.NODEMAILER_GMAIL_APP_PASSWORD  //app pw ho, not real pw 
        }
    })

const mailFormatObject = {
    from : "ED-Platfrom <nabin@gmail.com>",
    to : mailInformation.to,
    subject : mailInformation.subject,
    text : mailInformation.text
}
   try{
    await trasporter.sendMail(mailFormatObject)
   } catch(error){
    console.log(error)
   }
}

export default sendMail