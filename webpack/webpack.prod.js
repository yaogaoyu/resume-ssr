const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         minSize: 30000,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: '-',
    //         name: true,
    //         cacheGroups: {
    //             react: {
    //                 test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
    //                 name: 'react',
    //                 chunks: 'all',
    //                 enforce: true,
    //             },
    //             antd: {
    //                 test: /[\\/]node_modules[\\/]antd[\\/]/,
    //                 name: 'antd',
    //                 chunks: 'all',
    //                 enforce: true,
    //             },
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'async',
    //                 enforce: true,
    //             },
    //             default: false,
    //         },
    //     },
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    // 打包时候自动删除debugger和console的调用代码
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                    // 打包时自动删除注释，减小文件体积
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});