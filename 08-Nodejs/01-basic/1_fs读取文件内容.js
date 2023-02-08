const fs = require("fs");
fs.readFile("./data.json", "utf8", (err, dataStr) => {
  if (err) {
    console.log("read file failed!!", err);
  } else {
    console.log(JSON.parse(dataStr));
  }
});
