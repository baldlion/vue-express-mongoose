import webpack from 'webpack'
import chalk from 'chalk'
import clear from 'clear'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackAppConfig from '../config/webpack.app.config'

export default function (app) {
  const compiler = webpack(webpackAppConfig)
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackAppConfig.output.publicPath,
    noInfo: true
  })
  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr'
  })

  clear()
  console.log(chalk.bgGreen.black(' COMPILING ') + chalk.green(' Starting development server... '))

  devMiddleware.waitUntilValid(() => {
    console.log(chalk.bold.bgCyan(' SUCCESS ') +
      chalk.bold.cyan(` Development server listening on port ${process.env.PORT} `))
  })

  app.use(devMiddleware)
  app.use(hotMiddleware)
}
