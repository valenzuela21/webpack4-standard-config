const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const environment = require('./configuration');
const mode = process.env.NODE_ENV === 'production';
module.exports = {
    entry: {
        app: path.resolve(__dirname, '/src/js/app.js'),
        app2: path.resolve(__dirname, '/src/js/app2.js')
    },
    output: {
        path: environment.paths.output,
        filename: "js/[name].bundle.js"
    },
    devServer: {
        ...environment.server,
        contentBase: environment.paths.output,
    },
    module: {
        rules: [
            {
                test: /\.(htm|html)$/,
                use: [
                    {
                        loader: 'html-loader', // Exports HTML as string
                        options: {
                            minimize: false,// Minimize HTML

                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: mode ? path.resolve(__dirname, './dist/fonts') : 'fonts/',
                            limit: environment.limits.fonts,
                            esModule: false
                        },
                    },
                ],
            },
            {
                test: /\.(svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: mode ? path.resolve(__dirname, './dist/images') : 'images/',
                        limit: environment.limits.fonts,
                        esModule: false
                    },
                },
            },
        ],

    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            cache: true,
        })],
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: mode? 'Production' :  'Development',
            template: mode? path.resolve(path.resolve(__dirname, './src/'), 'index.html') :  path.resolve(__dirname, '/src/index.html'),
            favicon: mode?  path.resolve(path.resolve(__dirname, './src/'), 'images', 'favicon.ico') : path.resolve(__dirname, './src/images/favicon.ico'),
        }, mode? {
                minify: {
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true
                }
            } : undefined
            ),
        new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, './')}),

    ],
}
