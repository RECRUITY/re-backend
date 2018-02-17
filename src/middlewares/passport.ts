/* External dependencies */
import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    message: '로그인이 필요합니다.',
  });
};

export default {
  isAuthenticated,
};

