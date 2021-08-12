const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const outputPath = process.env.BUILD
  ? path.resolve("./dist")
  : path.resolve("./test");

const testConfig = {
  entry: "./demo/index.js",
  output: {
    path: outputPath,
    filename: "index.js",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        include: [path.resolve("./demo")],
      },
    ],
  },
};

const buildConfig = {
  entry: "./src/ReactScrollWheelHandler",

  output: {
    path: outputPath,
    filename: "ReactScrollWheelHandler.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        include: [path.resolve("./src")],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: "react",
  },
  mode: process.env.BUILD ? "production" : "development",

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/index.d.ts", to: "." }],
    }),
    //   ...(process.env.BUILD
    //     ? [
    //         new webpack.optimize.UglifyJsPlugin({
    //           compress: {
    //             warnings: false,
    //             drop_console: true,
    //           },
    //         }),
    //       ]
    //     : []),
  ],
};

module.exports = process.env.BUILD ? buildConfig : testConfig;
