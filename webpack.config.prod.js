const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin')
//从bundle.js中抽离css
const ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  entry: {
    axios: ["axios"],
    jquery: ["jquery"],
    "v-distpicker": ["v-distpicker"],
    "vue-lazyload": ["vue-lazyload"],
    moment: ["moment"],
    quanjiatong: ["vue", "vue-router", "vuex"],
    bundle: "./src/main.js" //千万不要忘记了哦
  },
  output: {
    //出口
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
              loader:'css-loader',
              options:{
                  minimize: true, //在抽取css的时候同时进行压缩
                  publicPath:'dist/css'
              }
          }
        })
      },
      {
        test: /\.(ttf|woff|svg|eot|jpg|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 3000, //阀值,如果大于10KB就从bundle.js中抽出来，反之不抽
              //这个阀值，不是写死的，是根据你们公司的实际来定的
              name:'statics/img/[name]-[hash:8].[ext]'
            }
          }
        ]
      },
      //适合 vue-loader 14.x
      //{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }

      //如果是的vue-loader 是15.x 
      //参考https://vue-loader.vuejs.org/zh/migrating.html#%E4%BB%8E%E4%BE%9D%E8%B5%96%E4%B8%AD%E5%AF%BC%E5%85%A5%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      }
    ]
  },
  resolve: {
    extensions: [".vue", ".js", ".json"]
  },
  // devtool: '#cheap-module-eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html", //模版，指定参考文件
      minify:{
        removeComments:true, //删除注释
        minifyCSS:true,//压缩css
        minifyJS:true,//压缩js
        collapseWhitespace:true//压缩空格
      }
    }),
    //全局的导入jquery
    new webpack.ProvidePlugin({
      $: "jquery", //key代表的将来使用jquery时候的变量名称，值是包的名称
      jQuery: "jquery",
      axios :"axios"
    }),
    new webpack.DefinePlugin({
      //设置当前环境为生产环境
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      //压缩bundle.js
      compress: {
        warnings: false,
        drop_debugger: true, //去除调试
        drop_console: true  //去除console
      },
      output: {
        comments: false //去除copyright
      }
    }),
    new CleanWebpackPlugin("dist"),
    //抽离第三方包的，这里不要写bundle.js
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        "quanjiatong",
        "vue-lazyload",
        "v-distpicker",
        "moment",
        "jquery",
        "axios"
      ],
      // name: ['jquery', 'vue-moment','quanjiatong','axios','v-distpicker','vue-lazyload'],
      // filename: "vendor.js"
      // (给 chunk 一个不同的名字)

      minChunks: Infinity
      // (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
    }),


    new ExtractTextPlugin("css/styles-[hash:5].css"),

    //只保留moment中的简体中文
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)

  ]
};
