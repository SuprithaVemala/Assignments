const Primes = require("./primes");
const cliProgress = require("cli-progress");
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(100, 0);
let primeEvent = Primes.primeFinder(2, 1000);
let primesArray = [];
primeEvent.on("foundPrime", (primeNumber) => {
  primesArray.push(primeNumber);
});
primeEvent.on("err", () => console.log("Range is wrong"));
primeEvent.on("progress", (percent) => {
  bar.update(percent);
});
primeEvent.on("abort", () => {
  bar.stop();
  console.log("Program aborted");
  console.log("Primes found uptill now ");
  for (i = 0; i < primesArray.length; i++)
    console.log(`${i}->${primesArray[i]}`);
});
primeEvent.on("completed", () => {
  bar.stop();
  console.log("Program completed");
  console.log("Primes found");
  for (i = 0; i < primesArray.length; i++)
    console.log(`${i}->${primesArray[i]}`);
});
