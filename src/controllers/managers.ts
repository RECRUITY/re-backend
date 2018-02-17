/* External dependencies */
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';

/* Internal dependencies */
import { default as Manager, ManagerModel } from '../models/Manager';

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    manager: req.user,
  });
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password, confirmPassword } = req.body;

  Manager.findOne({ email }, (err, existingManager: ManagerModel) => {
    if (err) {
      return next(err);
    }

    if (existingManager) {
      return res.status(422).json({ message: '이미 존재하는 매니저입니다.' });
    }

    const manager = new Manager({
      email,
      name,
      password,
    });
    manager.save((err) => {
      if (err) {
        return next(err);
      }

      req.logIn(manager, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ manager });
      });
    });
  });
};

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, manager: ManagerModel, info: IVerifyOptions) => {
    if (err) {
      return next(err);
    }

    if (!manager) {
      return res.status(422).json(info.message);
    }

    req.logIn(manager, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ manager });
    });

  })(req, res, next);
};

export default {
  getMe,
  signUp,
  signIn,
};
