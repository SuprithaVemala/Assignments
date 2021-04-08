const eventEmitter = require("events");

const isPrimeSync = function (number) {
  if (number < 2) return false;
  if (number == 2) return true;
  for (let i = 2; i <= number / 2; i++) if (number % i === 0) return false;

  return true;
};

function primeFinder(min, max) {
  let event = new eventEmitter();
  if (min > max) {
    setImmediate(()=>event.emit("err"))
  } else {
    let lo = min;
    let hi = Math.min(lo + 100, max);
    let iid = setInterval(() => {
      for (let i = lo; i < hi; i++)
      {
        if (isPrimeSync(i)) 
        event.emit("foundPrime", i);
      }
      event.emit("progress", (hi / max) * 100);
      lo = hi;
      hi = Math.min(lo + 100, max);
       if ((lo / max) * 100 >= 70) {
        event.emit("abort");
        clearInterval(iid);
      }  
      if (lo >= max) {
        event.emit("completed");
        clearInterval(iid);
      }
    }, 1000);
  }
  return event;
}

module.exports={primeFinder}


