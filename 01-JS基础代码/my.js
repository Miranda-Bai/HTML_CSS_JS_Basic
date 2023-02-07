// JavaScript source code
//function testalert(){
//    alert('你好，外部 js！');
//}
//testalert();


 /*解决外部引用JS文件乱码问题：
 最根本的办法就是更改js外部脚本的保存编码为utf8：
 使用编辑器打开时，点击另存为，选择Unicode UTF-8
 */
//alert('你好，外部 js！');

document.write('要输出的内容');
/*
 浏览器-审查元素-console控制台
 */
console.log('控制台打印');

//弹出输入框
prompt('请输入');