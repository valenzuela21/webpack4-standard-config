const merge = require('webpack-merge');
const common = require('./webpack.common');
const environment = require("./configuration");
module.exports =  merge(common,{
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {loader: "style-loader", options: {sourceMap: true}},
                    {loader: "css-loader", options: {sourceMap: true}},
                    {loader: "sass-loader", options: {sourceMap: true}}
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
                            publicPath: 'images/',
                            esModule:false
                        },
                    },
                ],
            },

        ],

    },
});