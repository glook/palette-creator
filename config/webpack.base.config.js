const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Set APP_DIR
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = (env) => {
    const {PLATFORM, VERSION} = env;
    return merge([
        {
            // Use entry pont as APP_DIR. You can use static entry point without using pollyfill
            entry: {
                paletteGenerator: [APP_DIR],
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                    // Sass
                    {
                        test: /\.module\.scss$/,
                        use: [
                            // Minify on production env
                            PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    sourceMap: PLATFORM !== 'production',
                                    localIdentName: '[local]__[hash:base64:5]',
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: PLATFORM !== 'production',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.scss$/,
                        exclude: /\.module.scss$/,
                        use: [
                            // Minify on production env
                            PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: PLATFORM !== 'production',
                                },
                            },
                        ],
                    },

                    // Css
                    {
                        test: /\.css$/,
                        use: [
                            // Minify on production env
                            PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                            'css-loader',
                        ],
                    },
                    // Eslint
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: ['babel-loader', 'eslint-loader'],
                    },
                    {
                        test: /\.(woff2?|ttf|otf|eot|svg|png|jpg|gif)$/,
                        // exclude: /node_modules/,
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    filename: './index.html',
                }),
                new webpack.DefinePlugin({
                    'process.env.VERSION': JSON.stringify(env.VERSION),
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
                }),
            ],
        },
    ]);
};
