/* External dependnecies */
import { Schema } from 'mongoose';
import { NextFunction } from 'express';

export default (schema: Schema) => {
  schema.add({
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  });

  schema.pre('save', function (next: NextFunction) {
    const cur = +(new Date());
    this.updatedAt = cur;
    if (!this.createdAt) {
      this.createdAt = cur;
    }
    next();
  });
};
