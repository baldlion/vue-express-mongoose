const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const env = process.env.NODE_ENV || 'development'

const includePaths = [
  path.resolve(__dirname, '..', 'client')
]

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: env === 'production',
    sourceMap: env === 'development',
    importLoaders: 1
  }
}

const scssLoader = {
  loader: 'sass-loader',
  options: {
    minimize: env === 'production',
    sourceMap: env === 'development'
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    minimize: env === 'production',
    sourceMap: env === 'development'
  }
}

exports.jsLoader = function () {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    include: includePaths
  }
}

exports.vueLoader = function () {
  return {
    test: /\.vue$/,
    loader: 'vue-loader',
    include: includePaths,
    options: {
      loaders: {
        scss: exports.vueScssLoaders()
      }
    }
  }
}

exports.scssLoaders = function () {
  return {
    test: /\.scss$/,
    include: includePaths,
    use: env === 'production' ? ExtractTextPlugin.extract({
      fallback: 'style-loader',
      // resolve-url-loader may be chained before sass-loader if necessary
      use: ['css-loader', 'sass-loader']
    }) : [ 'style-loader', cssLoader, scssLoader, postcssLoader ]
  }
}

exports.vueScssLoaders = function () {
  function getLoaders (list) {
    let loaders = []
    loaders.push(cssLoader)

    list.forEach(loader => {
      let loaderName = loader
      let loaderOptions = {}
      let loaderQuery = {}

      if (typeof loaderName === 'object') {
        loaderName = loader.loader
        loaderOptions = loader.options
        loaderQuery = loader.query
      }

      loaders.push({
        loader: `${loaderName}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: env === 'development'
        }),
        query: loaderQuery
      })
    })

    return loaders
  }

  if (env === 'production') {
    return ExtractTextPlugin.extract({
      use: getLoaders([
        'sass',
        'postcss'
      ]),
      fallback: 'vue-style-loader'
    })
  } else {
    return [ 'vue-style-loader' ].concat(getLoaders([
      'sass',
      'postcss'
    ]))
  }
}

exports.urlLoader = function () {
  return {
    test: /\.(woff|woff2|jpg|gif|png)$/,
    loader: 'url-loader',
    options: {
      limit: 50000,
      name: 'font/[name].[ext]'
    }
  }
}

exports.svgLoader = function () {
  return {
    test: /\.svg$/,
    loader: 'vue-svg-loader'
  }
}

exports.eslintLoader = function () {
  return {
    enforce: 'pre',
    test: /\.vue$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: {
      snazzy: true,
      parser: 'babel-eslint'
    }
  }
}
