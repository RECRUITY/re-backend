/* External dependencies */
import * as express from 'express';
import * as mongoose from 'mongoose';

/* Internal dependencies */
import secret from './secret';

const app = express();

/* Connect to mongodb */
mongoose.connect(secret.MONGO_DB, { promiseLibrary: global.Promise }, (err): void => {
  if (err) {
    console.log('Occurred the error when connecting mongodb: ', err);
  }
});

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'hello' });
});

app.listen(8080, () => {
  console.log('express server start');
});
