import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty } from 'class-validator';


export class updateProdDto
{
@IsNotEmpty()
@ApiProperty()
name: string;
}