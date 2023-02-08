const formater = require("../8_Miranda-tools")

// const dt = formater.dateFormat();
// console.log(dt)

const htmlStr = '<h1 title="abc">this is h1 element<span>123&nbsp;</span></h1>'
const str = formater.HTMLEscape(htmlStr)
console.log(str)

console.log(formater.htmlUnescape(str))