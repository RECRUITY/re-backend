/* External dependencies */
import * as express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'hello' });
});

app.listen(8080, () => {
  console.log('express server start');
});
