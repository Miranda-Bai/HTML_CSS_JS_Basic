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
//获取父元素
let tbody = document.querySelector("tbody");

//数据渲染函数
function render() {
  //先删除以前的数据再渲染新的数据
  tbody.innerHTML = "";

  //根据数据的条数增加tr
  for (let i = 0; i < arr.length; i++) {
    //创建tr
    let tr = document.createElement("tr");
    //tr里面放内容
    tr.innerHTML = `
        <td>${arr[i].stuId}</td>
          <td>${arr[i].uname}</td>
          <td>${arr[i].age}</td>
          <td>${arr[i].gender}</td>
          <td>${arr[i].salary}</td>
          <td>${arr[i].city}</td>
          <td>
            <!--给删除标签弄一个索引，方便后续删除数据-->
            <a href="javascript:" id="${i}">删除</a>
          </td>`;

    //把tr追加给tbody,每次都会把所有数据都读一遍
    tbody.appendChild(tr);
  }
}
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
  let id = arr.length === 0 ? 1000 : arr[arr.length - 1].stuId + 1;

  arr.push({
    stuId: id,
    uname: uname.value,
    age: age.value,
    gender: gender.value,
    salary: salary.value,
    city: city.value,
  });
  console.log(arr);

  //渲染数据
  render();

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
    arr.splice(e.target.id, 1);
    console.log(arr);
    render();
  }
});
