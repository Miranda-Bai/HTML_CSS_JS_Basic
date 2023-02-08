const fs = require("fs");
const data = {
  userName: "Miranda",
  age: 18,
  address: "Silverdale",
};
fs.writeFile("g:/data1.json", JSON.stringify(data), (error) => {
  if (error) console.log("write file failed!!!", error.message);
});
/* fs.writeFile("./data.json", data.toString(), (error) => {
    if (error) console.log("write file failed!!!", error);
  }); */