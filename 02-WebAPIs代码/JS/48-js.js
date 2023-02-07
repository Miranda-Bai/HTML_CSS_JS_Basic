let itemLst = document.querySelectorAll(".item");
let contentLst = document.querySelectorAll(".neirong");

for (let i = 0; i < itemLst.length; i++) {
  itemLst[i].addEventListener("click", function () {
    //1. 左侧aside模块，点击谁，谁高亮
    //找到上一个active类移除
    document.querySelector(".aside .active").classList.remove("active");
    //点击谁，谁添加active类
    this.classList.add("active");

    //2.右侧内容跟随移动
    let num = contentLst[i].offsetTop;
    // console.log(num);
    document.documentElement.scrollTop = num;
  });
}
