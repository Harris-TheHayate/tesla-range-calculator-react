const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
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
							outputPath: 'images'
						}
					}
				]
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
							outputPath: 'fonts'
						}
					}
				]
			},
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
