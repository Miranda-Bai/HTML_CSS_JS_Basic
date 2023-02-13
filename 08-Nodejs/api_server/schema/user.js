const Joi = require("joi");

// 2. 定义验证规则
// 注意：如果客户端提交的某些参数项未在 schema 中定义，
// 此时，这些多余的参数项默认会被忽略掉
/* const userSchema = {
    // 2.1 校验 req.body 中的数据
    body: {
      username: Joi.string().alphanum().min(3).max(12).required(),
      password: Joi.string()
        .pattern(/^[\S]{6,15}$/)
        .required(),
      repassword: Joi.ref("password"),
    },
    // 2.2 校验 req.query 中的数据
    query: {
      name: Joi.string().alphanum().min(3).required(),
      age: Joi.number().integer().min(1).max(100).required(),
    },
    // 2.3 校验 req.params 中的数据
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  };
 */

// 定义用户名和密码验证规则
const username = Joi.string().alphanum().min(1).max(10).required();
const password = Joi.string()
  .pattern(/^[\S]{6,12}$/)
  .required();

// 定义 id nickname emial 验证规则
const id = Joi.number().integer().min(1).required();
const nickname = Joi.string().required();
const email = Joi.string().email().required();

// 定义用户头像 验证规则，需要是base64格式的字符串
// dataUri() 指的是如下格式的字符串 - data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = Joi.string().dataUri().required();

// 注册用户的表单验证规则
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};

// 更新用户信息的表单验证规则
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
};

// 重置密码的表单验证规则
exports.update_password_schema = {
  body: {
    oldPwd: password,
    // 新密码不等于旧密码，且要符合密码的验证规则
    newPwd: Joi.not(Joi.ref("oldPwd")).concat(password),
  },
};

// 更新用户头像表单验证规则
exports.update_avatar_schema = {
  body: {
    avatar,
  },
};
