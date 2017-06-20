require('dotenv').config()

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')

const utils = require('./utils')
const env = process.env.NODE_ENV || 'development'

const loaders = [
  utils.jsLoader(),
  utils.vueLoader(),
  utils.scssLoaders(),
  utils.urlLoader(),
  utils.svgLoader()
]

const vendor = [
  'vue',
  'vuex',
  'vue-router',
  'vuex-router-sync'
]

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"production"'
  }
})

const optimizeCssAssetsPlugin = new OptimizeCssAssetsPlugin({
  cssProcessorOptions: {
    safe: true
  }
})

const extractCssPlugin = new ExtractTextPlugin({
  filename: 'css/[name].css'
})

const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()

const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin()

const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin()

const commonChunksPluginApp = new webpack.optimize.CommonsChunkPlugin({
  name: 'app-manifest',
  chunks: ['app-vendor', 'app-manifest'],
  minChunks: function (module) {
    return module.context && module.context.indexOf('node_modules') !== -1
  }
})

const commonChunksPluginAdmin = new webpack.optimize.CommonsChunkPlugin({
  name: 'admin-manifest',
  chunks: ['admin-vendor', 'admin-manifest'],
  minChunks: function (module) {
    return module.context && module.context.indexOf('node_modules') !== -1
  }
})

const commonChunksPluginAuth = new webpack.optimize.CommonsChunkPlugin({
  name: 'auth-manifest',
  chunks: ['auth-vendor', 'auth-manifest'],
  minChunks: function (module) {
    return module.context && module.context.indexOf('node_modules') !== -1
  }
})

const webpackConfig = {
  target: 'web',
  devtool: env === 'production' ? false : 'source-map',
  entry: {
    app: env === 'production' ? [
      './client/app'
    ] : [
      './client/app',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      'eventsource-polyfill'
    ],
    'app-vendor': vendor,
    admin: env === 'production' ? [
      './client/admin'
    ] : [
      './client/admin',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      'eventsource-polyfill'
    ],
    'admin-vendor': vendor,
    auth: env === 'production' ? [
      './client/admin/auth'
    ] : [
      './client/admin/auth',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      'eventsource-polyfill'
    ],
    'auth-vendor': vendor
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
      'assets': path.resolve('client/assets')
    }
  },
  module: {
    loaders: process.env.LINT ? [
      utils.eslintLoader()
    ].concat(loaders) : loaders
  },
  plugins: env === 'production' ? [
    definePlugin,
    optimizeCssAssetsPlugin,
    extractCssPlugin,
    commonChunksPluginApp,
    commonChunksPluginAdmin,
    commonChunksPluginAuth
  ] : [
    hotModuleReplacementPlugin,
    noEmitOnErrorsPlugin,
    friendlyErrorsWebpackPlugin,
    commonChunksPluginApp,
    commonChunksPluginAdmin,
    commonChunksPluginAuth
  ]
}

// add hot-reload related code to entry chunks
if (env === 'development') {
  Object.keys(webpackConfig.entry).forEach(function (name) {
    webpackConfig.entry[name] = ['./config/dev-client'].concat(webpackConfig.entry[name])
  })
}

module.exports = webpackConfig
