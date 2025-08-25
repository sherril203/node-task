const { generatetoken } = require('../Middleware/Auth');
const LibraryUser = require('../Models/libraryuser.model');
const bcrypt = require('bcrypt');
const mail = require("../utils/mailService.js");
const Otpgenerator = require('../utils/Otpgenerator');
const UserModel = require('../Models/user.model.js');
const userJoiSchema = require('../validation/joiSchema');


// Register Controller
const LibraryRegisterController = async (req, res) => {
    try {
        const userData = req.body;
         const existingUser = await LibraryUser.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const savedUser = await new LibraryUser(userData).save();

        res.status(201).send({ message: "Library user data registered", data: savedUser });
    } catch (err) {
        res.status(500).send("Error when creating user register");
    }
};

// Login Controller
const LibraryLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const currentUser = await LibraryUser.findOne({ email:email });

        if (!currentUser) {
            const error = new Error("You are not registered yet");
            error.statusCode = 404;
            throw error;
        }

        const matchPassword = await bcrypt.compare(password, currentUser.password);
        if (!matchPassword) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        const token =  generatetoken(currentUser._id);
        res.status(200).send({ message: "Login successful", data:{token} });
    } catch (err) {
        res.status(500).send("Error when creating user login");
    }
};
const displayProfileController=async(req,res)=>{
    try{
        const userId=req.user.id
       console.log("ud", userId)
        const DisplayUser=await LibraryUser.findById(userId).select({email:1})
        console.log("d", DisplayUser)
       // await mail() //for sending mail
        return res.status(200).send({message:"display data",data:DisplayUser})
    }
    catch (err) {
        res.status(500).send("error display data", err);
    }
}
//otp generator
const userOtpController=async(req,res)=>{
    try{
    const {email}=req.body
    const existuser=await LibraryUser.findOne({email:email})
    if(!existuser){
        const error = new Error("You are not registered");
        error.statusCode = 404;
        throw error;
    }
    const otp=await Otpgenerator()
    existuser.otp=otp
    existuser.otpExpiry=new Date(Date.now()+5*60*1000)
    await existuser.save()
    const sendotp=await mail(email,otp)
    res.status(200).send({message:"OTP send to user successfully"})
}
catch(error){
    res.status(500).send({message:"Error when generating otp"})
}
}
//verify otp
const verifyOtpController=async(req,res)=>{
    try{
    const{email,otp}=req.body
    const existuser=await LibraryUser.findOne({email:email})
    if(!existuser){
        return res.status(404).send("you are not yet registered")
    }
      if(existuser.otp!==otp){
       const error = new Error("Invaild OTP");
        error.statusCode = 400;//BAD REQUEST
        throw error;
        //  return res.status(400).send({message:"invalid otp"})
    }
    if(Date.now()>existuser.otpExpiry){
        return res.status(400).send({message:"otp expires"})
    }
    const token=await generatetoken(existuser._id)
    return res.status(200).send({message:"otp verified successfully",data:{token:token}})
}catch(err){
    return res.status(500).send("error when verify otp")
}
}
//forgot password
const forgotpassword=async(req,res)=>{
     try {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }
    const user = await LibraryUser.findOne({ email:email });
    console.log("u", user)
    if (!user) {
        return res.status(400).json({ message: 'If that email exists we sent an OTP' });
    }
    const otp = Otpgenerator();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otp = otp;
    user.otpExpiry = expiresAt;
    await user.save();
    try {
      await mail(email, otp);
    } catch (mailErr) {
      console.error('Error sending OTP email:', mailErr);
    }
    return res.status(200).json({ message: 'Otp sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
const Resetpassword=async (req, res) => {
  try {
    const { email, otp, Newpassword } = req.body;
    const user = await UserModel.findOne({ email :email});
    console.log("user", user, req.body)
    if (!user || !user.otp || !user.otpExpiry){
         return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    // if (user.otpExpiry < new Date()){
    //   return res.status(400).json({ message: 'Invalid or expired OTP' });
    // } 
   
    // OTP valid - update password and clear otp
    const hashedpassword = await bcrypt.hash(Newpassword,10);
    console.log("h", hashedpassword)
    user.password = hashedpassword;
    user.otp = null;
    user.otpExpiry = null;
    console.log("u", user)
    await user.save();
    return res.send({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
}
//update data
const updateProfileController=async(req,res)=>{
    try{
    const id=req.params.id //params
    const UpdateTracking=await LibraryTrackingModel.findByIdAndUpdate(id,{Borrower_name:"vincy"},{new:true}) //find  by id and update
   // const {Borrower_name,Return_date}=req.body
    //const UpdateTracking=await LibraryTrackingModel.findOneAndUpdate({Borrower_name:Borrower_name},{Return_date:Return_date},{new:true}) //find particular data and update
    res.status(200).send({data:UpdateTracking})
}
catch(err){
        res.status(500).send("error Library update")
}}
//delete profile data
const deleteProfileController=async(req,res)=>{
  try{
    const {Borrower_name}=req.body
  // const deleteUser=await LibraryTrackingModel.findOneAndDelete({Borrower_name:Borrower_name}) // find and delete
     const id=req.params.id //params
    const deleteUser=await LibraryTrackingModel.findByIdAndDelete(id) //find by id and delete
    res.status(200).send("userdata deleted")
    }
    catch(err){
        res.status(500).send("error Library delete")
}
}
//single image
// const registerLibraryDetailsController=async(req,res)=>{
//     try{
//         console.log("hi")
//         const userData=req.body
//         console.log("req", req.body, req.file)
//         userData.image = req.file.filename
//         const StoreData=new LibraryUser(userData)
//         console.log("st", StoreData)
//         await StoreData.save()
//         res.status(200).send({message:"data uploaded"})
//     }
//     catch(err){
//         return res.status(500).send("error while user register",err)
//     }
// }
//multiple image
const registerLibraryDetailsController=async(req,res)=>{
    try{
        const{error,value}=userJoiSchema.valid(userData)
        const userData=req.body
        //console.log("req", req.file)
        // const images=[]
        // req.files.map((file)=>{
        //     images.push(file.filename)
        // })
        // userData.image=images
        if(error){
            return res.status(400).send("send correct data",error)
        }
        console.log("val",value)
        const StoreData=new LibraryUser(value)
        console.log("st", StoreData)
        await StoreData.save()
        res.status(200).send({message:"data uploaded"})
    }
    catch(err){
        return res.status(500).send("error while user register",err)
    }
}
module.exports = {
    LibraryRegisterController,
    LibraryLoginController,
    displayProfileController,userOtpController,
    verifyOtpController, forgotpassword,Resetpassword,
    registerLibraryDetailsController,deleteProfileController,updateProfileController
};
