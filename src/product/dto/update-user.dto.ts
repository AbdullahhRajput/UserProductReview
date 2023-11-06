import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto{

    @ApiProperty()
    
    readonly email: string;
}
