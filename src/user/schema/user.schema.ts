import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/prod/enums/role.enum';


export type UserDocument = User & Document ;
@Schema({
  collection: 'users',
  timestamps: true,
})

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  email: string;
  
  @ApiProperty({type: String, enum: Role, default:Role.User})
  @Prop()
  role: Role;
}
export const UserSchema =SchemaFactory.createForClass(User);


