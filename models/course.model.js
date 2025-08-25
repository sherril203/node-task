const mongoose=require('mongoose')
const courseSchema=new mongoose.Schema({
    course_name:{
        type:String
    },
    Months:{
        type:String
    }
})
const courseModel=mongoose.model('Course',courseSchema)
module.exports=courseModel