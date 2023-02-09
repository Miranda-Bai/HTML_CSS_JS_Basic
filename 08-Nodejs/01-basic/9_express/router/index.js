const express = require("express")
const router = express.Router()

// 给路由绑定中间件
/* router.use((req,res,next)=>{
    // ....
    next();
}) */
// 挂载路由
router.get("/user/list",(req,res)=>{
    res.send("get user list!")
})
router.post("/user/add",(req,res)=>{
    res.send("add user succeed!")
})

module.exports={
    router,
}