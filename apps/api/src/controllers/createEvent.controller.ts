import { Request, Response } from 'express';
import prisma from '../prisma';

export class CreateEventController {
  async createEvent(req: Request, res: Response) {
    try {
      const userIdFromToken = req.dataUser;
      const organizer = await prisma.user.findUnique({
        where: { id: userIdFromToken },
        select: { id: true },
      });
      const {
        title,
        price,
        date_time,
        end_time,
        location,
        description,
        is_free,
        is_online,
        category,
        seats,
      } = req.body;

      {
        /*mengolah date time dan end time*/
      }
      const endTimeFromFrontend = end_time;
      const dateTimeFromFrontend = date_time;
      const endTimeDate = new Date(endTimeFromFrontend);
      const dateTimeDate = new Date(dateTimeFromFrontend);
      endTimeDate.setSeconds(0);
      dateTimeDate.setSeconds(0);
      const formattedEndTime = endTimeDate.toISOString();
      const formattedDateTime = dateTimeDate.toISOString();

      {
        /*mengolah location*/
      }
      const locationFromFrontend = location;
      const formattedLocation = `${locationFromFrontend.input}${locationFromFrontend.select}`;

      const event = await prisma.event.create({
        data: {
          organizer_id: organizer!.id,
          title,
          price,
          date_time: formattedDateTime,
          end_time: formattedEndTime,
          location: formattedLocation,
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
