const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');
const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distPath = path.resolve(__dirname, 'dist');

const plugins = [new CleanWebpackPlugin()];

function getEntry() {
    const entry = {};

    //读取src目录所有page入口
    glob.sync('./src/pages/*/index.js')
        .forEach(function (filePath) {
            let name = filePath.match(/\/pages\/(.+)\/index.js/);
            name = name[1];
            entry[name] = filePath;

            plugins.push(new HtmlWebpackPlugin({
                filename: './htmls/' + name + '.html',
                template: './src/pages/' + name + '/index.html',
            }))

        });
    return entry;
};

const dev = {
    mode: 'development',

    // 多入口
    entry: getEntry(),
    plugins: plugins,
    devServer: {
        contentBase: distPath,
        port: 8000,
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(){
                                return 'chunks/[name].[sha512:hash:base64:7].[ext]'
                            }
                        }
                    }
                ]
              },
        ],
    },
    output: {
        publicPath: '../',

        // // 入口文件名称 name 为 /* webpackChunkName: 'a'
        chunkFilename: 'chunks/[name].[chunkhash].js',

        // 入口文件名称
        filename: 'pages/[name].[chunkhash].js',

        path: distPath,
    },
};

const pro = merge(dev,{
    mode: 'production',
    output: {
        publicPath: '//e.sinaimg.cn/ssfe/d54ff8fa-06c1-43d6-a735-86c9985f4fd2/'
    }
});
delete pro.devServer;
module.exports = {
    dev,
    pro
}