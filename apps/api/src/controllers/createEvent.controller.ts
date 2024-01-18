import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CreateEventController {
  async createEvent(req: Request, res: Response) {
    try {
      const {
        organizer_id,
        title,
        price,
        date_time,
        end_time,
        location,
        description,
        seats,
        is_free,
        is_online,
        category,
      } = req.body;

      const event = await prisma.event.create({
        data: {
          organizer_id,
          title,
          price,
          date_time,
          end_time,
          location,
          description,
          seats,
          is_free,
          is_online,
          category,
        },
      });

      return res.json(event);
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  }
}
