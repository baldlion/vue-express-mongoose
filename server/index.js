import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import session from 'express-session';
import clear from 'clear';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import devServer from './dev-server';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

app.locals.production = env === 'production';

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URI);


app.set('views', './server/views');
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }));

if (env === 'production') {
  app.use(express.static('./dist/app'));
}

if (env === 'development') {
  devServer(app);
}

router(app);

app.listen(PORT, () => {
  if (env === 'production') {
    clear();
    console.log('\n' + chalk.bold.bgCyan(' SUCCESS ') + chalk.bold.cyan(` Production server listening on port ${process.env.PORT} `));
  }
});