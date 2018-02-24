const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    // vendor: ["add here"],
    app: [
      "react-hot-loader/patch",
      "webpack-hot-middleware/client",
      "./src/scripts/index.js"
    ]
  },
  output: {
    filename: "[name].[hash].js",
    path: __dirname,
    publicPath: "/"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                ctx: {
                  autoprefixer: {
                    browsers: "last 2 versions"
                  }
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/assets/img/favicon.ico"
    })
    // insert chunks here, if you have any
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ["vendor"],
    //   minChunks: Infinity
    // })
  ]
};
