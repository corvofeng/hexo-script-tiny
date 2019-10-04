const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackMajorVersion = require("webpack/package.json").version.split(".")[0];
const genEntry = require('./webpack.config.dev').entry;

module.exports = {
  context: __dirname,
  entry: genEntry,
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  devtool: "source-map",
  output: {
    path: path.join(__dirname, "dist/webpack-" + webpackMajorVersion),
    publicPath: "",
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle_[chunkhash].js",
    // sourceMapFilename: "[file].map"
  },

  /*
  module: {
    rules: [{
        test: /\.css$/,
        include: [
          path.join(__dirname, "src/css"),
          path.join(__dirname, "src"),
          path.join(__dirname),
        ],
        loaders: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        // exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {}
        }]
      },
    ]
  },
  */
  mode: "production",
};