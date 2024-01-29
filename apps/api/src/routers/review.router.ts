import { ReviewController } from '@/controllers/review.controller';
import { verifyToken } from '@/middleware/verifyJWT';
import { Router } from 'express';

export class ReviewRouter {
  private router: Router;
  private reviewController: ReviewController;

  constructor() {
    this.reviewController = new ReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/create',
      verifyToken,
      this.reviewController.createReview,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
