const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const distDir = path.resolve(__dirname, '../dist');

module.exports = {
  mode: 'development',
  entry: { bundle: path.resolve(__dirname, '../index.jsx') },
  output: {
    filename: '[name].js',
    path: distDir,
    publicPath: '/',
  },
  context: path.resolve('./'),

  devtool: 'inline-source-map',
  devServer: {
    contentBase: distDir,
    port: 60801,
    https: false,
    compress: true,
    hot: true,
    open: true,
    overlay: true,
    writeToDisk: false,
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader'],
    }, {
      test: /.(scss|css)$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      }, {
        loader: 'css-loader',

        options: {
          sourceMap: true,
        },
      }, {
        loader: 'resolve-url-loader',
      }, {
        loader: 'sass-loader',

        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
      ],
    }, {
      test: /\.(woff|woff2|ttf|otf)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      ],
    }, {
      test: /\.hbs$/,
      use: [
        {
          loader: 'handlebars-loader',
        },
      ],
    }],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve('../node_modules'),
    },
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: 'styles/main.css',
      chunkFilename: 'styles/[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HTMLWebpackPlugin({
      title: 'Thinx',
      template: path.resolve(__dirname, '../src/templates/index.hbs'),
      templateParameters: {
        session: {
          auth: false,
        },
      },
    }),
  ],
};
