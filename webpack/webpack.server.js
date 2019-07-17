const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const ip = require('ip');
// const apiMocker = require('mocker-api');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: '[name].js', // 本地不加hash，为了代理线上环境调试
        chunkFilename: '[name].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        // new BundleAnalyzerPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        port: 8080,
        disableHostCheck: true,
        hot: true,
        inline: true,
        compress: true, // enable gzip compression
        quiet: true,
        before(app) {
            // apiMocker(app, path.resolve('./mock/index.js'), {
                // 配置接口代理
                // proxy: {
                //     '/repos/*': 'https://api.github.com/',
                //     '/:owner/:repo/raw/:ref/*': 'http://127.0.0.1:2018'
                // },
            //     changeHost: true,
            // });
        },
    },
});