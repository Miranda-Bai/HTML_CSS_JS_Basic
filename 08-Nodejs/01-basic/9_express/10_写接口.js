const express = require("express");
const cors = require("cors")

const router = require("./router/apiRouter")

const app = express();
// 解决接口跨域问题
app.use(cors())
app.use("/api",router)

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
