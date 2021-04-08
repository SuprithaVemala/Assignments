let numbers:number[] = [15.5, 2.3, 1.1, 4.7];
function getSum(total:number, num:number) {
  return total + Math.round(num);
}

console.log(numbers.reduce(getSum,0))
var sum = numbers.reduce( function(total:number, amount:number){
  return total + amount
});

console.log(sum)

const average = numbers.reduce((total:number, amount:number,index:number, array:number[]) => {
    total += amount
    return total/array.length
  }, 0);
console.log(average)

  
