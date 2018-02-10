/* External dependencies */
import { Request, Response, NextFunction } from 'express';

export const ping = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'pong' });
};

export default {
  ping,
};
