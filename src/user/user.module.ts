import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dumy'),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    MongooseModule,
    UserService,
  ]
})
export class UserModule {}
