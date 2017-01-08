const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const IS_PROD = process.argv.indexOf('-p') > -1;

module.exports = {
    devtool: IS_PROD ? 'source-map' : 'eval',
    entry: path.resolve(__dirname, 'app/js/main.ts'),
    output: {
        filename: 'bundle.js',
        path: IS_PROD ? './demo' : ''
    },
    module: {
        preLoaders: [{
            test: /\.ts$/, loader: 'tslint?emitErrors=false&failOnHint=false', exclude: /node_modules/
        }],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$|\.css$/,
                loader: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        modules: [path.join(__dirname, "node_modules")]
    },
    devServer: {
        port: 8002,
        inline: true,
        hot: true,
        historyApiFallback: true,
        contentBase: 'app'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
        }),
        new ExtractTextPlugin('stylesheets/[name].css')
    ]
};
