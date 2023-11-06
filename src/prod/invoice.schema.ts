import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type InvoiceDocument = Invoice & Document ;
@Schema({
collection: 'users',
timestamps: true,
})
@Schema()
export class Invoice {

@Prop()
@ApiProperty()
name: string;

@Prop()
@ApiProperty()
categories: string;

@Prop()
@ApiProperty()
price: number;

@Prop()
@ApiProperty()
subtotal: number;

@Prop()
@ApiProperty()
tax: number;

@Prop()
@ApiProperty()
total: number;
}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);


