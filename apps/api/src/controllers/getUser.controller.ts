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
}