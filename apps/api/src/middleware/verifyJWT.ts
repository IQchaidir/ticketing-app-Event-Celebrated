import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { redisClient } from 'helpers/redis';

declare global {
  namespace Express {
    interface Request {
      dataUser: any;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(400).send('Token not found');
    }

    // // Mengambil data token dari redis dan dicocokan dengan token dari header
    // const checkToken = await redisClient.get(`check${req.body.email}`);
    // console.log(token, checkToken);

    // if (token === checkToken) {
    const verifiedToken: any = verify(token, 'Event123');

    req.dataUser = verifiedToken.id;
    next();
  } catch (error) {
    return res.status(400).send('Token error');
  }
};
