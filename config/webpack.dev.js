const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  //Users\Administrator\Desktop\code\src\index.html
  entry:['./src/js/index.js','./src/index.html'],
  output: {
    path:resolve(__dirname,'./build'),
    filename: './js/build.js'
  },
  module: {
    rules:[
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath:'./images',
              outputPath:'images',
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
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {template:'./src/index.html'}
    ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './build',
    hot: true, //开启热模替换功能
    port: 4000,
    open: true  //自动打开浏览器
  },
}