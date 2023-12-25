import {
  Body,
  Controller,
  Res,
  UseGuards,
  Post,
  ValidationPipe,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { LoginAccountDto, SignupAccount } from 'src/tasks/dto/login.dto';
import { LoginService } from './login.service';
import { Login, SignUp } from './login.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorater';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async createLogin(
    @Body() CreateAccountDto: LoginAccountDto,
    @Res() res: Response,
  ): Promise<{ accessToken: string } | void> {
    try {
      const response = await this.loginService.loginAccount(CreateAccountDto);

      res.status(501).json({
        message: 'You have successfully logged in',

        accessToken: response.accessToken,
      });
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  @Post('signup')
  async signUp(
    @Body() signupAccount: SignupAccount,
  ): Promise<{ message: string; user: SignUp }> {
    try {
      return await this.loginService.signupAccount(signupAccount);
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: Login) {
    console.log(user);
  }
}
