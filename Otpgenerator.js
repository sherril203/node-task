const Otpgenerator=()=>{
    const otp=Math.floor(100000+Math.random()*9000000)
    return otp
}
module.exports=Otpgenerator