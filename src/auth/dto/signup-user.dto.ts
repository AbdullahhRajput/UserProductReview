import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/prod/enums/role.enum';


export class SignupUserDto
{
@IsNotEmpty()
@ApiProperty()
username: string;
static username: string;


@IsNotEmpty()
@ApiProperty()
password: string;
static password: string;


@IsNotEmpty()
@IsEmail()
@ApiProperty()
email: string;
static email: string;


@ApiProperty({type: String, enum: Role,default:Role.User})
role: Role;
}