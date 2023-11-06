import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reviews } from './schema/reviews.schema';
import mongoose, { Model } from 'mongoose';
import { createReviewsDto } from './dto/create-reviews-data.dto';



@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Reviews.name) private reviewsModel:Model<Reviews>,
    ) {}
    
    // post
    async create(reqBody:createReviewsDto): Promise<Reviews> {
        const result = await this.reviewsModel.create(reqBody)
        return result;
    }

    
// Fetch By ID
async findById(userId: string): Promise<any> 
{
    const result = await this.reviewsModel.aggregate([
        {
            $addFields: {
                convertedId: { $toObjectId: "$userId" },
                convertedProductId: {$toObjectId: "$productId"}
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
        },
        {
            $lookup: {
              from: 'products', // Name of the parent table (products collection)
              localField: 'convertedProductId', // Field in the child table (reviews collection)
              foreignField: '_id', // Field in the parent table (products collection)
              as: 'products'
            }
          }
        ]);
        if (result.length === 0) {
            throw new NotFoundException('User not Exist!');
        }
    return result;
}

}



// {
//     $unwind: '$product'
// },
// {
//     $project: {
//     _id: 0, 
//     userName: '$users.userName',
//     productName: '$product.productName'
//     }
// }