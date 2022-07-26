/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('JWT-AUTH'))
    @Get('get-me')
    getMe(@Req() req:Request){
        return req.user;
    }
}
