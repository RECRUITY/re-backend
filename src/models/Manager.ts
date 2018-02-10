/* External dependencies */
import * as mongoose from 'mongoose';

export type ManagerModel = mongoose.Document & {
  _id: string,
  email: string,
  name: string,
  password: string,
};

const managerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Manager', managerSchema);
