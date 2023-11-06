import { Controller, Post  ,Body, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Reviews } from './schema/reviews.schema';
import { createReviewsDto } from './dto/create-reviews-data.dto';
import { ApiTags } from '@nestjs/swagger';
import { Product } from 'src/product/schema/product.schema';

@ApiTags("reviews")
@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) {}
    
    // create data
    @Post('/createReview')
    async creatUser(@Body() reqBody:createReviewsDto): Promise<Reviews>{
        return this.reviewsService.create(reqBody);
    }

    // Fetch by ID
@Get('/:id')
async getUser( @Param ('id') id: string ): Promise<Product>{
    return await this.reviewsService.findById(id);
}



    }
