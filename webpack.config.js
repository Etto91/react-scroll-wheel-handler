const path = require("path");
const webpack = require("webpack");

const outputPath = process.env.BUILD
    ? path.resolve("./")
    : path.resolve("./test");

const clientConfig = {
    entry: process.env.BUILD
        ? "./src/ReactScrollWheelHandler"
        : "./src/index.js",
    devtool: process.env.BUILD ? false : "eval",
    output: {
        path: outputPath,
        filename: "index.js"
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                include: [path.resolve("./src")]
            }
        ]
    },
    plugins: [
        ...(process.env.BUILD ? [new webpack.optimize.UglifyJsPlugin()] : [])
    ]
};

module.exports = [clientConfig];
