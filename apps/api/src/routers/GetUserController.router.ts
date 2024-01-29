import { verifyToken } from '@/middleware/verifyJWT';
import { GetUserController } from '../controllers/getUser.controller';
import { Router } from 'express';

export class GetUserRouter {
  private router: Router;
  private getUserController: GetUserController;

  constructor() {
    this.getUserController = new GetUserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/email', verifyToken, this.getUserController.getUserEmail);
    this.router.get('/role', verifyToken, this.getUserController.getUserRole);
    this.router.get(
      '/referralPoint',
      verifyToken,
      this.getUserController.getUserPointReferral,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
