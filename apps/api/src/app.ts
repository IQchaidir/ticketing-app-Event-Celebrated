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
import { SampleRouter } from './routers/sample.router';
import { DiscoveryRouter } from './routers/discovery.router';
import { CreateEventRouter } from './routers/createEvent.router';
import { CategoryRouter } from './routers/category.router';
import { GetEventByIdRouter } from './routers/getEventById.router';

export default class App {
  private app: Express;

  constructor() {
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
    const sampleRouter = new SampleRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/samples', sampleRouter.getRouter());
    //IQBAL OPEN TASK//
    const discoveryRouter = new DiscoveryRouter();
    const createEventRouter = new CreateEventRouter();
    const categoryRouter = new CategoryRouter();
    const getEventByIdRouter = new GetEventByIdRouter();

    this.app.use('/event/discovery', discoveryRouter.getRouter());
    this.app.use('/event/createEvent', createEventRouter.getRouter());
    this.app.use('/categories', categoryRouter.getRouter());
    this.app.use('/event', getEventByIdRouter.getRouter());
  }
  //IQBAL CLOSED TASK//
  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
