# npm包管理器
## 安装指定版本的包
npm i dayjs@version
## 快速新建package.json文件
npm init -y
## 根据package.json文件安装所有依赖包
npm i or npm install
## 卸载包
npm uninstall <packageName>
## 安装开发时用到但上线后不会用到的包
npm i <package name> -D
npm install <package name> --save-dev
## 将下载包的镜像源切换为淘宝镜像源
npm config set registry=https://registry.npm.taobao.org/
1. 将nrm安装为全局可用的工具
    npm i nrm -g
2. 查看所有可用的镜像源
    nrm ls
3. 将下包的镜像源切换为 taobao镜像
    nrm use taobao
## 将 i5ting_toc安装为全局包
npm i -g i5ting_toc
实现md转html的功能
i5ting_toc -f <md filename> -o

## 将包发布到npm上（包名不能雷同）
npm publish
npm unpublish --force 
只能删除72小时以内发布的包，删除的包在24小时内不允许重复发布， 尽量不要往npm上发布没有意义的包
## 模块的加载机制
模块在第一次加载后会被缓存，多次调用require()不会导致模块代码被执行多次
模块会优先从缓存中加载，提高模块的加载效率
内置模块的加载优先级是最高的
> 如果传递给require()的模块标识符不是内置模块，也不是自定义模块，则Node.js会从当前模块的父目录开始，尝试从/node_modules文件夹中加载第三方模块。
> 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。
# Express
> npm install express --save
# install nodemon
sudo npm i -g nodemon

node => nodemon
可以自动监听项目的改变，不需要手动重启

# Express中间件
## 调用流程
当一个请求到达Express的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理
中间件格式如下：
``` 
app.get("/", function(req, res, next){
    next()
})
```
中间件函数的形参列表中，必须包含next参数。而路由处理函数中只包含req和res。
next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。
> 局部生效的中间件， 全局中间件先生效

```
app.get("/", mw, mw2, mw3, (req,res)=>{
    res.send("Home page")
}) 

app.get("/", [mw, mw2, mw3], (req,res)=>{
    res.send("Home page")
})
```
## 常见的中间件用法
1. 应用级别的中间件
2. 路由级别的中间件
3. 错误级别的中间件
    (error,req,res,next)
    必须注册在所有路由之后
4. Express 内置的中间件
5. 第三方的中间件
> 除了错误级别的中间件，其他中间件都必须在路由之前注册

express.static 快速托管静态资源内置中间件，无兼容性问题
express.json 解析json格式的请求体数据 4.16.0+可用
express.urlencoded 解析 URL-encoded 格式的请求体数据 4.16.0+可用
# 接口的跨域问题
解决跨域问题的两种方案：
1. CORS(主流的解决方案，推荐使用)
    npm install cors
    const cors = require("cors")
    app.use(cors())
2. JSONP（有缺陷的解决方案，只支持GET请求）
