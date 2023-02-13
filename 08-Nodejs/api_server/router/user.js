const express = require("express");
const expressJoi = require("@escook/express-joi");
const userHandler = require("../router_handler/user");
//导入验证规则对象
const {reg_login_schema}= require("../schema/user")

const router = express.Router();



//注册新用户
// 3. 在路由中通过 expressJoi(userSchema) 的方式
//    调用中间件进行参数验证
router.post("/register", expressJoi(reg_login_schema), userHandler.registerUser);

//登陆
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

module.exports = router;
