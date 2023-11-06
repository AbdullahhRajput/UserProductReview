import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import mongoose, { Model } from 'mongoose';
import { createProductDto } from './dto/create-product-data.dto';

@Injectable()
export class ProductService {
constructor(
    @InjectModel(Product.name) private productModel:Model<Product>,
) {}

// post
async create(reqBody:createProductDto): Promise<Product> {
    return await this.productModel.create(reqBody)
}

// Fetch all data
    async findAll(): Promise<Product[]>{
    try {
        return await this.productModel.aggregate([
            {
                $addFields: {
                convertedId: { $toObjectId: "$userId" }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'convertedId',
                    foreignField: '_id',
                    as: "User's Products"
                }
            }
        ]);
    } catch (error) {
    throw new NotFoundException('Data not Found!')
    }
}

// Fetch By ID
    async findById(userId: string): Promise<any> {
    const result = await this.productModel.aggregate([{
            $addFields: {
                convertedId: { $toObjectId: "$userId" }
            }
        },
        {
            $match: {
                convertedId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'convertedId',
                foreignField: '_id',
                as: 'users'
            }
        }
    ])
    if (result.length === 0) {
        throw new NotFoundException('User not Exist!');
    }
    return result;
}


 // delete data
async deletebyId (id: string): Promise<any> {
    try {
    const deletedUser = await this.productModel.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    return 'Deleted Successfully';
    } catch (error) {
    throw new NotFoundException('Invalid id');
    }
}


}