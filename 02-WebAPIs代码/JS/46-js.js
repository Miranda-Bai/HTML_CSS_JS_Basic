let backTop = document.querySelector(".backtop");

//1. 页面滚动事件
window.addEventListener("scroll", function () {
  //2.页面检测滚动距离
  //3.进行判读显示或隐藏
  let num = this.document.documentElement.scrollTop;
  //   console.log(num);
  if (num >= 500) {
    backTop.style.display = "block";
  } else {
    backTop.style.display = "none";
  }
});

//2.点击链接返回顶部
backTop.addEventListener("click", function (e) {
//   console.log(e.target.tagName);
 
  if (e.target.tagName === "A") {
     //如果点的是返回顶部的链接,返回顶部时会触发window的滚动事件
    document.documentElement.scrollTop = 0;
  } else if(e.target.tagName === "IMG"){
    //如果点击的是关闭图片
    this.style.display="none";
  }
});
