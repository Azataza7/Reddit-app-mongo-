import mongoose, { HydratedDocument, Model, Schema } from 'mongoose';
import { UserFields } from '../types';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>

const UserModelSchema = new Schema<UserFields, UserMethods>({
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (this: HydratedDocument<UserFields>, value: string): Promise<boolean> {
          if (!this.isModified('username')) return true;

          const user = await User.findOne({username: value});
          return !user;
        },
        message: 'this username has been reserved'
      }
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true
    }
  }
);

UserModelSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserModelSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserModelSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserModelSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model<UserFields, UserModel>('User', UserModelSchema);

export default User;