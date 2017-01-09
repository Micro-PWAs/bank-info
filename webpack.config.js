let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OfflinePlugin = require('offline-plugin');

module.exports = {
	entry: {bundle: './src/index.js', main: './src/components/App.css'},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/dist/'
	},
	resolve: {
		modules: ['node_modules']
	},
	devServer: {
		port: process.env.PORT || 9000,
		host: '0.0.0.0',
		publicPath: '/dist/',
		contentBase: './public',
		historyApiFallback: true
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallbackLoader: 'style-loader',
				loader:  [{
					loader: 'css-loader',
					options: {
						modules: true,
					}
				}]
			})
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
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new OfflinePlugin({
			relativePaths: false,
			externals: ['/']
		})
	]
};