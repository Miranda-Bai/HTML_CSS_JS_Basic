//  1. 准备好数据后端的数据
let arr = [
  {
    stuId: 1001,
    uname: "欧阳霸天",
    age: 19,
    gender: "男",
    salary: "20000",
    city: "上海",
  },
  {
    stuId: 1002,
    uname: "令狐霸天",
    age: 29,
    gender: "男",
    salary: "30000",
    city: "北京",
  },
  {
    stuId: 1003,
    uname: "诸葛霸天",
    age: 39,
    gender: "男",
    salary: "2000",
    city: "北京",
  },
];
let dataArr = [];
//获取本地存储中的数据，放到数组中
function getDataArrFromLocal() {
  dataArr = JSON.parse(localStorage.getItem("dataArr"));
  //本地没有数据时，输入默认数据
  if (!dataArr || dataArr.length === 0) {
    dataArr = arr;
    setDataArrToLocal();
  }
}

//将数组中的数据存储到本地存储中
function setDataArrToLocal() {
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
}

//获取父元素
let tbody = document.querySelector("tbody");

//数据渲染函数
function render() {
  //先删除以前的数据再渲染新的数据
  tbody.innerHTML = "";

  //根据数据的条数增加tr
  for (let i = 0; i < dataArr.length; i++) {
    //创建tr
    let tr = document.createElement("tr");
    //tr里面放内容
    tr.innerHTML = `
        <td>${dataArr[i].stuId}</td>
          <td>${dataArr[i].uname}</td>
          <td>${dataArr[i].age}</td>
          <td>${dataArr[i].gender}</td>
          <td>${dataArr[i].salary}</td>
          <td>${dataArr[i].city}</td>
          <td>
            <!--给删除标签弄一个索引，方便后续删除数据-->
            <a href="javascript:" data-index="${i}">删除</a>
          </td>`;

    //把tr追加给tbody,每次都会把所有数据都读一遍
    tbody.appendChild(tr);
  }
}

//得到本地存储中的数据
getDataArrFromLocal();
console.log(dataArr);
//打开页面渲染数据
render();

let uname = document.querySelector(".uname");
let age = document.querySelector(".age");
let gender = document.querySelector(".gender");
let salary = document.querySelector(".salary");
let city = document.querySelector(".city");
//添加数据，往数据数组中添加数据
let addBtn = document.querySelector(".add");

addBtn.addEventListener("click", function () {
  //获得表单内的值，之后添加给数组

  //stuId是数组最后一条数据的学号加1，数组可能为空
  let id = dataArr.length === 0 ? 1000 : dataArr[dataArr.length - 1].stuId + 1;

  dataArr.push({
    stuId: id,
    uname: uname.value,
    age: age.value,
    gender: gender.value,
    salary: salary.value,
    city: city.value,
  });
  console.log(dataArr);

  //渲染数据
  render();
  //把数据数组存入本地存储中
  setDataArrToLocal();

  //复原录入表单的所有数据
  document.querySelector(".uname").value =
    document.querySelector(".age").value =
    document.querySelector(".salary").value =
      "";
  document.querySelector(".gender").value = "男";
  document.querySelector(".city").value = "北京";
});

//将删除事件委托给tbody执行
tbody.addEventListener("click", function (e) {
  /* console.dir(e.target);
    console.dir(e.target.tagName); */

  //   console.log(e.target);
  //只有点击删除链接时，才会触发删除操作
  if (e.target.tagName === "A") {
    //删除数组中的数据，再重新渲染数据
    //第一条数据不允许删除
    if (e.target.dataset.index === "0") {
      alert("不允许删除第一条数据");
      return;
    }
    dataArr.splice(e.target.dataset.index, 1);
    console.log(e.target.dataset.index);
    render();
    //把数据数组存入本地存储中
    setDataArrToLocal();
  }
});
