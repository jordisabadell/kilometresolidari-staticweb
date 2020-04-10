const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
var ContentReplacePlugin = require('content-replace-webpack-plugin');

require('dotenv').config();

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/js/main.js'
  },
  entry: {
    main: [
      './source/assets/js/index.js',
      './source/assets/js/utils.js',
      './source/assets/js/charts.js',
      './source/assets/js/custom.js',      
      //'./source/assets/js/fcm-pushnotification.js',
      //'./source/assets/js/fdb-contactform.js',
      './source/assets/js/ganalytics.js',
      './source/assets/js/gcs-search.js',
      './source/assets/js/layout.js',
      './source/assets/js/maps.js',
      './source/assets/js/navigation.js',
      './source/assets/js/socialnetwork.js',
      './source/assets/js/timeline.js',
      './source/assets/js/wordpress.js'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  
      filename: 'index.html',
      template: 'source/index.html',
      templateParameters: {},
      hash: true
    }),
    new MiniCSSExtractPlugin({
      filename: "./assets/css/style.css",
    }),
    new WebpackPwaManifest({
      "name": "Kilòmetre Solidari",
      "short_name": "KS",
      "theme_color": "#18a79d",
      "background_color": "#18a79d",
      "display": "standalone",
      "orientation": "portrait",
      "Scope": "/",
      "start_url": "/index.html",
      "splash_pages": null,
      "icons": [
        {
          "src": "source/assets/images/icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "source/assets/images/icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "source/assets/images/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        },
        {
          "src": "source/assets/images/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "source/assets/images/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        },
        {
          "src": "source/assets/images/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "source/assets/images/icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
        },
        {
          "src": "source/assets/images/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    }),
    new WorkboxPlugin.GenerateSW(),
    new Dotenv(),
    new CopyPlugin([
      { from: 'source/avislegal.html', to: '' },
      { from: 'source/politicaprivacitat.html', to: '' },
      { from: 'source/assets/images', to: 'assets/images' },
      { from: 'source/firebase-messaging-sw.js', to: '', 
          transform: function (content, path) {
            return content.toString().replace('___APIKEYFIREBASE___', process.env.APIKEYFIREBASE);
          }},
      { from: 'source/data', to: 'data' }
    ])   
  ],
  module: {
    rules: [
      { 
        test: /\.scss$/, 
        loader: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
}