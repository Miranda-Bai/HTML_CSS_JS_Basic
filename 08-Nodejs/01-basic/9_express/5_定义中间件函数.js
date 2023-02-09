const express =require("express")
const app = express()

// 定义一个最简单的中间件函数
const mw = function(req,res,next){
    console.log("this the the simpliest middleware function")

    // 把流转关系交给下一个中间件或路由
    next();
}
// 注册全局生效的中间件
// app.use(mw)

app.use((req,res,next)=>{
    console.log("second middleware")
    next();
})
// 局部生效的中间件， 全局中间件先生效
app.get("/", mw, (req,res)=>{
    res.send("Home page")
})
app.get("/user",(req,res)=>{
    res.send("User page")
})

app.listen("80",()=>{
    console.log("http://127.0.0.1")
})