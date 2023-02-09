const express = require("express")

const app = express()

// 挂载路由
app.get("/", (req,res)=>{
    res.send("hello, get!!")
})
app.post("/",(req,res)=>{
    res.send("Post require!!")
})

app.listen("80", ()=>{
    console.log("express server is running at http://127.0.0.1")
})