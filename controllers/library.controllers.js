const libraryModel =require('../Models/library.model')
const libraryController=async(req,res)=>{
 const librarydata=req.body
 const storedata=new  libraryModel(librarydata)
 await storedata.save()
 res.status(201).send("library data stored")}
 module.exports={
    libraryController
}