let myReadStream=fs.createReadStream('googlepage.txt','utf8')
let myWriteStream=fs.createWriteStream('newgooglepage.txt')

myReadStream.pipe(myWriteStream)
console.log("piped the contents from googlepage.txt to newgooglepage.txt")