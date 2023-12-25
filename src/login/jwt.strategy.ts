import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SignupEntity } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(SignupEntity)
    private readonly signupRep: Repository<SignupEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<SignupEntity> {
    const { userName } = payload;
    console.log('userName', userName);
    const user = await this.signupRep.findOne({ where: { userName } });
    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
