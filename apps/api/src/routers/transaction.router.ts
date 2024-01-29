import { verifyToken } from '@/middleware/verifyJWT';
import { TransactionController } from '../controllers/transaction.controller';
import { ExtractUserIdFromTokenMiddleware } from '../middleware/jwt';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;
  private extractUserIdMiddleware: ExtractUserIdFromTokenMiddleware;

  constructor() {
    this.transactionController = new TransactionController();
    this.extractUserIdMiddleware = new ExtractUserIdFromTokenMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/:eventId',
      verifyToken,
      this.transactionController.checkout,
    );
    this.router.get(
      '/:eventId',
      verifyToken,
      this.transactionController.dataCheckout,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
