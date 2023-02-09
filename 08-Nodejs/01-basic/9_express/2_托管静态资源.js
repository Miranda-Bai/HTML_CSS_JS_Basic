const express = require("express")

const app = express()

// 托管静态资源,可多次调用，定义多个静态资源目录, 按顺序查找
// 添加访问路径前缀 /file
app.use('/files',express.static("./public"))

app.listen(80,()=>{
    console.log("express server is running at http://127.0.0.1")
})