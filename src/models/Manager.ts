/* External dependencies */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

/* Internal dependencies */
import setAutoIncId from './plugins/setAutoIncId';
import setTimeStamp from './plugins/setTimeStamp';

export type ManagerModel = mongoose.Document & {
  _id: string,
  id: number,
  email: string,
  name: string,
  password: string,

  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void,
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

managerSchema.plugin(setTimeStamp);
managerSchema.plugin(setAutoIncId, { schemaName: 'ManagerId' });

managerSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

export default mongoose.model('Manager', managerSchema);
