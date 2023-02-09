// 1. 导入express
const express = require("express");
// 2. 创建 web 服务器
const app = express();

// 托管静态资源
app.use(express.static("./public"))

// 3. 启动 web 服务器
app.listen(80, () => {
  console.log("express server is running at http://127.0.0.1");
});
// 4. 监听 get post 请求, 并向客户端响应具体的内容
app.get("/user", function (req, res) {
  res.send({ name: "Miranda", age: 18, gender: "female" });
});

app.post("/user", (req, res) => {
  res.send("require succeed!!");
});

app.get("/", (req, res) => {
  //req.query 接收query参数
  console.log(req.query);

  res.send(req.query);
});

app.get("/user/:id", (req, res) => {
  // req.params 接收params参数
  console.log(req.params);

  res.send(req.params);
});
