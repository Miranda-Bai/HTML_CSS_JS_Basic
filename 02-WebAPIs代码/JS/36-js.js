//模拟数据
let dataArr = [
  { uname: "小明", imgSrc: "img/24-1.webp" },
  { uname: "李浩", imgSrc: "img/24-3.webp" },
  { uname: "刘德华", imgSrc: "img/24-4.webp" },
  { uname: "武则天", imgSrc: "img/24-5.webp" },
  { uname: "司马懿", imgSrc: "img/24-6.webp" },
  { uname: "貂蝉", imgSrc: "img/24-7.webp" },
  { uname: "狄仁杰", imgSrc: "img/24-8.webp" },
];

// 通过id获取元素
let textArea = document.querySelector("#area");
let useCount = document.querySelector(".useCount");

textArea.addEventListener("input", function () {
  // 1.不断得到文本域中的字符长度
  //   console.log(this.value);
  useCount.innerHTML = this.value.length;
});

//发布微博内容
let btn = document.querySelector("#send");

btn.addEventListener("click", function () {
  //2.输入内容不能为空,同时防止无意义的空格;trim()去掉首位空格
  if (!textArea.value.trim()) {
    //将表单value值设为空
    textArea.value = "";
    //同时下面红色设为0
    useCount.innerHTML = 0;
    return alert("输入内容不能为空！");
  }
  //3.新增留言
  //获取ul 标签，追加li
  let ul = document.querySelector("#list");
  //创建li标签
  let li = document.createElement("li");

  //获得随机索引号
  let random = getRandom(0, dataArr.length - 1);
  //yyyy年mm月dd日 HH:MM:SS
  li.innerHTML = `
      <div class="info">
        <img class="userpic" src=${dataArr[random].imgSrc}  />
        <span class="username">${dataArr[random].uname}</span>
        <p class="send-time">发布于 ${new Date().toLocaleDateString()}</p>
      </div>
      <div class="content">${textArea.value}</div>
      <span class="the_del">×</span>`;

  //4.删除事件要写到发布事件中，因为只有发布完之后才能删除
  //发布的时候，同时给×号绑定删除事件
  let del = li.querySelector(".the_del");
  del.addEventListener("click", function () {
    //删除li 父元素.removeChild(要删除的子元素)
    ul.removeChild(li);
  });

  //最新发布的放到最前面
  ul.insertBefore(li, ul.children[0]);
  //发布之后要清空文本框
  textArea.value = "";
  //同时下面红色设为0
  useCount.innerHTML = 0;
});

//添加文本框回车发布文本事件
textArea.addEventListener("keyup", function (e) {
  //   console.log(e);
  if (e.key === "Enter") {
    //自动触发点击send按钮
    btn.click();
  }
});

//返回min~max之间的一个随机数,包含min和max
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
