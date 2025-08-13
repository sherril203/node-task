const LibraryTrackingModel=require('../Models/LibraryTracking.model')
//post 
const LibraryTrackingController=async(req,res)=>{
    try{
    const LibraryTrackingData= req.body
    const storeData=new LibraryTrackingModel(LibraryTrackingData)
    await storeData.save()
    // await LibraryTrackingModel.create(req.body); // shortcut code

    res.status(201).send("Library data added")
    }catch(err){
        res.status(500).send("error Library data")
    }
}
//get
const ShowTrackingController=async(req,res)=>{
    try{
    const showTracking=await LibraryTrackingModel.find() //get all data
    // const  showTracking=await LibraryTrackingModel.findOne({}) //get particular data
    // const id=req.params.id //params
    // const  showTracking=await LibraryTrackingModel.findById(id) //find and get data by id
    res.status(200).send({data: showTracking})
    }catch(err){
        res.status(500).send("error Library get")
    }
}
//update
const UpdateTrackingContoller=async(req,res)=>{
    try{
    const id=req.params.id //params
    //const UpdateTracking=await LibraryTrackingModel.findByIdAndUpdate(id,{Borrower_name:"vincy"},{new:true}) //find  by id and update
    const {Borrower_name,Return_date}=req.body
    const UpdateTracking=await LibraryTrackingModel.findOneAndUpdate({Borrower_name:Borrower_name},{Return_date:Return_date},{new:true}) //find particular data and update
    res.status(200).send({data:UpdateTracking})
}
catch(err){
        res.status(500).send("error Library update")
}
}
const deleteTrackingController=async(req,res)=>{
    try{
    const {Borrower_name}=req.body
   const DeleteTracking=await LibraryTrackingModel.findOneAndDelete({Borrower_name:Borrower_name}) // find and delete
   //const id=req.params.id //params
    //const DeleteTracking=await LibraryTrackingModel.findByIdAndDelete(id) //find by id and delete
    res.status(200).send("library data deleted")
    }
    catch(err){
        res.status(500).send("error Library delete")
}
}

module.exports={LibraryTrackingController,ShowTrackingController,UpdateTrackingContoller,
    deleteTrackingController
}