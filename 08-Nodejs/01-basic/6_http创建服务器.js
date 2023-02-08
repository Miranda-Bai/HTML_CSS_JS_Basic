const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer();
//为服务器绑定request事件，监听客户端的请求, 默认是get请求，模拟post请求可以用postman
server.on("request", function (req, res) {
  console.log("Someone is visiting the sever.");
  const url = req.url;
  // /clock/index.html
  let fpath = '';
  if(url === '/'){
    console.log("@url:" ,url)
    fpath = path.join(__dirname, "/clock/index.html")
  } else{
    console.log("@url:" ,url)
    fpath = path.join(__dirname,'/clock',url)
  }
console.log("fpath: ", fpath)
  //设置响应头，防止中文乱码. 返回非HTML文件时使用
//   res.setHeader("Content-Type", "text/html;charset=utf-8");

  fs.readFile(fpath, "utf-8", (error, data) => {
    if (error) return res.end("404 Not Found!");
    //   console.log(data);
    res.end(data);
  });
});

//启动服务器,监听对应端口号，若端口号为80访问时可以省略
server.listen(8080, function () {
  console.log("The server is running at http://127.0.0.1:8080");
});

