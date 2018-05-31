const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry:'./src/main.js',//入口
    module:{
        rules:[
            {test:/\.vue$/, use:'vue-loader'},
            {test:/\.css$/,use:["style-loader","css-loader"]},
            {test: /\.(ttf|woff|svg|eot|jpg|png)$/,use:'url-loader'}
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:"./template.html"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            axios :"axios"
        })
    ],
    devServer:{
        overlay:true //如果有错误，在页面中弹出一个遮罩层，错误的提示显示在上面
    },
    resolve:{
        extensions: [".vue", ".js",".json"]
    },
}