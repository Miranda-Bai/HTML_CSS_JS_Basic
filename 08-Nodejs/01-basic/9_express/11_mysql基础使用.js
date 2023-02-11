const mysql = require("mysql2");

// 建立数据库连接池
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的 IP地址，默认端口号为3306
  user: "root", // 登陆数据库账号
  password: "A154672020b",
  database: "my_db_01", // 指定数据库
});
// select 1 测试mysql模块能否正常工作，该语句并无实质性用途
/* db.query("select 1",(error, results)=>{
    if(error) return console.log(error.message)
    console.log(results);
}) */

let sqlStr = "select * from users;";
db.query(sqlStr, (error, results) => {
  if (error) return console.log("error:",error.message);
  console.log(results);
  // 关闭数据库连接 destroy()方法可强制关闭数据库连接
  db.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });
  
});

/* sqlStr = "insert into users(username, password) values(?,?);";
const user = { username: "Spider-Man", password: "pcc321" };
db.query(sqlStr, [user.username, user.password], (error, results) => {
  if (error) return console.log(error.message);
  if(results.affectedRows) console.log("insert row succeed!!");
});
 */

/* sqlStr = "insert into users set ?;";
const user = { username: "Spider-Man2", password: "pcc321" };
db.query(sqlStr, user, (error, results) => {
  if (error) return console.log(error.message);
  if(results.affectedRows) console.log("insert row succeed!!");
}); */

/* sqlStr = "update users set username=?, password=? where id=?;";
const user = {id:7, username: "Test", password: "0000" };
db.query(sqlStr, [user.username, user.password, user.id], (error, results) => {
  if (error) return console.log(error.message);
  if(results.affectedRows) console.log("update row succeed!!");
}); */

/* sqlStr="delete from users where id=?;"
db.query(sqlStr, 2, (error, results)=>{
    if(error) return console.log(error.message)
    if(results.affectedRows) console.log("delete row succeed!!!")
}) */

// 标记删除，以免用户误删，无法恢复数据
/* sqlStr = "update users set status=? where id=?;";
db.query(sqlStr, [1, 6], (error, results) => {
  if (error) return console.log(error.message);
  if (results.affectedRows) console.log("mark delete succeed!!");
}); */

