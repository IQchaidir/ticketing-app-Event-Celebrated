import { CreateEventController } from '@/controllers/createEvent.controller';
import { Router } from 'express';

export class CreateEventRouter {
  private router: Router;
  private createEventController: CreateEventController;

  constructor() {
    this.createEventController = new CreateEventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.createEventController.createEvent);
  }

  getRouter(): Router {
    return this.router;
  }
}
