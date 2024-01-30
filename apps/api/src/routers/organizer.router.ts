import { verifyToken } from '@/middleware/verifyJWT';
import { OrganizerController } from '../controllers/organizer.controller';
import { ExtractUserIdFromTokenMiddleware } from '../middleware/jwt';
import { Router } from 'express';

export class OrganizerRouter {
  private router: Router;
  private organizerController: OrganizerController;
  private extractUserIdMiddleware: ExtractUserIdFromTokenMiddleware;

  constructor() {
    this.organizerController = new OrganizerController();
    this.extractUserIdMiddleware = new ExtractUserIdFromTokenMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/event',
      verifyToken,
      this.organizerController.organizerEvent,
    );
    this.router.get(
      '/attendee',
      verifyToken,
      this.organizerController.attendee,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
