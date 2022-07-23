/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OAuthService } from './o-auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class OAuthController {
  constructor(private readonly OAuthService: OAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.OAuthService.googleLogin(req)
  }
}