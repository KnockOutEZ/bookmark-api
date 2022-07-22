/* eslint-disable prettier/prettier */
// Services/Providers are used for business login or funtionality.

import { ForbiddenException, Injectable } from '@nestjs/common';
import {User,Bookmark} from '@prisma/client';
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService){
    
  }

  async signup(dto: AuthDto) {
    // hash the password
    const hashedPass = await argon.hash(dto.password)

    // error handling
    try{
      // save the user in db.By default all the fields will be sent to frontend.
    const user = await this.prisma.user.create({
      data:{
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
    })

    // we can do this too. Stop a field to return to frontend.
    delete user.hashedPass

    // return saved user
    return user;

    }catch(error){
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'There is a unique constraint violation'
          )
        }
      }
      throw `${error} nigga`;
    }
  }

  login() {
    return {msg:'I am signed in'};
  }
}
