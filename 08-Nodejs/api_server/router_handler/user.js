const bcrptjs = require("bcryptjs");
const db = require("../db/index");

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
  res.send("login succeed!");
};
