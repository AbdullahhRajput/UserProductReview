import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty } from 'class-validator';
import { Role } from '../enums/role.enum';


export class CreateProdDto
{
@IsNotEmpty()
@ApiProperty()
name: string;

@IsNotEmpty()
@ApiProperty()
price: number;

@IsNotEmpty()
@ApiProperty()
categories: string;

@IsNotEmpty()
@ApiProperty()
quantity: number;

  
}