const mongoose = require('mongoose');

// const LibraryUserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
//     },
//     password: {
//         type: String,
//         required: true,
//         min: 8,
//         max: 16
//     }
// });
const LibraryUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 16
    },
      otp:{
        type:Number,
    },
    otpExpiry:{
        type:Date,
    }
});
// const LibraryUserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
//     },
//     image:{
//         type:String
//     },
//     password: {
//         type: String,
//         min: 8,
//         max: 16
//     }
// });
const LibraryUserdata = mongoose.model('LibraryUser', LibraryUserSchema);
module.exports = LibraryUserdata;
