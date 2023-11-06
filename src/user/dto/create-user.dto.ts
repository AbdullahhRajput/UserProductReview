import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createUserDto
{

  @ApiProperty()
  @IsNotEmpty()
  userName: string;
}