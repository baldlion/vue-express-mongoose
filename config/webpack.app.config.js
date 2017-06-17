require('dotenv').config()

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')

const utils = require('./utils')
const env = process.env.NODE_ENV || 'development'

const extractCss = new ExtractTextPlugin({
  filename: 'css/[name].css'
})

const loaders = [
  utils.jsLoader(),
  utils.vueLoader(),
  utils.scssLoaders(),
  utils.urlLoader(),
  utils.svgLoader()
]

const webpackAppConfig = {
  target: 'web',
  devtool: env === 'production' ? false : 'source-map',
  entry: {
    app: env === 'production' ? [
      './client/app'
    ] : [
      './client/app',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      'eventsource-polyfill'
    ],
    admin: env === 'production' ? [
      './client/admin'
    ] : [
      './client/admin',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      'eventsource-polyfill'
    ],
    auth: env === 'production' ? [
      './client/admin/auth'
    ] : [
      './client/admin/auth',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      'eventsource-polyfill'
    ]
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    path: path.join(__dirname, '..', 'dist', 'app'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '..', 'client', 'app'),
      '@@': path.resolve(__dirname, '..', 'client', 'admin'),
      'shared': path.resolve(__dirname, '..', 'client', 'shared')
    }
  },
  plugins: env === 'production' ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   chunks: ['app'],
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'admin-vendor',
    //   chunks: ['admin'],
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: false
    // }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    extractCss
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  module: {
    loaders: process.env.LINT ? [
      utils.eslintLoader()
    ].concat(loaders) : loaders
  }
}

// add hot-reload related code to entry chunks
if (env === 'development') {
  Object.keys(webpackAppConfig.entry).forEach(function (name) {
    webpackAppConfig.entry[name] = ['./config/dev-client'].concat(webpackAppConfig.entry[name])
  })
}

module.exports = webpackAppConfig
