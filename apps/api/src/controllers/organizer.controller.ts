import { Request, Response } from 'express';
import prisma from '../prisma';

export class OrganizerController {
  async organizerEvent(req: Request, res: Response) {
    try {
      let events;
      const userIdFromToken = req.dataUser;
      if (userIdFromToken.id) {
        events = await prisma.event.findMany({
          where: { organizer_id: userIdFromToken.id },
        });
        return res.json(events);
      }
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  }
  async attendee(req: Request, res: Response) {
    try {
      let attendee;
      const userIdFromToken = req.dataUser;

      if (userIdFromToken.id) {
        const attendee = await prisma.user.findMany({
          where: {
            transactions: {
              some: {
                user_id: userIdFromToken.id,
              },
            },
          },
          include: {
            transactions: {
              include: {
                event: true,
              },
            },
          },
        });
        return res.json(attendee);
      }
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  }
}
