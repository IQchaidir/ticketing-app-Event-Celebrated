import { Request, Response } from 'express';
import prisma from '../prisma';

export class ReviewController {
  async createReview(req: Request, res: Response) {
    try {
      const userIdFromToken = req.dataUser;
      const userId = await prisma.user.findUnique({
        where: { id: userIdFromToken.id },
        select: { id: true },
      });

      const createReview = await prisma.review.create({
        data: {
          user_id: userId!.id,
          event_id: parseInt(req.body.eventId),
          rating: parseInt(req.body.rating),
          feedback: req.body.feedback,
        },
      });

      return res.status(201).json(createReview);
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  }
}
