import { Request, Response } from 'express';
import prisma from '../prisma';

export class CouponController {
  async createCoupon(req: Request, res: Response) {
    try {
      const createCoupon = await prisma.coupons.create({
        data: {
          event_id: parseInt(req.body.eventId),
          name: req.body.name,
          discount_amount: parseInt(req.body.amount),
          usage_limit: parseInt(req.body.total),
          expiration_date: req.body.endTime,
          is_used: false,
        },
      });

      return res.status(201).json(createCoupon);
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  }
}
