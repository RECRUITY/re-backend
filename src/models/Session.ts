/* External dependencies */
import * as mongoose from 'mongoose';

/* Internal dependencies */
import setAutoIncId from './plugins/setAutoIncId';
import setTimeStamp from './plugins/setTimeStamp';

export enum SessionRole {
  Master = 'master',
  Admin = 'admin',
}

export type SessionModel = mongoose.Document & {
  _id: string,
  id: number,
  userId: string,
  groupId: string,
  role: SessionRole,
};

const sessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  groupId: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: SessionRole.Admin,
  },
});

sessionSchema.plugin(setTimeStamp);
sessionSchema.plugin(setAutoIncId, { schemaName: 'SessionId' });

export default mongoose.model('Session', sessionSchema);
