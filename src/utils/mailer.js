import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.SMTP_MAIL)
const transporter=nodemailer.createTransport(

{
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD,
    }
}


)
const sendMail=async(email,subject,content)=>{
try{



var mailoptions={
    


    from:process.env.SMTP_MAIL,
    to:email,
    subject:subject,
    html:content
}

transporter.sendMail(mailoptions,(error,info)=>{

if(error){

    console.log(error)
}
else{console.log('Mail sent',info)}

})

}
catch(err){
console.log(err.message)

}


}
export {sendMail}