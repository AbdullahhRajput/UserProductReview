import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';;
import { ProductModule } from './product/product.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProdModule } from './prod/prod.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants/constants';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AccessControlModule } from 'nest-access-control';
import { RolesGuard } from './auth/guards/role.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret:jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    MailerModule.forRoot({
      transport: {
        host: 'abdullah.rajput@gmail.com',
        auth:{
          user: 'abdullah.rajput715@gmail.com',
          pass: 'afgfhshkhsppvncu',
        }
      }
    }),
    UserModule, ProductModule, ReviewsModule, AuthModule, ProdModule ],
  controllers: [ AppController ],
  providers: [ AppService  , LocalStrategy, JwtStrategy, {
    provide: APP_GUARD,
    useClass: RolesGuard
  } ]
})
export class AppModule {}