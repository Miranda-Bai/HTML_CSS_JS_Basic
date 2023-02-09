const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/get", (req, res) => {
  const query = req.query;

  res.send({
    status: 0, // 响应状态 0 - succeed, 1 - failed
    msg: "GET require succeed", // 状态描述
    data: query, //响应给客户端的数据
  });
});
// 要配置解析表单的中间件，解析forma-urlencoded数据
apiRouter.post("/post", express.urlencoded({ extended: false }), (req, res) => {
  const body = req.body;

  res.send({
    status: 0, // 响应状态 0 - succeed, 1 - failed
    msg: "Post require succeed", // 状态描述
    data: body, //响应给客户端的数据
  });
});

apiRouter.delete("/delete", (req, res) => {
  res.send({
    status: 0, // 响应状态 0 - succe
    msg: "Delete require succeed", 
  });
});
module.exports = apiRouter;
