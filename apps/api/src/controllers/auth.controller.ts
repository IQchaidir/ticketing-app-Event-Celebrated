import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
// import { hash } from 'bcrypt';

export class AuthController {
  // Register User
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      // checking existingUser
      const email = req.body.email;
      const user_name = req.body.user_name;

      function generateReferralCode(email: string, username: string) {
        const cleanString = (str: string): string =>
          str.replace(/[^\w]/g, '').toLowerCase();

        const cleanedEmail = cleanString(email);
        const cleanedUsername = cleanString(username);

        // Combine and sort the characters of email and username
        const combinedString = cleanedEmail + cleanedUsername;
        const sortedCombinedString = combinedString.split('').sort().join('');

        return sortedCombinedString;
      }

      const referralCode = generateReferralCode(email, user_name);

      const existingUser = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      if (existingUser) {
        throw new Error('Email is already exist');
      }
      // if (req.body.referral) {
      //   const existingReferral = await prisma.user.findFirst({
      //     where: { referral_code: req.body.referral },
      //   });
      //   if (existingReferral) {
      //     const addPoint = await prisma.referralPoint.create({
      //       data: {
      //         referrer_id: existingReferral.id,
      //         referred_id: newUser.id,
      //         claim_points: false,
      //       },
      //     });
      //   }
      // }
      // add new user if not exist
      const salt = await genSalt(10);
      const hashPassword = await hash(req.body.password, salt);
      // bikin random number (referral code)

      const newUser = await prisma.user.create({
        data: {
          user_name: req.body.user_name,
          email: req.body.email,
          password: hashPassword,
          referral_code: referralCode,
          // role,
          // created_at,
          // updated_at,
        },
      });

      return res.status(201).send({ success: true, result: newUser });
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  // Login User
  async loginUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      if (!user) {
        throw new Error('Invalid Email or Password');
      }
      // generate Token
      const jwtToken = sign(
        { id: user.id, role: user.role, email: user.email },
        'Event123',
      );

      //func compare () from bcrypt
      const isValidPassword = await compare(req.body.password, user.password);
      // if (isvalidpassword == false, throw error)
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return res.status(200).send({
        user_name: user.user_name,
        email: user.email,
        token: jwtToken,
      });

      // const { email, password } = req.body;
      // const userRegister = await prisma.user.findUnique({
      //   where: { email },
      // });
      // if (!userRegister) {
      //   throw new Error('Email is already');
      // }
      // if (!userRegister) {
      // }
    } catch (error: any) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  async changePassword(req: Request, res: Response) {
    // try {
    //   //1. check password lama
    //   const checkUser = await prisma.user.findUnique({
    //     where: { email: req.data },
    //   });
    // } catch (error) {
    //   return res.status(200).send({
    //     success: true,
    //     result: updatePassword,
    //   });
    // }
  }
}
