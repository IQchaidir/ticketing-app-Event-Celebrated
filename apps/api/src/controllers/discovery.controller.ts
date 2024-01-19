import { Request, Response } from 'express';
import prisma from '@/prisma';
import { Category } from '@prisma/client';

export class DiscoveryController {
  async discoverEvents(req: Request, res: Response) {
    const { category, is_free, is_online, search, page } = req.query as {
      category?: Category;
      is_free?: string;
      is_online?: string;
      search?: string;
      page?: string;
    };

    const itemsPerPage = 6; // Ubah jumlah item per halaman sesuai kebutuhan
    const pageNumber = page ? parseInt(page, 10) : 1;
    const skip = (pageNumber - 1) * itemsPerPage;

    try {
      const events = await prisma.event.findMany({
        where: {
          category: category ? { equals: category } : undefined,
          is_free: is_free ? { equals: is_free === 'true' } : undefined,
          is_online: is_online ? { equals: is_online === 'true' } : undefined,
          title: search ? { contains: search } : undefined,
        },
        take: itemsPerPage,
        skip: skip,
        orderBy: { id: 'asc' }, // Menambahkan orderBy untuk mengurutkan berdasarkan ID
      });

      if (events.length === 0) {
        // Tidak ada event yang sesuai dengan filter
        return res.status(404).json({ message: 'Event not found' });
      } else {
        // Ada event yang sesuai dengan filter, kirimkan sebagai respons
        return res.json(events);
      }
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  }
}
