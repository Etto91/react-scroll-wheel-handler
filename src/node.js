const brain = require("brain.js");
const values = require("./scrollValuesForModelTrain");
const network = new brain.NeuralNetwork();
// console.log(values);
network.train(values);

console.log(network.toFunction().toString());

const result = network.run([20, 19, 17, 43]);
console.log(result);
