let elements:number[]=[2,3,6,8,4,5,7,9]

function oddOrEven(number:number){
    if(number%2==0)
    return true
    else
    return false
}

function filterSimulation(){
    let filteredElements:number[]=[]
    let i:number
    for(i=0;i<elements.length;i++)
    {
        if(oddOrEven(elements[i]))
        filteredElements.push(elements[i])
    }
    return filteredElements
}

console.log(filterSimulation())