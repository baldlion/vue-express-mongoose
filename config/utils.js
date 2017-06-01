const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

const includePaths = [
  path.resolve(__dirname, '..', 'client', 'app'),
  path.resolve(__dirname, '..', 'client', 'auth'),
  path.resolve(__dirname, '..', 'client', 'admin')
];

exports.jsLoader = function () {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    include: includePaths,
    query: {
      presets: [ 'es2015', 'stage-2' ]
    }
  };
};

exports.vueLoader = function () {
  return {
    test: /\.vue$/,
    loader: 'vue-loader',
    include: includePaths,
    options: {
      loaders: {
        scss: exports.scssLoaders()
      }
    }
  };
};

exports.scssLoaders = function () {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: env === 'production',
      sourceMap: env === 'development',
      importLoaders: 1
    }
  };

  function getLoaders(list) {
    let loaders = [];
    loaders.push(cssLoader);

    list.forEach(loader => {
      let loaderName = loader;
      let loaderOptions = {};
      let loaderQuery = {};

      if (typeof loaderName === 'object') {
        loaderName = loader.loader;
        loaderOptions = loader.options;
        loaderQuery = loader.query;
      }

      loaders.push({
        loader: `${loaderName}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: env === 'development'
        }),
        query: loaderQuery
      });
    });

    return loaders;
  }

  if (env === 'production') {
    return ExtractTextPlugin.extract({
      use: getLoaders([
        'sass',
        'postcss'
      ]),
      fallback: 'vue-style-loader'
    });
  } else {
    return [ 'vue-style-loader' ].concat(getLoaders([
      'sass',
      'postcss'
    ]));
  }
};

exports.fontLoader = function () {
  return {
    test: /\.(woff|woff2)$/,
    loader: 'url-loader',
    options: {
      limit: 50000,
      name: 'font/[name].[ext]'
    }
  };
};