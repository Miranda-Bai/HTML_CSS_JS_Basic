const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require("../schema/user");

const userinfoHandler = require("../router_handler/userinfo");
// 获取用户基本信息接口
router.get("/userinfo", userinfoHandler.getUserinfo);

// 更新用户基本信息接口
// 3. 在路由中通过 expressJoi(userSchema) 的方式
//    调用中间件进行参数验证
router.post(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfoHandler.updateUserinfo
);

// 重置密码接口
router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userinfoHandler.updatePassword
);

// 更新头像接口
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userinfoHandler.updateAvatar
);

module.exports = router;
