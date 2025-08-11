const nodemailer=require('nodemailer') //task -07-08-2025
require('dotenv').config()
const  pass=process.env.MAIL_PASS
const user_mail=process.env.USER_MAIL
const receiver=process.env.RECEIVER_MAIL
//static
const transport =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:user_mail,
        pass:pass
    }  
})
//dynamic 
// const mailOptions={
//     from :user_mail,
//     to:"sherriljameskumar@gmail.com",
//     subject:"testing",
//     text:"hi sherril james kumar, mail from sherrilkumar2003@gmail.com  "
// }
//for mail
// const mail=()=>transport.sendMail(mailOptions,(err,info)=>{
//  if(err){
//     console.log("err",err)
//  }
//  console.log("info",info)
// })
//otp
const mail = async(user_mail, otp) => {
    const mailOptions  = {
    from:user_mail,
    to:receiver,
    subject:"OTP Verification",
    text: `Your OTP to reset password is: ${otp}. It is valid for 10 minutes. If you didn't request this, ignore.`,
    text: `Your OTP to reset password is: ${otp}. It is valid for 10 minutes.`
}


await transport.sendMail(mailOptions,(err, info) =>{
    if(err){
        console.log("err", err)
    }
    console.log("info", info.response)
})
}

module.exports = mail;