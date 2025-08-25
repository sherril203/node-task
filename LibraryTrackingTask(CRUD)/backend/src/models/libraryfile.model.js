const mongoose=require('mongoose')
const fileSchema=new mongoose.Schema({
    bookImg:{type:String},
    book_name:{type:String},
    Author:{type:String},
    Borrower_name:{type:String}
})
const fileModel=mongoose.model("libraryFile",fileSchema)
module.exports=fileModel