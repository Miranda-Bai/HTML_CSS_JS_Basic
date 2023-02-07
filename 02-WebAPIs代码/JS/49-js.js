let sideLst = document.querySelectorAll(".slides li");
let indLst = document.querySelectorAll(".indicator li");

//1.给indicator下的小li绑定鼠标事件
//2.删除第一个active，再给当前li加上active
//3.side的大图跟着移动
//4.描述信息h3的内容要跟着变
for (let i = 0; i < indLst.length; i++) {
  indLst[i].addEventListener("mouseenter", function () {
    document.querySelector(".indicator .active").classList.remove("active");
    this.classList.add("active");

    document.querySelector(".slides .active").classList.remove("active");
    sideLst[i].classList.add("active");

    document.querySelector(".extra h3").innerHTML =
      sideLst[i].querySelector("img").alt;

    //改索引号
    index = i;
  });
}
//标记现在显示的是第几张图的全局变量 信号量 控制器
let index = 0;

let preBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

preBtn.addEventListener("click", function () {
  if (index === 0) {
    index = sideLst.length - 1;
  } else {
    index--;
  }

  //   index = index === 0 ? sideLst.length - 1 : index--;
  //触发对应li的mouseenter事件,用不了
  //   indLst[index].mouseenter();
  switchFN(index);
});

nextBtn.addEventListener("click", function () {
  if (index === sideLst.length - 1) {
    index = 0;
  } else {
    index++;
  }
  //触发对应li的mouseenter事件，用不了
  //   indLst[index].mouseenter();
  switchFN(index);
});

function switchFN(index) {
  document.querySelector(".indicator .active").classList.remove("active");
  indLst[index].classList.add("active");

  document.querySelector(".slides .active").classList.remove("active");
  sideLst[index].classList.add("active");

  document.querySelector(".extra h3").innerHTML =
    sideLst[index].querySelector("img").alt;
}

//开启定时器，自动轮播
let timer = setInterval(function () {
  //自动调用右侧按钮的点击事件
  nextBtn.click();
}, 1000);

let mainDiv = document.querySelector(".main");

//鼠标经过大盒子的任何区域，停止定时器
mainDiv.addEventListener("mouseenter", function () {
  clearInterval(timer);
});

//鼠标离开开启定时器
mainDiv.addEventListener("mouseleave", function () {
  timer = setInterval(function () {
    //自动调用右侧按钮的点击事件
    nextBtn.click();
  }, 1000);
});
