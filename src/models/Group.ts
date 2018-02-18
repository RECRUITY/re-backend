/* External dependencies */
import * as mongoose from 'mongoose';

/* Internal dependencies */
import setAutoIncId from './plugins/setAutoIncId';
import setTimeStamp from './plugins/setTimeStamp';

export type GroupModel = mongoose.Document & {
  _id: string,
  id: number,
  name: string,
  description: string,
};

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

groupSchema.plugin(setTimeStamp);
groupSchema.plugin(setAutoIncId, { schemaName: 'ManagerId' });

export default mongoose.model('Group', groupSchema);
