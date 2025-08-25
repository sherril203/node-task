const mongoose=require('mongoose')
const movieSchema=new mongoose.Schema({
    Movie:{
        type:String
    },
    Language:{
        type:String
    }
})
const movieModel=mongoose.model('Movies',movieSchema)
module.exports=movieModel //export usermodel