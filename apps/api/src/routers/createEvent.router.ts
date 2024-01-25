import { ExtractUserIdFromTokenMiddleware } from '@/middleware/jwt';
import { CreateEventController } from '../controllers/createEvent.controller';
import { Router } from 'express';

export class CreateEventRouter {
  private router: Router;
  private createEventController: CreateEventController;
  private extractUserIdMiddleware: ExtractUserIdFromTokenMiddleware;

  constructor() {
    this.createEventController = new CreateEventController();
    this.extractUserIdMiddleware = new ExtractUserIdFromTokenMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      this.extractUserIdMiddleware.extractUserIdFromToken,
      this.createEventController.createEvent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
