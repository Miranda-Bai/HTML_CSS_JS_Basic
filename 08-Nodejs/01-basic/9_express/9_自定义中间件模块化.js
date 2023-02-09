const express = require("express");
const bodyParser = require("./middleware")

const app = express();
// 解析表单数据的中间件
app.use(bodyParser);

app.post("/user", (req,res)=>{
    res.send(req.body)
})

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
