import supertest from 'supertest';
import prisma from '../prisma';
import App from '../app';

const app = new App().app;
const request = supertest(app);

beforeEach(() => {});

beforeAll(async () => {});

afterAll;

//GOOD CASE
it('should get some data from table event', async () => {
  const response = await request.get(`http://localhost:8000/event/7`);

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});
