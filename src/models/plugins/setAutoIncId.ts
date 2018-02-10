/* External dependnecies */
import { Schema, Query } from 'mongoose';
import { NextFunction } from 'express';

/* Internal dependnecies */
import { IdCounterModel, default as IdCounter } from '../IdCounter';

export default (schema: Schema, options: { schemaName: String }) => {
  schema.add({
    id: {
      type: Number,
      unique: true,
    },
  });

  schema.pre('save', function (next: NextFunction) {
    if (this.id) {
      return next();
    }

    const query = IdCounter.findOneAndUpdate(
      {
        _id: options.schemaName ,
      },
      {
        $inc: { seq: 1 },
      },
      {
        new: true,
        upsert: true,
      },
      (err: Error, counter: IdCounterModel) => {
        if (err) {
          return next(err);
        }

        this.id = counter.seq;
        next();
      },
    );
  });
};
