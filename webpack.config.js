'use strict'
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

let plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			UV_API_URL: JSON.stringify(
				process.env.UV_API_URL || 'https://api.univent.com.au/api/v0.2/'
			),
		}
	}),

	new CopyWebpackPlugin([
		{from: './src/static', to: 'static'}
	]),
]

module.exports = {
	devtool: isProd ? 'source-map' : 'eval-source-map',
	entry: [
		'webpack/hot/dev-server',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'App.js',
		publicPath: '/dist/',
	},
	plugins: plugins,
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['react-hot', 'babel-loader'],
			include: path.join(__dirname, 'src'),
		}, {
			test: /.css$/,
			loaders: ['style', 'css', 'postcss']
		}, {
			test: /\.(png|woff|woff2|eot|ttf|svg|)$/,
			loader: 'url-loader?limit=10000'
		}, {
			// for font-awesome
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff"
		}, {
			// for font-awesome
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file-loader"
		}]
	},
	postcss: function() {
		return isProd ? [autoprefixer] : [];
	},
	devServer: {
		port: 3000
	}
};

if (isProd) {
	module.exports.entry = [
		'babel-polyfill',
		module.exports.entry
	];
}
