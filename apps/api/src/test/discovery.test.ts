import supertest from 'supertest';
import App from '../app';
import prisma from '../prisma';
const app = new App().app;

describe('DiscoveryController', () => {
  it('should return a list of events', async () => {
    const successTestParams = {
      query: {
        category: 'music',
        is_free: 'true',
        is_online: 'true',
        search: 'acara',
        start_date: '2023-01-01T00:00:00Z',
        end_date: '2023-01-31T23:59:59Z',
      },
      expectedStatus: 200,
      expectedBody: [
        {
          id: expect.any(Number),
          title: expect.any(String),
          category: expect.any(String),
          is_free: expect.any(Boolean),
          is_online: expect.any(Boolean),
          date_time: expect.any(String),
          end_time: expect.any(String),
        },
      ],
    };

    const response = await supertest(app)
      .get('/event/discovery')
      .query(successTestParams.query);

    expect(response.status).toBe(successTestParams.expectedStatus);
    expect(response.body).toEqual(successTestParams.expectedBody);
  });

  it('should handle errors gracefully', async () => {
    const response = await supertest(app).get('/event/discovery').query({});

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
