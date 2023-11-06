import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly authService:AuthService )
  {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      }
    );
  }
  async validate(email: string, password: string) {
    const validateUser = await this.authService.validateUser(email, password);
    if (!validateUser) {
      throw new UnauthorizedException('User not exist');
    }
    return validateUser;
  }
}

