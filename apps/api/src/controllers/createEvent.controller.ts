import { Request, Response } from 'express';
import prisma from '../prisma';

export class CreateEventController {
  async createEvent(req: Request, res: Response) {
    try {
      const userIdFromToken = req.dataUser;
      const organizerId = await prisma.user.findUnique({
        where: { id: userIdFromToken.id },
        select: { id: true },
      });

      const dateTime = new Date(req.body.date_time);
      const formattedDateTime = dateTime.toISOString();
      const endTime = new Date(req.body.end_time);
      const formattedEndTime = endTime.toISOString();

      const imageUrl = req.file
        ? `http://localhost:8000/image/${req.file.filename}`
        : '';

      const event = await prisma.$transaction(async (prisma) => {
        const createdEvent = await prisma.event.create({
          data: {
            organizer_id: organizerId!.id,
            title: req.body.title,
            organizer: req.body.organizer,
            price: parseInt(req.body.price),
            date_time: formattedDateTime,
            end_time: formattedEndTime,
            location: req.body.location,
            description: req.body.description,
            seats: parseInt(req.body.seats),
            is_free: JSON.parse(req.body.is_free),
            is_online: JSON.parse(req.body.is_online),
            category: req.body.category,
            image: imageUrl,
          },
        });

        return createdEvent;
      });

      return res.status(201).json({ id: event.id });
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  }
}
