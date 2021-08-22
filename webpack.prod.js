const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const environment = require("./configuration");
module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [

            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,
                    {loader: "css-loader",  options: {sourceMap: true}}],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader",  options: {sourceMap: true}},
                    {loader: "sass-loader", options: {sourceMap: true}},
                ],
            },

            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: environment.limits.images,
                            outputPath: 'images/',
                            publicPath: path.resolve(__dirname, './dist/images'),
                            esModule: false
                        },
                    },
                    {
                        loader: 'webp-loader',
                        options:{
                            quality: 13
                        }
                    }
                ],
            },

        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/bundle.css",
        })
    ],
});