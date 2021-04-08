let para=document.getElementById("movies")
fetch("http://localhost:3000/movies")
.then(response=>{
    return response.json()
}).then(result=>{
    para.innerHTML+=`PVR:<br>`
    for(let movie of result){
        para.innerHTML+=`Movie name: ${movie.movie}            | `
        para.innerHTML+=`Timing: ${movie.timing}<br>`
    }
    para.innerHTML+=`<br>`
})

fetch("http://localhost:4000/movies")
.then(response=>{
    return response.json()
}).then(result=>{
    para.innerHTML+=`Inox:<br>`
    for(let movie of result){
        para.innerHTML+=`Movie name: ${movie.movie}            | `
        para.innerHTML+=`Timing: ${movie.timing}<br>`
    }
    para.innerHTML+=`<br>`
})

fetch("http://localhost:5000/movies")
.then(response=>{
    return response.json()
}).then(result=>{
    para.innerHTML+=`Multiplex:<br>`
    for(let movie of result){
        para.innerHTML+=`Movie name: ${movie.movie}             | `
        para.innerHTML+=`Timing: ${movie.timing}<br>`
    }
    para.innerHTML+=`<br>`
})
