const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    // 人为制造错误
    throw new Error("something happen, please check your server!")
    res.send("Home Page")
})

//定义错误级别的中间件，错误级别中间件必须注册在所有路由之后
app.use((error, req, res, next)=>{
    console.log("errror: ", error.message)
    res.send("Server Error!!")
    // next();
})


app.listen("80",()=>{
    console.log("http://127.0.0.1")
})