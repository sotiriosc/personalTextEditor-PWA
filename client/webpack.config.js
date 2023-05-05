// Importing required modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    // Setting the mode to development
    mode: 'development',
    // Defining entry points for the application
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // Defining output configuration
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Adding plugins
    plugins: [
      // Generating HTML file from template
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      // Extracting CSS into separate files
      new MiniCssExtractPlugin(),
      // Injecting service worker into the app
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
      // Generating PWA manifest file
      new WebpackPwaManifest({
        name: 'Sotirios Personal Text Editor',
        short_name: 'TXT Editor',
        description: 'Mini Text Editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('images', 'icons'),
          }
        ]
      }),
    ],
    // Adding module rules
    module: {
      rules: [
        // Handling CSS files
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        // Handling image files
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // Transpiling JavaScript files using Babel
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
