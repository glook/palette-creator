/* eslint-disable */
const merge = require('webpack-merge');
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
// Configs
const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
    return merge([
        {
            output: {
                library: 'paletteGenerator',
                libraryTarget: 'umd',
                filename: 'paletteGenerator.js',
                auxiliaryComment: 'Test Comment'
            },
            mode: 'production',
            // Un-comment this part if you want to use splitChunks. That's all.
            optimization: {
                // runtimeChunk: 'single',
                // splitChunks: {
                //   cacheGroups: {
                //     vendor: {
                //       test: /[\\/]node_modules[\\/]/,
                //       name: 'vendors',
                //       chunks: 'all'
                //     }
                //   }
                // },
                minimizer: [new UglifyJsPlugin()],
            },
            plugins: [
                new MiniCssExtractPlugin(),
                new OptimizeCssAssetsPlugin(),
            ],
        },
    ]);
};

module.exports = env => {
    return merge(baseConfig(env), prodConfiguration(env));
};
