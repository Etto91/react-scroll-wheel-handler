const brain = require("brain.js");
const values = require("./newFile");
const network = new brain.NeuralNetwork();
console.log(values);
network.train([
    {
        input: [0, 0, 0, 1],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [0, 0, 1, 9],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [0, 1, 9, 13],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [1, 9, 13, 23],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [9, 13, 23, 52],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [13, 23, 52, 38],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [23, 52, 38, 86],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [52, 38, 86, 90],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [38, 86, 90, 92],
        output: { increase: 1, mac: 1, trackpad: 1 }
    },
    {
        input: [86, 90, 92, 90],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [90, 92, 90, 87],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [92, 90, 87, 84],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [90, 87, 84, 80],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [87, 84, 80, 77],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [84, 80, 77, 72],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [80, 77, 72, 66],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [77, 72, 66, 62],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [72, 66, 62, 58],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [66, 62, 58, 55],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [62, 58, 55, 51],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [58, 55, 51, 47],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [55, 51, 47, 43],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [51, 47, 43, 40],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [47, 43, 40, 37],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [43, 40, 37, 34],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [40, 37, 34, 31],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [37, 34, 31, 28],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [34, 31, 28, 26],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [31, 28, 26, 24],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [28, 26, 24, 22],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [26, 24, 22, 20],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [24, 22, 20, 19],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [22, 20, 19, 17],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [20, 19, 17, 16],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [19, 17, 16, 14],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [17, 16, 14, 13],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [16, 14, 13, 12],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [14, 13, 12, 11],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [13, 12, 11, 10],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [12, 11, 10, 9],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [11, 10, 9, 8],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [10, 9, 8, 8],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [9, 8, 8, 7],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [8, 8, 7, 6],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [8, 7, 6, 6],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [7, 6, 6, 5],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [6, 6, 5, 5],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [6, 5, 5, 5],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [5, 5, 5, 4],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [5, 5, 4, 4],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [5, 4, 4, 4],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [4, 4, 4, 3],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [4, 4, 3, 3],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [4, 3, 3, 3],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [3, 3, 3, 3],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [3, 3, 3, 2],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [3, 3, 2, 2],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [3, 2, 2, 2],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [2, 2, 2, 2],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [2, 2, 2, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [2, 2, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [2, 1, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [1, 1, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [1, 1, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [1, 1, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [1, 1, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [1, 1, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    },
    {
        input: [1, 1, 1, 1],
        output: { increase: 0, mac: 1, trackpad: 1 }
    }
]);

console.log(network.toFunction().toString());

const result = network.run([10, 20, 30, 40]);
console.log(result);
