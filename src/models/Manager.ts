/* External dependencies */
import * as mongoose from 'mongoose';

/* Internal dependencies */
import setAutoIncId from './plugins/setAutoIncId';

export type ManagerModel = mongoose.Document & {
  _id: string,
  id: number,
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

managerSchema.plugin(setAutoIncId, { schemaName: 'ManagerId' });

export default mongoose.model('Manager', managerSchema);
