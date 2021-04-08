"use strict";
var elements = [2, 3, 6, 8, 4, 5, 7, 9];
function oddOrEven(number) {
    if (number % 2 == 0)
        return true;
    else
        return false;
}
function filterSimulation() {
    var filteredElements = [];
    var i;
    for (i = 0; i < elements.length; i++) {
        if (oddOrEven(elements[i]))
            filteredElements.push(elements[i]);
    }
    return filteredElements;
}
console.log(filterSimulation());
