let addBtnLst = document.querySelectorAll(".add");
let reduceBtnLst = document.querySelectorAll(".reduce");
let delBtnLst = document.querySelectorAll(".del");

// 商品总价
let totalLst = document.querySelectorAll(".total");
//商品单价
let priceLst = document.querySelectorAll(".price");

//全选checkbox
let checkAll = document.querySelector("#all");
//checkbox
let chckLst = document.querySelectorAll(".s_ck");

//显示购物车总价
// document.querySelector("#totalPrice").innerHTML = totalSum() + "￥";

for (let i = 0; i < addBtnLst.length; i++) {
  //增加购物车内商品数量
  addBtnLst[i].addEventListener("click", function () {
    //数量框,隐式转换
    let valueTxt = this.previousElementSibling;

    valueTxt.value++;
    //parseInt("1112abs")结果时1112;符号在数字前时用"￥1123".replace('￥','');
    totalLst[i].innerHTML =
      parseFloat(priceLst[i].innerText) * parseInt(valueTxt.value) + "￥";
    console.log(totalLst[i].innerHTML);

    //减少按钮可用
    reduceBtnLst[i].disabled = false;
  });
  //减少购物车内商品数量
  reduceBtnLst[i].addEventListener("click", function () {
    let valueTxt = this.nextElementSibling;

    valueTxt.value--;

    totalLst[i].innerHTML =
      parseFloat(priceLst[i].innerText) * parseInt(valueTxt.value) + "￥";
    console.log(totalLst[i].innerHTML);

    if (parseInt(valueTxt.value) === 1) {
      this.disabled = true;
    }
  });

  //给小删除绑定事件
  delBtnLst[i].addEventListener("click", function () {
    //找到当前行tr
    let tr = this.parentNode.parentNode;
    console.log(tr);

    tr.parentNode.removeChild(tr);
  });

  //给小checkbox绑定事件
  chckLst[i].addEventListener("click", function () {
    if (!this.checked) {
      checkAll.checked = false;
      checkAll.nextElementSibling.innerHTML = "全选";
    } else {
      // 如果所有小按钮都选中，则要改变全选
      let ck = 1;
      for (let j = 0; j < chckLst.length; j++) {
        //如果有没被选中的小按钮，则ck为0
        if (!chckLst[j].checked) {
          ck = 0;
          //   console.log("ck=" + ck);
        }
      }
      // 如果所有小按钮都选中，则要改变全选
      if (ck) {
        checkAll.nextElementSibling.innerHTML = "取消";
        checkAll.checked = true;
      }
    }
  });
}

//给全选checkbox绑定事件
checkAll.addEventListener("click", function () {
  for (let i = 0; i < chckLst.length; i++) {
    chckLst[i].checked = this.checked;
  }

  if (this.checked) {
    // console.log(this.nextElementSibling);
    this.nextElementSibling.innerHTML = `取消`;
  } else {
    this.nextElementSibling.innerHTML = `全选`;
  }
});

//计算购物车总价的函数
function totalSum() {
  // 商品总价
  let totalLst = document.querySelectorAll(".total");
  let sum = 0;
  for (let i = 0; i < totalLst.length; i++) {
    //parseInt("1112abs")结果时1112;符号在数字前时用"￥1123".replace('￥','');
    let temp = +totalLst[i].innerText.replace("￥", "");
    console.log(temp);
    sum = sum + temp;
  }
  //小数点后保留2位
  //   console.log(sum.toFixed(2));
  return sum.toFixed(2);
}
