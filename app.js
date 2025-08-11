const express=require('express')
const http=require('http')
const router=require('./routes/routes')
//const path=require(path)
const app=express()

app.use(express.json())
app.use((req,res, next)=>{
    console.log("req", req.url)
    next()
})
app.use(router)

// const fileStore=express.static(path.join(__dirname,"upload"))
// app.use("/files",fileStore)
const server=http.createServer(app)
module.exports=server