import { TransactionController } from '@/controllers/transaction.controller';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/:eventId', this.transactionController.checkout);
  }

  getRouter(): Router {
    return this.router;
  }
}
