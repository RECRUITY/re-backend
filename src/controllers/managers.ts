/* External dependencies */
import { Request, Response, NextFunction } from 'express';

/* Internal dependencies */
import { default as Manager, ManagerModel } from '../models/Manager';

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

export default {
  signUp,
};
