const mongoose=require('mongoose')
const librarySchema = new mongoose.Schema({
    Book: { type: String },
    Author: { type: String }
})
const libraryModel = mongoose.model('Library', librarySchema)
module.exports=libraryModel 