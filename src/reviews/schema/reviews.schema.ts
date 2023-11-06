import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';

export type UserDocument = Reviews & Document ;

@Schema({
  collection: 'users',
  timestamps: true,
})

@Schema()
export class Reviews {

  @Prop()
  userId: string;

  @Prop()
  productId: string;

  @Prop()
  title: string;

}
export const ReviewsSchema = SchemaFactory.createForClass(Reviews);

