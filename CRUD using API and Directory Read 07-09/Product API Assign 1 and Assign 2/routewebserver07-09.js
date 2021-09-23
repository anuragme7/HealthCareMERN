const http = require("http");
const fs = require("fs");
const path = require("path");
let map=new Map();
const serverPath = path.join(__dirname, "./../views");
let x;
fs.readdir(serverPath, (err, files) => {
    if (err) {
      console.log('error in readdir');
      return;
    }
    files.forEach((file, i) => {
      x=`/${file.slice(0,file.lastIndexOf('.'))}`;
      map.set(x,file);
    });
  });   
  


const server = http.createServer((req, resp) => {
  let url=map.get(req.url);
  console.log(url);
  if(url===undefined){
    resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write('Please check the URL');
        resp.end();
  }
  else{
    fs.readFile(
      `${serverPath}/${url}`,
      { encoding: "ascii" },
      (error, file) => {
        if (error) {
          resp.writeHead(404, { "Content-Type": "text/html" });
          resp.write(`File Not Found ${error.message}`);
          resp.end();
        }
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write(file);
        resp.end();
      }
    );
  }
});

server.listen(9080);
console.log("Started on 9080");
