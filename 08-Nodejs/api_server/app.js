const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");

const app = express();
//跨域
app.use(cors());
//仅解析form-urlencoded数据
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);

//全局错误处理
app.use((error, req, res, next) => {
  console.log("error: ", error);
});

app.listen("3007", () => {
  console.log("http://127.0.0.1:3007");
});
