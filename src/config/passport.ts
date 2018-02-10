/* External dependencies */
import * as passport from 'passport';
import * as passportLocal from 'passport-local';

/* Internal dependencies */
import { default as Manager, ManagerModel } from '../models/Manager';


passport.serializeUser<any, any>((manager, done) => {
  done(undefined, manager.id);
});

passport.deserializeUser((id, done) => {
  Manager.findOne({ id }, (err, manager) => {
    done(err, manager);
  });
});

/**
 * Sign in using Email ans Password.
 */
passport.use(new passportLocal.Strategy({ usernameField: 'email' },  (email, password, done) => {
  Manager.findOne({ email }, (err, manager: ManagerModel) => {
    if (err) {
      return done(err);
    }

    if (!manager) {
      return done(undefined, false, {
        message: '이메일을 찾을 수 없습니다.',
      });
    }

    manager.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) {
        return done(err);
      }

      if (isMatch) {
        return done(undefined, manager);
      }

      return done(undefined, false, {
        message: '패스워드가 일치하지 않습니다.',
      });
    });
  });
}));

