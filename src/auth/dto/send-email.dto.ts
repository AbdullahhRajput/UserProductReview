import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export   class SendEmailDto
{
    @IsEmail()
    @ApiProperty({
        description: 'Name',
        example: 'abdullah.rajput715@gmail.com'
    })
    email: string;

    // @IsNotEmpty()
    // @ApiProperty()
    // newPassword: string;

    // @IsNotEmpty()
    // @ApiProperty()
    // confirmPassword: string;
}