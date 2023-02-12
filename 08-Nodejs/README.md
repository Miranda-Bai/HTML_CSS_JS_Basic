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
# Mysql
```
CREATE TABLE `my_db_01`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Unique identification for users',
  `username` VARCHAR(45) NOT NULL COMMENT 'User name to log in',
  `password` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'User’s status is a boolean\n0 - normal\n1- forbidden',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
COMMENT = 'Users’ information table';
```
```
insert into my_db_01.users(username, password) values ('Tony Stark','098123');
select * from my_db_01.users;
select * from my_db_01.users where username<>'admin';
select * from my_db_01.users where username<>'admin' and username<>'Lizz'
order by id desc;
-- 默认升序排序，可省略ASC
select * from my_db_01.users where username<>'admin' and username<>'Lizz'
order by status desc, username asc;
select count(*) as total from my_db_01.users where status=1;
update my_db_01.users set password='888888' where username='Miranda';
update my_db_01.users set password='666666', status=1 where id=2;
delete from my_db_01.users where username='joe';
drop table my_db_01.users;
```
## 项目中使用mysql
npm install mysql2
# 身份认证
1. 服务端渲染推荐使用Session认证机制
2. 前后端分离推荐使用JWT认证机制
## Session认证机制
* HTTP协议的无状态性
    客户端的每次HTTP请求都是独立的，连续多个请求之间没有直接的关系，服务器不会主动保留每次HTTP请求的状态。
* Cookie
    是存储在用户浏览器中的一段不超过4KB的字符串。由一个名称，一个值和其它几个用于控制Cookie有效期，安全性，使用范围的可选属性组成。
    不同域名下的Cookie各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的Cookie一同发送到服务器。
    特性：自动发送 域名独立 过期时限 4KB限制
    > Cookie不具有安全性，不要使用Cookie存储重要且隐私的数据，比如用户身份信息，密码等。
    提高身份认证安全性：检测Cookie存在 + 认证Cookie是否真实
* express-session中间件
    npm install express-session
    
   ```
   const session = require("express-session")
    // 配置session中间件
    app.use(session({
        secret:'miranda cat', // 可以为任意字符串
        resave:false,
        saveUninitialized:true,
    })) 
    ```
    配置完成后，可以通过req.session来访问和使用session对象，从而存储用户的关键信息。
### Session认证的局限性
Session认证需要配合Cookie才能实现。由于Cookie默认不支持跨域访问。所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域Session认证。
## JWT认证机制
Json Web Token
* JWT的组成部分
    Header Payload-有效荷载 Signature
    三者之间使用英文 . 分隔, 格式如下:
    `Header.Payload.Signature`
    Payload部分时真正的用户信息，它是用户信息经过加密之后生成的字符串。
    Header和Signature是安全性相关的部分，只是为了保证Token的安全性。
* JWT相关的包
    jsonwebtoken 用于生成 JWT字符串
    express-jwt 用于将 JWT字符串还原成 JSON对象
* 将JWT字符串还原为JSON对象
    客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的Authorization字段，将Token字符串发送到服务器进行身份认证。
    此时，服务器可以通过express-jwt将客户端发送过来的Token解析为JSON对象。
    
    ![Screenshot 2023-02-10 at 8.48.27 PM](assets/Screenshot%202023-02-10%20at%208.48.27%20PM.png)
# 对密码进行加密
package: bcryptjs
特性：加密之后的密码，无法被逆向破解
同一明文密码多次加密，得到的加密结果各不相同，保证了安全性。
# 表单数据验证
@hapi/joi 包, 已废弃 => joi包 ，定义验证规则
@escook/express-joi 包，自动对表单数据进行验证的功能

    