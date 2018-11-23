const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry:'./src/js/index.js',
  output: {
    path:resolve(__dirname,'../dist'),
    filename: './js/[hash:10].js'
  },
  module: {
    rules:[
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'postcss-loader',{
            loader: "less-loader", options: {
              plugins: [
                new CleanCSSPlugin({ advanced: true })//压缩css文件
              ]
            }
          }]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath:'../images',
              outputPath:'./images',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/, // 涵盖 .js 文件
        enforce: "pre", // 预先加载好 jshint loader
        exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
        use: [
          {
            loader: "jshint-loader",
            options: {
              camelcase: true,
              emitErrors: false,
              failOnHint: false,
              reporter: function(errors) { }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {    //压缩html代码
        removeComments: true,
        collapseWhitespace: true
      }

    }),
    new ExtractTextPlugin("./css/[hash:10].css"),//提取css文件

    new webpack.optimize.UglifyJsPlugin(),//压缩js文件
    new CleanWebpackPlugin('./dist',{
      root: resolve(__dirname, '../'),
    })
  ]
}