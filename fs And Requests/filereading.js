var fs=require('fs');

fs.readFile('textfile.txt','utf8',function(err,data){
    console.log(data)
})

fs.mkdir('demo',()=>{
    setTimeout(()=>fs.rmdir('demo',()=>console.log("removed folder demo sucessfully")),10000)
})
