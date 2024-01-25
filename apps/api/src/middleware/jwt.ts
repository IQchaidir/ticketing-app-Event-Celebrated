import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// type User = {
//   id: number;
// };

declare global {
  namespace Express {
    interface Request {
      dataUser?: any; // Tambahkan deklarasi properti di sini
    }
  }
}

export class ExtractUserIdFromTokenMiddleware {
  extractUserIdFromToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const token = req.header('Authorization')?.split(' ')[1];

    if (token) {
      try {
        const decodedToken: any = jwt.verify(token, 'andi123'); // Gantilah 'your-secret-key' dengan kunci rahasia Anda
        req.dataUser = decodedToken.id; // Tambahkan ID pengguna ke objek permintaan (request)

        next();
      } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
      }
    } else {
      res.status(401).json({ error: 'Token not provided' });
    }
  }
}