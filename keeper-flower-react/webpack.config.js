/* eslint-disable prefer-regex-literals */
const HTMLWebpackPlugin = require('html-webpack-plugin')
const WebpackPWAManifestPlugin = require('webpack-pwa-manifest')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  output: {
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    liveReload: true
  },
  plugins: [
    new NodePolyfillPlugin(),
    new HTMLWebpackPlugin({
      template: 'src/index.html'
    }),
    new Dotenv({ path: './.env' }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new WebpackPWAManifestPlugin({
      name: 'NFT Flores',
      short_name: 'NFT Flores',
      description: 'NFT Flores',
      background: '#fff',
      theme_color: '#b1a',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      maximumFileSizeToCacheInBytes: 20971520,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://keeper-flower-react.infura-ipfs.io/ipfs/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'images'
          }
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
