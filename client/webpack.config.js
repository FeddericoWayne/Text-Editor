// imports required packges for webpack configuration
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'production',
    target: 'node',
    entry: {
      main: [
        './src/js/index.js',
      ],
      install: './src/js/install.js'
    }, 
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin setting
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E',
      }),
      // injects service worker 
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      //sets up the PWA's manifest
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        fingerprints: false,
        inject: true,
        orientation: 'portrait',
        display: 'standalone',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve(__dirname,'src/images/logo.png'),
            sizes: [96,128,192,512],
            purpose: 'any',
            destination:'assets/icons',
          }
        ],
      }),
    ],

    module: {
      rules: [
        // css and style loaders
        {
          test: /\.css$/i,
          use: ['style-loader','css-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'assets/resource'
        },
        // babel loader for backwards compatibility
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
