const db = require("../db");

// 根据用户名搜索用户
exports.getUserByUsername = (username) => {
  const sqlStr = "select * from ev_users where username=?;";
  db.query(sqlStr, username, (error, results) => {
    //无法拿到回调函数的返回值
    return { error, results };
  });
  console.log("queryResult in db_util: ", queryResult)
  return queryResult;
};

// 插入新用户
exports.insertNewUser = (user) => {
  const sqlStr = "insert into ev_users set ?;";
  db.query(sqlStr, user, (error, results) => {
    return { error, results };
  });
};
