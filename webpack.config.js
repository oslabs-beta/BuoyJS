const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/*
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
*/

module.exports = { 
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js', 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/public/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [
      // Babel: JSX translator
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
          }
        }
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}