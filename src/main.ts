/* External dependencies */
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';

/* Internal dependencies */
import secret from './secret';
import controllers from './controllers';

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
app.use(cors({
  origin: true,
  credentials: true,
}));

/* Apply Router */
app.use('/maintenance', (() => {
  const router = express.Router();
  const maintenance = controllers.maintenance;

  router.use('/ping', maintenance.ping);

  return router;
})());

app.listen(8080, () => {
  console.log('express server start');
});
