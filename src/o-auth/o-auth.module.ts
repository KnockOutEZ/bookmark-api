/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { OAuthController } from './o-auth.controller';
import { OAuthService } from './o-auth.service';

@Module({
  controllers: [OAuthController],
  providers: [OAuthService,GoogleStrategy]
})
export class OAuthModule {}
