const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

const config = {
	mode: !isProd ? 'development' : 'production',
	entry: './src/index.js',
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		modules: ['node_modules'],
	},
	output: {
		path: path.join(__dirname, 'public', 'dist'),
		filename: 'bundle.js',
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
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name].[ext]',
							fallback: 'file-loader',
							outputPath: 'images',
						},
					},
				],
			},
			{
				test: /\.(ttc|woff|woff2|eot|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name].[ext]',
							fallback: 'file-loader',
							outputPath: 'fonts',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			//TODO: filename: !isProdBuild ? 'styles.css' : 'styles-[hash].css'
			filename: '[name].css',
			chunkFilename: '[name].css',
		}),
		new HtmlWebPackPlugin({
			favicon: './public/favicon.ico',
			template: './public/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};

if (isProd) {
	Object.assign(config, {
		optimization: {
			minimizer: [
				new TerserPlugin({
					test: /\.js(\?.*)?$/i,
					parallel: true,
					sourceMap: false,
				}),
			],
		},
	});
	config.optimization.minimizer.push(
		new UglifyJSPlugin({ parallel: true }),
		new OptimizeCSSAssetsPlugin({})
	);
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		})
	);
}

module.exports = config;
