/* eslint-disable prettier/prettier */
// Services/Providers are used for business login or funtionality.

import { Injectable } from '@nestjs/common';
// import {User,Bookmark} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService){
    
  }
  login() {
    return {msg:'I am signed in'};
  }
  signup() {
    return {msg:'I am signed up'};
  }
}
