import supertest from 'supertest';
import App from '@/app';
import prisma from '@/prisma';

const app = new App().app;

describe('Test Operation', () => {
  const loginUser = {
    post: 'username, email, referral Code',
    userId: 1,
  };
  let postId: number;
  beforeEach(() => {
    // menyimpan program terlebih dahulu sebelum running test
  });

  beforeAll(async () => {
    // menyimpan program yang sekali dijalankan sebelum semua test dijalankan
    await prisma.$connect();
  });
  afterEach(() => {
    // ---
  });
  afterAll(async () => {
    //hapus data uji setelah pengujian selesai
    // await prisma.post.delete({
    //   where: { id: postId },
    // });
    await prisma.$disconnect();
  });
});
