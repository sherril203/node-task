const movieModel=require('../Models/movie.model')
const movieControllers=async(req,res)=>{
 const movieData=req.body
 const storedata=new  movieModel(movieData)
 await storedata.save()
 res.status(201).send("movie data stored")
}
module.exports={
    movieControllers
}