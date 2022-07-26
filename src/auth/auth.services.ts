/* eslint-disable prettier/prettier */
// Services/Providers are used for business login or funtionality.

import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // hash the password
    const hashedPass = await argon.hash(dto.password);

    // error handling
    try {
      // save the user in db.By default all the fields will be sent to frontend.
      const user = await this.prisma.user.create({
        data: {
          user_name: dto.user_name,
          email: dto.email,
          hashedPass,
        },
        // selecting specific fields to return to frontend. doing this to stop hashpass sending to frontend
        // select:{
        //   user_name: true,
        //   email: true,
        //   created_at:true,
        // }
      });

      // we can do this too. Stop a field to return to frontend.
      delete user.hashedPass;

      // return saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'There is a unique constraint violation',
          );
        }
      }
      throw `${error}`;
    }
  }

  async signin(dto: AuthDto) {
    // get the user data table if the email exists
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist,throw error
    if (!user) {
      throw new ForbiddenException('Email does not exist!');
    }

    // check if the password is correct
    const pwCheck = await argon.verify(user.hashedPass, dto.password);

    // error handling for password
    if (!pwCheck) {
      throw new ForbiddenException('Incorrect Password!');
    }

    // send the user data to frontend without password
    delete user.hashedPass;
    // return user;

    // sending the jwt token to frontend;
    return this.signToken(user.id, user.email);
  }

  // jwt functionality
  async signToken(
    userId: number,
    email: string,
  ): Promise<{access_token:string}> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
