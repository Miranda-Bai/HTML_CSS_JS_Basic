//立即执行函数
(function () {
  //1.发送验证码
  let code = document.querySelector(".code");

  code.addEventListener("click", function () {
    //倒计时读秒操作
    this.innerHTML = "05秒之后获取";
    let countdown = 5;
    let timer = setInterval(function () {
      countdown--;
      code.innerHTML = `0${countdown}秒之后获取`;

      if (countdown === 0) {
        code.innerHTML = "重新获取验证码";
        clearInterval(timer);
      }
    }, 1000);
  });

  //2. 用户名验证
  let username = document.querySelector("[name=username]");

  //验证用户名 change事件 当表单里的值发生变化的时候触发
  username.addEventListener("change", verifyUsername);

  //验证用户名的函数
  function verifyUsername() {
    //用户名以英文字符、数字、下划线或短横线开始，6到10位
    //只能输入中文 ^[\u4e00-\u9fa5]{2,8}$
    let regex = /^[a-zA-Z0-9_-]{6,10}$/;
    let msg = username.nextElementSibling;

    if (!regex.test(username.value)) {
      msg.innerHTML = "用户名输入错误，请重新输入！";
      return false;
    }
    msg.innerHTML = "";
    return true;
  }

  //3. 手机号验证
  let phone = document.querySelector("[name=phone]");

  phone.addEventListener("change", verifyPhoneNumber);

  function verifyPhoneNumber() {
    //验证国内手机号的正则表达式
    let regex = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    let msg = phone.nextElementSibling;

    if (!regex.test(phone.value)) {
      msg.innerHTML = "输入错误，请重新输入！";
      return false;
    }
    msg.innerHTML = "";
    return true;
  }

  //4. 验证码验证
  let codeTxt = document.querySelector("[name=code]");

  codeTxt.addEventListener("change", verifyCodeTxt);

  function verifyCodeTxt() {
    let regex = /^\d{6}$/;
    let msg = codeTxt.nextElementSibling;

    if (!regex.test(codeTxt.value)) {
      msg.innerHTML = "输入错误，请重新输入！";
      return false;
    }
    msg.innerHTML = "";
    return true;
  }

  //5. 密码验证
  let passwordTxt = document.querySelector("[name=password]");

  passwordTxt.addEventListener("change", verifyPassword);

  function verifyPassword() {
    let regex = /^[a-zA-Z0-9-_]{6,20}$/;
    let msg = passwordTxt.nextElementSibling;

    if (!regex.test(passwordTxt.value)) {
      msg.innerHTML = "设置6至20位字母、数字和符号组合";
      return false;
    }
    msg.innerHTML = "";
    return true;
  }

  //6. 密码确认
  let passwordConfirm = document.querySelector("[name=confirm]");

  passwordConfirm.addEventListener("change", verifyPSDConfirm);

  function verifyPSDConfirm() {
    let msg = passwordConfirm.nextElementSibling;
    if (passwordConfirm.value !== passwordTxt.value) {
      console.log("wrong");
      msg.innerHTML = "两次密码不一致！";
      return false;
    }
    msg.innerHTML = "";
    return true;
  }

  //7.勾选同意协议
  let icon = document.querySelector(".icon-queren");

  icon.addEventListener("click", function () {
    this.classList.toggle("icon-queren2");
  });

  //8. 点击按钮，实际上是表单提交
  let submitForm = document.querySelector(".xtx-form");

  submitForm.addEventListener("submit", function (e) {
    //验证不通过阻止自动提交 验证通过 之后再提交

    if (
      !verifyUsername() ||
      !verifyPhoneNumber() ||
      !verifyPassword() ||
      !verifyPSDConfirm() ||
      !verifyCodeTxt()
    ) {
      e.preventDefault();
    } 
    if(!icon.classList.contains("icon-queren2")){
      //判断是否勾选
      e.preventDefault();
      alert("请勾选同意用户协议！");
      // icon.nextElementSibling.style.color="red";
      // console.log(document.querySelector(".xtx-form-item.pl50"));
    }
  });
})();
