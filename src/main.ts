/* External dependencies */
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as connectMongo from 'connect-mongo';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as passport from 'passport';
import * as session from 'express-session';

/* Internal dependencies */
import secret from './secret';
import controllers from './controllers';
import middlewares from './middlewares';

/* Init Passport */
require('./config/passport');

const app = express();

/* Connect to mongodb */
mongoose.connect(secret.MONGO_DB, { promiseLibrary: global.Promise }, (err): void => {
  if (err) {
    console.log('Occurred the error when connecting mongodb: ', err);
  }
});

/* Apply Middleware */
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({
  store: new (connectMongo(session))({
    mongooseConnection: mongoose.connection,
    collection: 'signin-sessions',
  }),
  resave: true,
  saveUninitialized: true,
  secret: secret.SESSION,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: true,
  credentials: true,
}));

/* Apply Router */
app.use('/maintenance', (() => {
  const router = express.Router();
  const maintenance = controllers.maintenance;

  router.get('/ping', maintenance.ping);

  return router;
})());

app.use('/managers', (() => {
  const router = express.Router();
  const managers = controllers.managers;

  router.get('/me', middlewares.passport.isAuthenticated, managers.getMe);
  router.post('/signup', managers.signUp);
  router.post('/signin', managers.signIn);
  router.delete('/signout', managers.signOut);

  return router;
})());

app.use('/managers', (() => {
  const router = express.Router();
  const groups = controllers.groups;

  router.post('/groups', middlewares.passport.isAuthenticated, groups.create);

  return router;
})());

app.listen(8080, () => {
  console.log('express server start');
});
