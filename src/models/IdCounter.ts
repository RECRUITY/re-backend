/* External dependencies */
import * as mongoose from 'mongoose';

export type IdCounterModel = mongoose.Document & {
  _id: String,
  seq: Number,
};

const idCounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
  },
  seq: {
    type: Number,
  },
});

export default mongoose.model('IdCounter', idCounterSchema);
