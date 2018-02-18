/* External dependencies */
import * as mongoose from 'mongoose';

/* Internal dependencies */
import setAutoIncId from './plugins/setAutoIncId';
import setTimeStamp from './plugins/setTimeStamp';

export type SessionModel = mongoose.Document & {
  _id: string,
  id: number,
  userId: string,
  groupId: string,
};

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

sessionSchema.plugin(setTimeStamp);
sessionSchema.plugin(setAutoIncId, { schemaName: 'SessionId' });

export default mongoose.model('Session', sessionSchema);
