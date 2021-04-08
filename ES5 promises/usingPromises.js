function oddOrEven(num){
    let promise=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(num%2==0)
        resolve("even")
        else
        reject("odd")
        },2000)
    }) 
    return promise
}

console.log("Execution starts")
oddOrEven(11).then(result=>
    console.log(result))
    .catch(error=> 
        console.log(error))
console.log("Execution ends")
    
/* a promise is a good way to handle asynchronous operations. 
It is used to find out if the asynchronous operation is successfully completed or not. */
