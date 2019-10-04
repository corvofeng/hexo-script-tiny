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
  mode: "production",
};