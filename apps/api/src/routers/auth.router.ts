import { AuthController } from '@/controllers/auth.controller';
import { registerValidation } from '@/middleware/validator';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  //when used, it can be executed
  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.registerUser);
    this.router.post(
      '/login',
      registerValidation,
      this.authController.loginUser,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
