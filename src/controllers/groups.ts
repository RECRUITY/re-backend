/* External dependencies */
import { Request, Response, NextFunction } from 'express';
import { default as Group, GroupModel } from '../models/Group';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const group = await (new Group({ name, description })).save();
    res.status(200).json({ group });
  } catch (err) {
    return next(err);
  }
};

export default {
  create,
};
