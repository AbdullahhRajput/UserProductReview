import { Controller, Get, Post  ,Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { createProductDto } from './dto/create-product-data.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guards';

@ApiTags("Products")
@Controller('Products')
export class ProductController {
constructor(private productService: ProductService) {}

// create 
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Post('/createProduct')
async creatUser(@Body() reqBody:createProductDto): Promise<any>{
    return
//return this.productService.create(reqBody);
}


// Fetch all data
@Get('/getAllProducts')
async getAllData(): Promise<Product[]>{
    return this.productService.findAll();
}

// connecting two tables with aggregate lookup

// @Get('/connect2Tables')
// async connectionOfCollections() {
// return this.productService.connectionOfCollections();
// }


// Fetch by ID
@Get('/:id')
async getUser( @Param ('id') id: string ): Promise<Product>{
    return await this.productService.findById(id);
}


// delete data
@Delete('/deleteProduct/:id')
async deleteUser (@Param ('id') id: string): Promise<Product>{
    return await this.productService.deletebyId(id);
}
}
