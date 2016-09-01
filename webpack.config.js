'use strict'
const path = require('path');
const webpack = require('webpack')

let plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			UV_API_URL: JSON.stringify(
				process.env.UV_API_URL || 'https://api.univent.com.au/api/v0.2/'
			),
		}
	})
]

module.exports = {
	devtool: 'eval-source-map',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'App.js',
		publicPath: '/dist/',
	},
	plugins: plugins,
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			exclude: /(node_modules|bower_components)/,
			query: {
				presets: ['es2015', 'react', 'stage-0'],
				plugins: ['transform-decorators-legacy']
			}
		}, {
			test: /.css$/,
			loaders: ['style', 'css']
		}]
	},
	devServer: {
		port: 3000
	}
};
