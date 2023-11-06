import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/user/user.module'
import { EmailService } from './email.service'
import { UserController } from 'src/user/user.controller'
import { UserRepository } from 'src/user/user.repository'
import * as dotenv from 'dotenv';
import { jwtConstants } from './constants/constants';
import { JwtStrategy } from './strategies/jwt.strategy'

// import { ConfigService } from '@nestjs/config
dotenv.config();

// console.log(typeof(process.env.JWT_SECRET),"process.env.JWTzzzz_SECRETprocess.env.JWT_SECRET")

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({
      global: true,
      secret:jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
],
  controllers: [AuthController,UserController,],
  providers: [AuthService,EmailService,JwtService,UserRepository],
  exports: [AuthService,EmailService,JwtService,UserRepository]
})
export class AuthModule {}
