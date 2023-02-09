const express = require("express");
// 把字符串解析成对象格式
const qs = require("querystring")

const app = express();
// 解析表单数据的中间件
app.use((req, res, next) => {
  // 数据过大时，客户端会把数据分块发到服务器
  let str = "";
  // 监听req的data事件
  req.on("data", (chunk) => {
    str += chunk;
  });
  // 监听req的end事件
  req.on('end', ()=>{
    // end触发时，证明客户端的数据已经都传到服务器了
    console.log(str)

    // 把字符串格式的请求数据，解析成对象格式
    const body = qs.parse(str)
    console.log(body)
    // 将处理好的数据挂载到req.body上
    req.body = body;
    next();
  })
});

app.post("/user", (req,res)=>{
    res.send(req.body)
})

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
