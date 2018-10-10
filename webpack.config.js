const path = require("path");
const webpack = require("webpack");

const outputPath = process.env.BUILD
    ? path.resolve("./")
    : path.resolve("./test");

const testConfig = {
    entry: "./src/index.js",
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
    }
};

const buildConfig = {
    entry: "./src/ReactScrollWheelHandler",

    output: {
        path: outputPath,
        filename: "index.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                include: [path.resolve("./src")],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        ...(process.env.BUILD
            ? [
                  new webpack.optimize.UglifyJsPlugin({
                      compress: {
                          warnings: false,
                          drop_console: true
                      }
                  })
              ]
            : [])
    ]
};

module.exports = process.env.BUILD ? buildConfig : testConfig;
