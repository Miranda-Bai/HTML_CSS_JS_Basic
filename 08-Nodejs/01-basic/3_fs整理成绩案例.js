const fs = require("fs");
fs.readFile(__dirname+"/files/score.txt", "utf-8", function (error, data) {
  if (error) {
    return console.log("read file failed!!", error);
  }
//   console.log(data);
  const array = data.split(",");
//   console.log(array);
  if (array) {
    let temp = "";
    array.forEach((item) => {
      temp = temp + item.replace(" = ", ":").trim() + "\r\n";
    });
    fs.writeFile(__dirname+"/files/score2.txt", temp, function (error) {
      if (error) console.log("write file failed!!", error);
    });
  }
});

console.log("@@filename: ",__filename)
console.log("@@dirname: ",__dirname)
