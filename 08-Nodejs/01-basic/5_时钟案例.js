const fs = require("fs");
const path = require("path");

// \s匹配空白字符 \S匹配任意字符 *任意多次
const regExpForStyle = /<style[\s\S]*style>/;
const regExpForScript = /<script[\s\S]*script>/;

fs.readFile(
  path.join(__dirname, "/files/clock.html"),
  "utf-8",
  (error, dataStr) => {
    if (error) {
      return console.log("read file failed!!!", error.message);
    }
    // console.log(dataStr)

    resolveCSS(dataStr);
    resolveScript(dataStr);
    resolveHTML(dataStr);
  }
);

function resolveCSS(data) {
  const r1 = regExpForStyle.exec(data);
  // console.log(r1)
  if (r1 && r1.length > 0) {
    const newCSS = r1[0].replace("<style>", "").replace("</style>", "");
    fs.writeFile(path.join(__dirname, "/files/clock.css"), newCSS, (error) => {
      if (error) return console.log("write style file failed!!", error.message);
      console.log("write style file succeed!!");
    });
  }
}

function resolveScript(data) {
  const r1 = regExpForScript.exec(data);
  //   console.log("r1 in script:", r1);
  if (r1 && r1.length > 0) {
    const newScript = r1[0]
      .replace(/<script[\s\S]*"\s*>/, "")
      .replace("</script>", "");
    // console.log("newScript:", newScript);
    fs.writeFile(
      path.join(__dirname, "/files/clock.js"),
      newScript,
      (error) => {
        if (error) return console.log("write javascript file failed!!", error.message);
        console.log("write javascript file succeed!!");
      }
    );
  }
}

function resolveHTML(data) {
  const newHTML = data
    .replace(regExpForStyle, ' <link rel="stylesheet" href="./clock.css">')
    .replace(regExpForScript, '<script src="./clock.js"></script>');
  fs.writeFile(path.join(__dirname, "/files/clock.html"), newHTML, (error) => {
    if (error) return console.log("write HTML file failed!!", error.message);
    console.log("write HTML file succeed!!");
  });
}
