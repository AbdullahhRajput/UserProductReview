import { ApiProperty } from '@nestjs/swagger';


export class OrderDto {
    @ApiProperty()
    productId: string;

    @ApiProperty()
    quantity: number;
}