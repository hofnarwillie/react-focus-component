var webpack = require('webpack');
var path = require('path');

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};
var reactDOMExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
};
module.exports = {
    context: __dirname,
    devtool: 'inline-sourcemap',
    entry: './example/index.js',
    output: {
        path: __dirname + '/example/bin',
        publicPath: '/bin/',
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library: 'FocusOverlay'
    },
    externals: {
        'react': reactExternal,
        'react-dom': reactDOMExternal
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
        port: 8080
    }
};