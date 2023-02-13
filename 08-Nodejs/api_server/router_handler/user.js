const bcrptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/index");
const config = require("../config");

exports.registerUser = (req, res) => {
  //获得表单数据
  const userinfo = req.body;
  console.log("user information: ", userinfo);
  //用户名，密码为null或为空字符串
  /* if (
    !userinfo.username ||
    !userinfo.password ||
    !userinfo.username.trim() ||
    !userinfo.password.trim()
  ) {
    return res.cc("username or password is invalid.");
  } */
  // 判断用户名是否被占用
  let sqlStr = "select * from ev_users where username=?";
  db.query(sqlStr, userinfo.username, (error, results) => {
    if (error) {
      return res.cc(error);
    }
    //判断用户名是否被占用
    if (results.length > 0) {
      return res.cc("The username already existed, please change another one.");
    }
    //用户名可用
    //密码处理
    //调用 bcrptjs.hashSync() 对密码进行加密处理
    userinfo.password = bcrptjs.hashSync(userinfo.password, 10);
    console.log("userinfo:", userinfo);

    //插入新用户
    sqlStr = "insert into ev_users set ?;";
    db.query(
      sqlStr,
      { username: userinfo.username, password: userinfo.password },
      (error, results) => {
        if (error) {
          return res.cc(error);
        }
        // 插入失败
        if (!results.affectedRows) {
          return res.cc("register failed, please try later!");
        }
        // 注册成功
        res.cc("register succeed!", 0);
      }
    );
  });
};

exports.login = (req, res) => {
  const userinfo = req.body;

  //查询用户信息
  const sqlStr = "select * from ev_users where username=?;";
  db.query(sqlStr, userinfo.username, (error, results) => {
    //查询出错
    if (error) return res.cc(error);
    //查询结果为空数组
    if (!results.length) return res.cc("no such user!");
    //有该用户，开始进行密码验证
    // bcrpt.compareSync(用户提交的密码，数据库中的密码)
    const compareResult = bcrptjs.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("login failed!");
    }
    // 在服务器端生成 JWT Token 的字符串
    // 1.通过ES6高级语法，快速剔除密码和头像的值，jsonwebtoken包
    const user = { ...results[0], password: "", user_pic: "" };
    console.log("user: ", user);
    // 对用户信息进行加密，生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    // 调用res.send()将token响应给客户端
    res.send({
      status: 0,
      message: "login succeed!",
      token: "Bearer " + tokenStr,
    });
  });
};
