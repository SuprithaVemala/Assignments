let divID=document.getElementById("body")
function ajaxGet(uri,call){
    let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(xhttp.readyState==4){
            if(xhttp.status==200){
               call(false,JSON.parse(xhttp.responseText))
            }
            else
            call(new Error("File not found"))   
        }
    }
    xhttp.open('get',uri,true)
    xhttp.send();

}

function callback(err,books){
    if(err){
        console.log("error", err);
    } else{
        displayBooks(books)
    }
}

function displayBooks(books){
    for(let b of books)
    {
        divID.innerHTML+=`<h4>Title-${b.title}</h4>Author-${b.author}<br>Rating-${b.rating}<br>`;
    }
}
ajaxGet("http://localhost:3000/books",callback)