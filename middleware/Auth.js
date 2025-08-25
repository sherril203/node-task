const jwt=require('jsonwebtoken') //task- 06/08/2025
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET;
const generatetoken=(id)=>{
   
    const token = jwt.sign({id:id},jwt_secret,{expiresIn:"1h"})
    return token
}
//task - 07/08/2025
const verifytoken=async(req,res,next)=>{
     try{
          const tokenheader=req.headers.authorization
          console.log("to", tokenheader)
          if(!tokenheader.startsWith("Bearer")){
               return res.status(401).send({message:"invalid token"})
          }
          const token=tokenheader.split(" ")[1]
          console.log("tok", token)
          if(!token){
                    return res.status(404).send({message:"token not found"}) 
          }
          const decode=await jwt.verify(token,jwt_secret)
          console.log("de", decode)
          if(!decode){
               return res.status(401).send({message:"you are not able to acccess"})
          }
          req.user=decode

          next()

     }catch(error){
 return res.status(401).send({message:"token error", error})
} 
}
module.exports={
     generatetoken,verifytoken
}