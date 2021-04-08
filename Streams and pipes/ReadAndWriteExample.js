const fs=require('fs')

let myReadStream=fs.createReadStream('googlepage.txt','utf8')
let myWriteStream=fs.createWriteStream('newgooglepage.txt')

myReadStream.on("data",(data)=>{
    console.log("---------------------------------------------new chunk---------------------------------------------------")
    console.log(data)
    myWriteStream.write(data)
})
