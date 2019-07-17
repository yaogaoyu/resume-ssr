const os = require('os');
const path = require('path');
const webpack = require('webpack');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const Package = require('../package.json');
const PATH_NODE_MODULES = path.resolve(__dirname, '../node_modules/');
const PATH_SRC = path.resolve(__dirname, '../src/');
const src = {
    index: `${PATH_SRC}/index.jsx`,
    html: `${PATH_SRC}/index.html`,
};
module.exports = {
    entry: {
        // [Package.name]: ['@babel/polyfill', src.index],
        app: ['@babel/polyfill', src.index],
    },
    // target: 'node',
    plugins: [
        new ProgressBarPlugin(),
        // 在开发时不需要每个页面都引用React
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        // 不打包moment的语言包，达到减少打包体积的效果
        // new webpack.ContextReplacementPlugin(
        //     /moment[/\\]locale$/,
        //     /zh-cn/,
        // ),
        new HtmlWebpackPlugin({ // html插件
            template: src.html,
            inject: true,
            minify: {
                minifyCSS: true,
                removeComments: true,
                collapseWhitespace: true,
            },
            chunksSortMode: 'none',
        }),
        Autoprefixer,
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css',
        }),
        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, '../static'),
        //     to: path.resolve(__dirname, '../dist/static'),
        //     ignore: ['html/*', '.DS_Store'],
        // }]),
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    resolve: {
        alias: {
            core: `${PATH_SRC}/core`,
            util: `${PATH_SRC}/util`,
            api: `${PATH_SRC}/api`,
            components: `${PATH_SRC}/components`,
            config: `${PATH_SRC}/config`,
        },
        extensions: ['.jsx', '.js', '.json'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/, // eslint检查
            enforce: 'pre',
            include: [PATH_SRC],
            exclude: [PATH_NODE_MODULES],
            loader: 'eslint-loader',
        },
        {
            test: /\.jsx?$/, // 转化ES6语法
            include: [PATH_SRC],
            exclude: [PATH_NODE_MODULES],
            use: [
                'cache-loader',
                {
                    loader: 'thread-loader',
                    // 有同样配置的 loader 会共享一个 worker 池(worker pool)
                    options: {
                        workers: os.cpus().length, // 产生的 worker 的数量，默认是 cpu 的核心数
                        workerParallelJobs: 50, // 一个 worker 进程中并行执行工作的数量
                        poolTimeout: 2000, // 闲置时定时删除 worker 进程
                        // 池(pool)分配给 worker 的工作数量
                        // 默认为 200
                        // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
                        poolParallelJobs: 50,
                        // 池(pool)的名称
                        // 可以修改名称来创建其余选项都一样的池(pool)
                        name: 'my-pool',
                    },
                },
                'babel-loader',
            ],
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
            test: /\.less$/, // 处理本地less样式文件，开启css module功能
            include: [PATH_SRC],
            exclude: [PATH_NODE_MODULES],
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                },
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                    },
                },
            ],
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 11920,
                },
            }],
        }],
    },
};