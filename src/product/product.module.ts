import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { ProductController } from './product.controller';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/product'),
        MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [
        MongooseModule,
        ProductService,
    ]
})
export class ProductModule{}
