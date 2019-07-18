const os = require('os');
const path = require('path');
const webpack = require('webpack');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const Package = require('../package.json');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const nodeExternals = require('webpack-node-externals');

const PATH_NODE_MODULES = path.resolve(__dirname, '../node_modules/');
const PATH_SRC = path.resolve(__dirname, '../src/');
const src = {
    index: `${PATH_SRC}/app.server.js`,
    html: `${PATH_SRC}/index.html`,
};

// common.entry = null;
// common.plugins.splice(2, 1);
// common.plugins.splice(2, 1);

// entry: {
//     // [Package.name]: ['@babel/polyfill', src.index],
//     app: ['@babel/polyfill', src.index],
// },
// // target: 'node',
// plugins: [
    
//     // 不打包moment的语言包，达到减少打包体积的效果
//     // new webpack.ContextReplacementPlugin(
//     //     /moment[/\\]locale$/,
//     //     /zh-cn/,
//     // ),
//     new HtmlWebpackPlugin({ // html插件
//         template: src.html,
//         inject: true,
//         minify: {
//             minifyCSS: true,
//             removeComments: true,
//             collapseWhitespace: true,
//         },
//         chunksSortMode: 'none',
//     }),
    
//     new MiniCssExtractPlugin({
//         filename: '[name].[contenthash].css',
//         chunkFilename: '[name].[contenthash].css',
//     }),
//     // new CopyWebpackPlugin([{
//     //     from: path.resolve(__dirname, '../static'),
//     //     to: path.resolve(__dirname, '../dist/static'),
//     //     ignore: ['html/*', '.DS_Store'],
//     // }]),
// ],
// output: {
//     filename: '[name].[hash].js',
//     chunkFilename: '[name].[chunkhash].js',
//     path: path.resolve(__dirname, '../dist'),
//     publicPath: '/',
// },

module.exports = {
    entry: {
        // [Package.name]: ['@babel/polyfill', src.index],
        app: ['@babel/polyfill', src.index],
    },
    mode: 'production',
    target: 'node',
    output: {
        filename: '[name].js',
        // chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    node: {
        __filename: true,
        __dirname: true,
        process: true
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        // 在开发时不需要每个页面都引用React
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        // new BundleAnalyzerPlugin(),
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
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
    ],
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
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                    enforce: true,
                },
                antd: {
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    name: 'antd',
                    chunks: 'all',
                    enforce: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'async',
                    enforce: true,
                },
                default: false,
            },
        },
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    // 打包时候自动删除debugger和console的调用代码
                    compress: {
                        // warnings: false,
                        // drop_debugger: true,
                        // drop_console: true,
                    },
                    // 打包时自动删除注释，减小文件体积
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
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