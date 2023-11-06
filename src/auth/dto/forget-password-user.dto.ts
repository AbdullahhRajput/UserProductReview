import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @ApiProperty()
  email: string;
  
  @IsNotEmpty()
  @ApiProperty()
  OTP: string;

  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  confirmPassword: string;
}