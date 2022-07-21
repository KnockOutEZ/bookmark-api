/* eslint-disable prettier/prettier */
// Services/Providers are used for business login or funtionality.

import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return {msg:'I am signed in'};
  }
  signup() {
    return {msg:'I am signed up'};
  }
}
