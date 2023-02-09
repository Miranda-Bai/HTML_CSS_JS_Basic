const express = require("express")
const {router} = require("./router")

const app = express();
// app.use()是用来注册全局中间件的
app.use(router)
app.listen("80",()=>{
    console.log("express server is running on http://127.0.0.1")
})