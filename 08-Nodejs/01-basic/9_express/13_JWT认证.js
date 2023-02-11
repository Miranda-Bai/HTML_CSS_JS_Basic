const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bodyParser = require("body-parser");

const app = express();
//可以跨域访问
app.use(cors());
//解析post表单数据
app.use(bodyParser.urlencoded({ extended: false }));

//定义secret密钥,任意字符串，越复杂越好
const secretKey = "MirandaBai";
//定义解析客户端token, unless定义哪些接口不需要访问权限
app.use(
  expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

app.use((error, req, res, next) => {
  // token 解析失败导致的错误
  if (error.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "Unauthorized Token: " + error.message,
    });
  }
  // 其他原因导致的错误
  res.send({
    status: 500,
    message: "Unknown Error: " + error.message,
  });
});

//登陆接口
app.post("/api/login", (req, res) => {
  const userinfo = req.body;
  //登陆失败
  if (userinfo.username !== "admin" || userinfo.password !== "admin") {
    return res.send({
      status: 400,
      message: "login failed!",
    });
  }
  //登陆成功，生成jwt字符串
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, {
    expiresIn: "5m",
  });
  res.send({
    status: 200,
    message: "login succeed!",
    token: tokenStr, //要发送给客户端的 token 字符串
  });
});

app.get("/admin/getinfo", (req, res) => {
  //配置成功 expressjwt 后，req上面会挂载auth属性，记录用户信息
  console.log("auth: ", req.auth);
  if (!req.auth) {
    return res.send({
      status: 400,
      message: "Cannot get user's information!",
    });
  }
  res.send({
    status: 200,
    message: "get user's information succeed!",
    data: req.auth,
  });
});

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
