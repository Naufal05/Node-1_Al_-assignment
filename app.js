var http = require("http");
var fs = require("fs");
const https = require("https");

const url = "https://jsonplaceholder.typicode.com/users";

const getAPI = () => {
  const request = https.request(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });

    response.on("end", () => {
      fs.writeFile("test.json", data, function (err) {
        if (err) console.log(err);
        else console.log("Write operation complete.");
      });
    });
  });
  request.on("error", (error) => {
    console.log("An error", error);
  });
  request.end();
};

var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  var url = req.url;
  if (url === "/") {
    fs.readFile("index.html", function (err, data) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      } else {
        console.log("error");
      }
    });
  } else if (url === "/folder") {
    fs.readdir("./", (err, files) => {
      let fileName = [];
      files.forEach((file) => {
        fileName.push(file);
      });
      console.log(fileName);
      res.write(`
       <ul>
         ${fileName.map((item) => {
           return `<li  style="font-size:21px;">${item}</li>`;
         })}
       </ul> 
      `);
      res.end();
    });
  } else if (url === "/contact") {
    fs.readFile("contact.html", function (err, data) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      } else {
        console.log("error");
      }
    });
  } else {
    getAPI();
    res.write(`<h1>Data Fetch Successfully and saved in test.json file</h1>`);
    res.end();
  }
});

server.listen(8000, function (req, res) {
  console.log("server listening to localhost 8000");
});
