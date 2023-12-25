import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity, SignupEntity } from 'src/entity/order.entity';
import { LoginAccountDto, SignupAccount } from 'src/tasks/dto/login.dto';
import { Repository } from 'typeorm';
import { Login, SignUp } from './login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRep: Repository<LoginEntity>,

    @InjectRepository(SignupEntity)
    private readonly signupRep: Repository<SignupEntity>,
    private jwtService: JwtService,
  ) {}

  async loginAccount(
    createAccountDto: LoginAccountDto,
  ): Promise<{ login: Login; accessToken: string }> {
    try {
      const { userName, password } = createAccountDto;

      const existingUser = await this.signupRep.findOne({
        where: { userName },
      });

      if (!existingUser) {
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(password, existingUser.password);

      if (!isValid) {
        throw new Error('Invalid password');
      }
      const login: Login = {
        userName,
        password,
      };

      const payload: JwtPayload = { userName };

      const accessToken = await this.jwtService.sign(payload);

      return { login, accessToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signupAccount(
    signupAccount: SignupAccount,
  ): Promise<{ message: string; user: SignUp }> {
    const { firstName, lastName, userName, password } = signupAccount;

    const salt = await bcrypt.genSalt();

    const exists = await this.signupRep.find({ where: { userName: userName } });

    if (exists[0]) {
      throw new NotFoundException(
        `This user Name ${userName} is already in using some one.`,
      );
    }
    const hashedPassword = await this.hashPassword(password, salt);

    const signUp = await this.signupRep.save({
      firstName,
      lastName,
      userName,
      // password,
      password: hashedPassword,
    });

    await this.signupRep.save(signUp);
    return {
      message: 'Sign up successful',
      user: signUp,
    };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
