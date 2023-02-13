const bcrptjs = require("bcryptjs");
const db = require("../db");

//获取用户信息
//配置成功 expressjwt 后，req上面会挂载auth属性，记录用户信息
exports.getUserinfo = (req, res) => {
  if (!req.auth) {
    return res.cc("Cannot get user's information!");
  }
  // 根据id查询用户基本信息，为防止用户密码泄漏，需要排除password字段
  const sqlStr =
    "select id, username, nickname, email, user_pic from ev_users where id=?;";
  db.query(sqlStr, req.auth.id, (error, results) => {
    // 执行sql语句失败
    if (error) return res.cc(error);
    // 查询结果为空
    if (!results.length) return res.cc("get user information failed!");

    // 用户信息获取成功
    res.send({
      status: 0,
      message: "get user information succeed!",
      data: results[0],
    });
  });
};

// 更新用户基本信息
exports.updateUserinfo = (req, res) => {
  const sqlStr = "update ev_users set ? where id=?;";
  db.query(sqlStr, [req.body, req.body.id], (error, results) => {
    if (error) return res.cc(error);

    if (!results.affectedRows) return res.cc("update user information failed!");

    res.cc("update user information succeed!", 0);
  });
};

// 重置密码
exports.updatePassword = (req, res) => {
  // req.auth为空，用户未登陆或Token已过期，需要重新登录
  if (!req.auth) {
    return res.cc("Please login!");
  }

  //查询用户信息
  let sqlStr = "select * from ev_users where id=?;";
  db.query(sqlStr, req.auth.id, (error, results) => {
    //查询出错
    if (error) return res.cc(error);
    //查询结果为空数组
    if (!results.length) return res.cc("no such user!");
    //有该用户，开始进行密码验证,只要旧密码与数据库的密码一致时，才能更新密码
    // bcrpt.compareSync(用户提交的密码，数据库中的密码)
    const compareResult = bcrptjs.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("wrong old password, please input correct old password!");
    }
    // 旧密码与数据库中的密码一致，进行更新密码操作
    //调用 bcrptjs.hashSync() 对密码进行加密处理
    const newPassword = bcrptjs.hashSync(req.body.newPwd, 10);

    sqlStr = "update ev_users set password=? where id=?";
    db.query(sqlStr, [newPassword, req.auth.id], (error, results) => {
      if (error) return res.cc(error);
      if (!results.affectedRows) return res.cc("Cannot reset password!");
      res.cc("reset password succeed!", 0);
    });
  });
};

// 更新头像
exports.updateAvatar = (req, res) => {
  const sqlStr = "update ev_users set user_pic=? where id=?;";
  db.query(sqlStr, [req.body.avatar, req.auth.id], (error, results) => {
    if (error) return res.cc(error);
    if (!results.affectedRows) return res.cc("update user's picture failed!");
    res.cc("update user's avatar succeed!", 0);
  });
};
