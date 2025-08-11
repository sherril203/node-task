const express=require('express')
const userController=require('../controllers/user.controllers')
const libraryController=require('../controllers/library.controllers')
const movieControllers=require('../controllers/movie.controllers')
const courseController=require('../controllers/course.controllers')
const LibraryTrackingController=require('../controllers/LibraryTracking.controller')
const LibraryUserController=require('../controllers/LibraryUser.controller')
const { verifytoken } = require('../Middleware/Auth')
const upload = require('../utils/fileStorage')
const router =express.Router()

router.post("/user",userController.userCreateController)
router.post("/library",libraryController.libraryController)
router.post("/movie",movieControllers.movieControllers)
router.post("/course",courseController.courseControllers)
//get 
router.get("/showUser",userController.showUserContoller)
//put-update
router.put("/updateUser/:id",userController.UpdateUserContoller)
//delete
router.delete("/deleteuser/:id",userController.deleteUserController)

//task- 01/08/2025
router.post('/librarydata', LibraryTrackingController.LibraryTrackingController) 
router.get('/showlibrarydata',LibraryTrackingController.ShowTrackingController)
router.put('/updatelibrarydata',LibraryTrackingController.UpdateTrackingContoller)
router.delete('/removelibrarydata',LibraryTrackingController.deleteTrackingController)
//task - 06/08/2025
router.post('/register',LibraryUserController.LibraryRegisterController)
router.post('/login',LibraryUserController.LibraryLoginController)
//task -07/08/2025
router.get('/displayProfile',verifytoken,LibraryUserController.displayProfileController)
//task -08/08/2025
router.post('/Otpverify',LibraryUserController.verifyOtpController)
router.get('/Otplogin',LibraryUserController.userOtpController)
router.post('/forgot',LibraryUserController.forgotpassword)
router.post('/reset',LibraryUserController.Resetpassword)

//router.get('/filedata',upload.single('image'),userController.registerUserDetailsController)
router.post('/userData',upload.single('image'),LibraryUserController.registerLibraryDetailsController)
module.exports=router