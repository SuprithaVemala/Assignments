var fs = require("fs");
var request = require("request");

/* request("https://www.google.com", (err, response, body) => {
    console.log(body);
    fs.writeFile("node problems/googlepage.txt",body,()=>{
        console.log("copy file created successfully")
    })
}); */

request.get('http://google.com').pipe(fs.createWriteStream('./google.txt'))

