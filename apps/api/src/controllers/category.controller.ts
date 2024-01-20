import { PrismaClient, Event, Category } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      // Mengakses definisi enum 'Category' langsung dari model Prisma
      const enumValues = Object.values(Category);

      return res.json(enumValues);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
