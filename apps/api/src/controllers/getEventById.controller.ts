import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetEventByIdController {
  async getEventById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      let event;

      // Cek apakah parameter id ada
      if (id) {
        // Jika id ada, gunakan pencarian berdasarkan id
        event = await prisma.event.findUnique({
          where: { id: parseInt(id, 10) },
        });
      } else {
        // Jika id tidak ada, tangani kasus ini sesuai kebutuhan proyek
        // Di sini, kita memberikan respons bahwa ID tidak diberikan
        return res.status(400).json({ error: 'Not Found' });
      }

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Mengirimkan data event ke frontend
      res.json({
        title: event.title,
        price: event.price,
        date_time: event.date_time.toISOString(),
        end_time: event.end_time.toISOString(),
        location: event.location,
        description: event.description,
        seats: event.seats,
        is_free: event.is_free,
        is_online: event.is_online,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
