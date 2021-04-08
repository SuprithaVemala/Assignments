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

async function oddOrEvenDemo(){
    console.log("Execution starts")
    try{
    let result=await oddOrEven(11)
    console.log(result)
    }
    catch(error){
        console.log(error)
    }
   console.log("Execution ends")
}
oddOrEvenDemo()

/* In the async function, await keyword waits for the promise to be complete (resolve or reject). */