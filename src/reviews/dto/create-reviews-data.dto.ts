import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createReviewsDto
{
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  productId: string;
  
  @IsNotEmpty()
  @ApiProperty()
  title: string;

}