import { verifyToken } from '@/middleware/verifyJWT';
import { GetUserController } from '../controllers/getUser.controller';
import { ExtractUserIdFromTokenMiddleware } from '../middleware/jwt';
import { Router } from 'express';

export class GetUserRouter {
  private router: Router;
  private getUserController: GetUserController;
  private extractUserIdMiddleware: ExtractUserIdFromTokenMiddleware;

  constructor() {
    this.getUserController = new GetUserController();
    this.extractUserIdMiddleware = new ExtractUserIdFromTokenMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/email', verifyToken, this.getUserController.getUserEmail);
    this.router.get('/role', verifyToken, this.getUserController.getUserRole);
  }

  getRouter(): Router {
    return this.router;
  }
}
