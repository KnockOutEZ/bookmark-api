/* eslint-disable prettier/prettier */
import {IsEmail,IsNotEmpty,IsString} from 'class-validator'

// creating the field template for Auth
export class AuthDto{
    // declaring the validator decorator before email
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    user_name:string
}