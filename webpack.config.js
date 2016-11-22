var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: ['node_modules']
	},
	devServer: {
		port: process.env.PORT || 9000,
		host: '0.0.0.0',
		publicPath: '/dist',
		contentBase: './src',
		historyApiFallback: true
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.ico$/,
			loader: 'file-loader?name=[name].[ext]'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=8192&mimetype=application/font-woff&name=./[hash].[ext]'
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader?name=./[hash].[ext]'
		}]
	}
};