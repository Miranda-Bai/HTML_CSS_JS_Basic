const express = require("express")
const app = express()

// 使用 postman - body - raw -JSON 发送数据
app.post("/", express.json(),(req,res)=>{
    // 在服务器，可以使用req.body 属性，来接收客户端发送过来的请求体数据
    // 默认情况下，不配置解析表单数据的中间件，则req.body为undefined
    console.log(req.body)
    res.send("ok")
})
// 使用 postman - body - form-urlencoded 发送数据
app.post("/book",express.urlencoded({extended:false}), (req,res)=>{
    console.log(req.body)

    res.send("book!")
})
app.listen("80",()=>{
    console.log("http://127.0.0.1")
})