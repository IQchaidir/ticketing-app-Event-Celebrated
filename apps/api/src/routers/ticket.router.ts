import { verifyToken } from '@/middleware/verifyJWT';
import { TicketController } from '../controllers/ticket.controller';
import { ExtractUserIdFromTokenMiddleware } from '../middleware/jwt';
import { Router } from 'express';

export class TicketRouter {
  private router: Router;
  private ticketController: TicketController;
  private extractUserIdMiddleware: ExtractUserIdFromTokenMiddleware;

  constructor() {
    this.ticketController = new TicketController();
    this.extractUserIdMiddleware = new ExtractUserIdFromTokenMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.ticketController.ticketFilter);
  }

  getRouter(): Router {
    return this.router;
  }
}
