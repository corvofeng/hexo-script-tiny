const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackMajorVersion = require("webpack/package.json").version.split(".")[0];

module.exports = {
  context: __dirname,
  // The code mirror need load style first.
  entry: {
    style: "./src/js/style/style.js",
    index: "./src/js/index.js",
    coder: "./src/js/coder.js",
    flow: "./src/js/flow.js",
    mmap: "./src/js/mmap.js",
  },
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
        exclude: /node_modules/,
      },
      // {
      //   test: /\.jsx?$/,
      //   loader: "babel-loader",
      //   exclude: /node_modules/,
      //   options: {
      //     presets: ['@babel/preset-env']
      //   }
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {}
        }]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            interpolate: true
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "src/js"),
      path.resolve(__dirname, "src/css"),
    ],
    "host": "0.0.0.0",
    "disableHostCheck": true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["style", "index", "coder", "mmap", "flow"]
    }),
    new HtmlWebpackPlugin({
      filename: "test.html",
      template: "./src/test.html",
      chunks: ["index", "style"]
    }),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ],
  mode: "development",
};