const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");
const Joi = require("joi");
const { expressjwt } = require("express-jwt");
const config = require("./config");
const userinfoRouter = require("./router/userinfo");

const app = express();
//跨域
app.use(cors());
//仅解析www-form-urlencoded数据
app.use(express.urlencoded({ extended: false }));

// 自定义响应数据的中间件, 需要在注册路由之前，因为路由中需要使用res.cc
app.use((req, res, next) => {
  //status:0 succeed, status:1 failed  default value of status is 1
  //为res挂载cc属性
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 要在路由之前配置解析 Token的中间件
app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

// 用户注册，登陆路由
app.use("/api", userRouter);
// 用户信息路由
app.use("/my", userinfoRouter);

//全局错误处理
app.use((error, req, res, next) => {
  //数据验证失败错误
  if (error instanceof Joi.ValidationError) return res.cc(error);

  // token 解析失败导致的错误
  if (error.name === "UnauthorizedError") {
    return res.cc("Unauthorized Token: " + error.message);
  }
  // Unknown error
  res.cc(error);
});

app.listen("3007", () => {
  console.log("http://127.0.0.1:3007");
});
