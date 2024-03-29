import express, { Router } from 'express';

import { ImageController } from '../controllers/image.Controller';

export class ImageRouter {
  private router: Router;
  private imageController: ImageController;

  constructor() {
    this.router = express.Router();
    this.imageController = new ImageController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:filename', this.imageController.getImage);
  }

  public getRouter(): Router {
    return this.router;
  }
}
