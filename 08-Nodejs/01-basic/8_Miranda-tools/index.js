//包的入口文件
//定义格式化时间的函数
function dateFormat(){
    const dt = new Date();
    const y = dt.getFullYear();
    const m = padZero(dt.getMonth()+1)
    const d = padZero(dt.getDate())
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
function padZero(number){
    return number < 10 ? "0"+number : number;
}

//定义转移HTML字符的函数
function HTMLEscape(htmlStr){
    return htmlStr.replace(/<|>|"|&/g,(match)=>{
        switch(match){
            case '<':
                return '&lt;'
            case '>' :
                return "&gt;"
            case '"':
                return "&quot;"
            case "&":
                return "&amp;"
        }
    })
}

// 定义还原 HTML 字符串函数
function htmlUnescape(str){
    return str.replace(/&lt;|&gt;|&quot;|&amp;/g,(match)=>{
        switch(match){
            case '&lt;':
                return '<'
            case '&gt;':
                return '>'
            case '&quot;':
                return '"'
            case '&amp;':
                return '&'
        }
    })
}

module.exports = {
    dateFormat,
    HTMLEscape,
    htmlUnescape
}