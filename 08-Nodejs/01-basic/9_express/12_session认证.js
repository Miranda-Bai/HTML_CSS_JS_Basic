const express = require("express");
const session = require("express-session");

const app = express();

// 配置session中间件
app.use(
  session({
    secret: "miranda cat", // 可以为任意字符串
    resave: false,
    saveUninitialized: true,
  })
);
//post请求时，要配置解析请求体的中间件，否则req.body为空对象
app.use(express.urlencoded({ extended: false }));
// 用户登陆的接口
app.post("/api/login", (req, res) => {
  console.log("body:", req.body);
  if (req.body.username !== "admin" || req.body.password !== "admin") {
    return res.send({ status: 1, msg: "login failed!!" });
  }
  // 只有成功配置了 express-session， req中才会有session属性
  req.session.userinfo = req.body; //用户登陆信息
  req.session.islogin = true; //用户登陆状态
  res.send({ status: 0, msg: "login succeed!" });
});

// 获取用户名的接口
app.get("/api/username", (req, res) => {
  console.log("session: ", req.session);
  //用户未登陆
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: "get user name failed!" });
  }
  res.send({
    status: 0,
    msg: "get user name succeed!",
    username: req.session.userinfo.username,
  });
});

//退出登陆时，清空session
app.post("/api/logout", (req, res) => {
//清空当前用户对应的session
  req.session.destroy();
  res.send({ status: 0, msg: "logout succeed!!" });
});

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
