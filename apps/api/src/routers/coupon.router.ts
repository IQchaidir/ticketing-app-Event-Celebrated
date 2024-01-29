import { CouponController } from '@/controllers/coupon.controller';
import { Router } from 'express';

export class CouponRouter {
  private router: Router;
  private couponController: CouponController;

  constructor() {
    this.couponController = new CouponController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', this.couponController.createCoupon);
  }

  getRouter(): Router {
    return this.router;
  }
}
