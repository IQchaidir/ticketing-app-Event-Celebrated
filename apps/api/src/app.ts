import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';

import { DiscoveryRouter } from './routers/discovery.router';
import { CreateEventRouter } from './routers/createEvent.router';
import { CategoryRouter } from './routers/category.router';
import { GetEventByIdRouter } from './routers/getEventById.router';
import { TransactionRouter } from './routers/transaction.router';
import { GetUserRouter } from './routers/GetUserController.router';
import path from 'path';
import { ImageRouter } from './routers/getImage.router';
import { TicketRouter } from './routers/ticket.router';
import { OrganizerRouter } from './routers/organizer.router';
import { AuthRouter } from './routers/auth.router';
import { EventRouter } from './routers/event.router';
import { CouponRouter } from './routers/coupon.router';
import { ReviewRouter } from './routers/review.router';

export default class App {
  readonly app: Express;

  constructor() {
    // menggunakan execute otomatis ketika digunakan
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      return res.status(200).send(`<h1>Hello, Purwadhika Student !</h1>`);
    });

    //IQBAL OPEN TASK//
    const discoveryRouter = new DiscoveryRouter();
    const createEventRouter = new CreateEventRouter();
    const categoryRouter = new CategoryRouter();
    const getEventByIdRouter = new GetEventByIdRouter();
    const transactionRouter = new TransactionRouter();
    const getUserRouter = new GetUserRouter();
    const ticketRouter = new TicketRouter();
    const organizerRouter = new OrganizerRouter();
    const imageRouter = new ImageRouter();
    const authRouter = new AuthRouter();
    const eventRouter = new EventRouter();
    const couponRouter = new CouponRouter();
    const reviewRouter = new ReviewRouter();

    this.app.use('/event', eventRouter.getRouter());
    this.app.use('/auth', authRouter.getRouter());
    this.app.use('/event/discovery', discoveryRouter.getRouter());
    this.app.use('/event/createEvent', createEventRouter.getRouter());
    this.app.use('/categories', categoryRouter.getRouter());
    this.app.use('/events', getEventByIdRouter.getRouter());
    this.app.use('/checkout', transactionRouter.getRouter());
    this.app.use('/ticket', ticketRouter.getRouter());
    this.app.use('/organizer', organizerRouter.getRouter());
    this.app.use('/user', getUserRouter.getRouter());
    this.app.use('/coupon', couponRouter.getRouter());
    this.app.use('/review', reviewRouter.getRouter());
    this.app.use(
      '/image',
      express.static(path.join(__dirname, '../../public/image')),
      imageRouter.getRouter(),
    );
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
