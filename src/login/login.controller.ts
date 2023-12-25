import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LoginAccountDto, SignupAccount } from 'src/tasks/dto/login.dto';
import { GetUser } from './get-user.decorater';
import { Login, SignUp } from './login.dto';
import { LoginService } from './login.service';

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
