import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';

export type ProductDocument = Product & Document ;

@Schema({
  collection: 'users',
  timestamps: true,
})

@Schema()
export class Product {

  @Prop()
  userId: string;

  @Prop()
  productName: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);

