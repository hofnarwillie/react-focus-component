var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    devtool: 'inline-sourcemap',
    entry: './example/index.js',
    output: {
        path: __dirname + '/example/bin',
        publicPath: '/bin/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'example'),
        port: 8080,
        disableHostCheck: true
    }
};