const multer=require('multer')
const path=require('path')
const fs=require('fs')

// const filePath={
//     fs.exist

// }
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        // console.log("re", req.body, req.file)
        cb(null,"src/uploads/")
    },
    filename:function(req,file,cb){
        const extension=path.extname(file.originalname)
        const fileName=`${Date.now()}-${file.originalname}`
         cb(null,fileName)
    }
})
const upload=multer({storage:storage})
module.exports=upload