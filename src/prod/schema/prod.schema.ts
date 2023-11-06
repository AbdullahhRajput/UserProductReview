import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from '../enums/role.enum';

export type ProdDocument = Prod & Document ;
@Schema({
collection: 'Prod',
timestamps: true,
})
@Schema()
export class Prod {
@IsNotEmpty()
@Prop()
@ApiProperty()
name: string;

@IsNotEmpty()
@Prop()
@ApiProperty()
subtotal: number;

@IsNotEmpty()
@Prop()
@ApiProperty()
tax: number;

@IsNotEmpty()
@Prop()
@ApiProperty()
price: number;

@IsNotEmpty()
@Prop()
@ApiProperty()
categories: string;

@IsNotEmpty()
@Prop()
@ApiProperty()
total: number;

@ApiProperty({ type: String, enum: Role })
@Prop()
role: Role;
}

export const ProdSchema = SchemaFactory.createForClass(Prod);


