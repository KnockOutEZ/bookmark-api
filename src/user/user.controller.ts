/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('JWT-AUTH'))
    @Get('me')
    getMe(){
        return "nigga"
    }
}
