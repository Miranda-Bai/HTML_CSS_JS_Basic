//1. li 默认有个宽度是240px
// 2. 当鼠标经过， 当前li 宽度变大800px 其余li 变为100px
// 3. 鼠标离开时，所有小li都要复原 宽度为240px

let ul = document.querySelector("ul");
//得到ul的所有li
let liArr = ul.children;

//因为li比较多，所以将事件委托给父节点ul
//鼠标经过事件，需要用有冒泡模式的mouseover
ul.addEventListener("mouseover", function (e) {
  //target是img图片标签
  //得到当前li标签
  let currentLi = e.target.parentNode.parentNode;
  //先把ul的所有li 宽度都改为100px
  for (let i = 0; i < liArr.length; i++) {
    liArr[i].style.width = "100px";
  }
  //当前li 宽度变大800px
  currentLi.style.width = "800px";
});

ul.addEventListener("mouseout", function (e) {
  //所有小li都要复原 宽度为240px
  for (let i = 0; i < liArr.length; i++) {
    liArr[i].style.width = "240px";
  }
});
