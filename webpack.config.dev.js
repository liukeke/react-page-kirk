var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
var node_modules = path.resolve(__dirname, 'node_modules');
var config = {
    entry: {
        index: './entry/index.js',
        vendors:['react','react-dom']
    },
    output: {
        path: path.join(__dirname, 'docs/'),
        filename: 'js/[name].js',
        chunkFilename: "js/[id].js",
        publicPath: ''
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'js/vendors.js' })
    ],
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader?-babelrc,+cacheDirectory,presets[]=es2015,presets[]=react',
                exclude: /node_modules/,
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.coffee']
    }
};
module.exports = config;