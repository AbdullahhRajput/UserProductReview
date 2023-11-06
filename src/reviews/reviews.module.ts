import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsSchema } from './schema/reviews.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/reviews'),
        MongooseModule.forFeature([{name: 'Reviews', schema: ReviewsSchema}])
    ],
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [
        MongooseModule,
        ReviewsService,
    ]
})
export class ReviewsModule {}
