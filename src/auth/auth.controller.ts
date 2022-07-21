/* eslint-disable prettier/prettier */

// Controllers are mainly used for handling requests and routing

import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.services';

// the 'auth' here means the root path of the endpoint
@Controller('auth')
export class AuthController {
  // the private here means the below snippet
  // authService:AuthService
  // constructor(authservice:AuthService){
  //     this.authService = authservice
  //   we can also access the functions from services class
  // this.authService.login()
  // }

  constructor(private authService: AuthService) {}
  // the 'signup' means the path after auth. like "/auth/signup" in endpoint

  @Post('signup')
  signup() {
    this.authService.signup
  }
  @Post('signin')
  signin() {
    this.authService.signup
  }
}
