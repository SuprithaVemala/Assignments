"use strict";
var element = [23.6, 14.2, 78.9, 90];
function roundOf(num) {
    return Math.round(num);
}
function mapSimulation() {
    var mappedElements = [];
    var i;
    for (i = 0; i < element.length; i++) {
        mappedElements.push(roundOf(element[i]));
    }
    return mappedElements;
}
console.log("Before map " + element);
console.log("After map " + mapSimulation());
