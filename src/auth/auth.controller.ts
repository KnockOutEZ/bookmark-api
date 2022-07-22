/* eslint-disable prettier/prettier */

// Controllers are mainly used for handling requests and routing

import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.services';
import { AuthDto } from './dto';

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
  signup(
    @Body() dto:AuthDto

    // We can use pipes like this for validation
    // @Body('email') email:string,
    // @Body('password') password:ParseIntPipe
    ) {
    // This is how we get the pipe data
    // console.log({
    //   email,
    //   typeOfEmail: typeof email,
    //   password,
    //   typeOfPassword: typeof password
    // })

    console.log({dto})
    return(this.authService.signup(dto))
  }

  @Post('signin')
  signin(@Body() dto:AuthDto) {
    this.authService.signup
  }
}
