const express = require("express");

const router = express.Router();

//注册新用户
router.post("/register", (req, res) => {
  res.send("register succeed!");
});
//登陆
router.post("/login", (req, res) => {
  res.send("login succeed!");
});
module.exports = router;
