const mongoose=require('mongoose')
// const userSchema= new mongoose.Schema({
//     name:{
//         type:String
//     },
//     email:{
//         type:String
//     }
// })
const userSchema= new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    email:{
        type:String
    }
})
const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel //export usermodel