const express=require('express')
const LibraryfileContoller=require('../controllers/libraryfile.controllers')
const upload=require('../middleware/fileStorage')
const router =express.Router()

//api integation

//single file upload for library book
router.post('/librarybook', upload.single("bookImg"), LibraryfileContoller.LibraryBookController);
//get
router.get('/showBooks',LibraryfileContoller.showBookController)
router.put('/updatebook/:id', LibraryfileContoller.UpdateBookController);
router.delete('/deletebook/:id', LibraryfileContoller.deleteBookController);

module.exports=router