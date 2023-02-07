let header = document.querySelector(".header");

//1. 添加滚动事件
//2. 要检测滚动的距离 >= 秒杀模块的offsetTop 则显示头部
window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop >= document.querySelector(".sk").offsetTop) {
    header.style.top = "0px";
  } else {
    header.style.top = "-80px";
  }
});
