import { CreateEventController } from '../controllers/createEvent.controller';
import { Router } from 'express';
import { uploader } from '../middleware/uploader';
import { verifyToken } from '@/middleware/verifyJWT';

export class CreateEventRouter {
  private router: Router;
  private createEventController: CreateEventController;

  constructor() {
    this.createEventController = new CreateEventController();

    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      uploader('IMG', '/image').single('image'),
      verifyToken,
      this.createEventController.createEvent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
