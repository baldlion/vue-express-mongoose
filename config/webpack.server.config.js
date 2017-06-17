const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: './server'
  },
  output: {
    path: path.join(__dirname, '..', 'dist', 'server'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, '..', 'client', 'app'),
      path.join(__dirname, '..', 'client', 'admin'),
      path.join(__dirname, '..', 'node_modules')
    ],
    extensions: [ '.js', '.json' ],
    alias: {
      '@': path.resolve(__dirname, 'server')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'stage-2' ]
        }
      }
    ]
  }
}
