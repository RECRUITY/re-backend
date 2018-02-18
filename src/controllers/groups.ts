/* External dependencies */
import { Request, Response, NextFunction } from 'express';
import { default as Group } from '../models/Group';
import { default as Session, SessionRole } from '../models/Session';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existedSession = await Session.findOne({ userId: req.user.id });

    if (existedSession) {
      return res.status(422).json({ message: '이미 다른 그룹에 참여하고 있습니다.' });
    }

    const { name, description } = req.body;
    const group = await (new Group({ name, description })).save();
    const session = await (new Session({
      userId: req.user.id,
      groupId: group.id,
      role: SessionRole.Master,
    })).save();
    res.status(200).json({ group, session });
  } catch (err) {
    return next(err);
  }
};

export default {
  create,
};
