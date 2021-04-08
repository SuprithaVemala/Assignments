"use strict";
var numbers = [15.5, 2.3, 1.1, 4.7];
function getSum(total, num) {
    return total + Math.round(num);
}
console.log(numbers.reduce(getSum, 0));
var sum = numbers.reduce(function (total, amount) {
    return total + amount;
});
console.log(sum);
var average = numbers.reduce(function (total, amount, index, array) {
    total += amount;
    return total / array.length;
}, 0);
console.log(average);
