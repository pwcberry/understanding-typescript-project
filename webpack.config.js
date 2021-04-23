const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: [require.resolve('webpack-dev-server/client') + '?/', require.resolve('webpack/hot/dev-server'), path.resolve(__dirname, './src/main.ts')],
    },
    devtool: 'eval-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        pathinfo: true,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    stats: {
        all: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        timings: true,
        colors: true,
        builtAt: true,
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/',
        host: '0.0.0.0',
        port: 3000,
        open: true,
        clientLogLevel: 'none',
        watchContentBase: true,
    },
}