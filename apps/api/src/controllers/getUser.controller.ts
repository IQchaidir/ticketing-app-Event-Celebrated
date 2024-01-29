import { Role } from '@prisma/client';
import prisma from '../prisma';
import { Request, Response } from 'express';

export class GetUserController {
  async getUserEmail(req: Request, res: Response) {
    try {
      const userIdFromToken = req.dataUser;
      const getEmail = await prisma.user.findUnique({
        where: { id: userIdFromToken.id },
        select: { email: true },
      });

      res.json(getEmail);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserRole(req: Request, res: Response) {
    try {
      const userIdFromToken = req.dataUser;
      const role = await prisma.user.findUnique({
        where: { id: userIdFromToken.id },
        select: { role: true },
      });

      res.json(role);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserPointReferral(req: Request, res: Response) {
    const totalPointsResult = await prisma.referralPoint.aggregate({
      where: {
        referrer_id: req.dataUser.id,
      },
      _sum: { points: true },
    });

    const totalPoints = totalPointsResult?._sum?.points || 0;

    const referralCode = await prisma.user.findFirst({
      where: { id: req.dataUser.id },
      select: { referral_code: true },
    });

    const result = {
      totalPoint: totalPoints,
      referralCode: referralCode?.referral_code,
    };

    res.status(200).json(result);
  }
  catch(error: any) {
    console.error('Error fetching checkout information:', error.message);
    throw error;
  }
}
