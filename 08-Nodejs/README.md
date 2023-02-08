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

