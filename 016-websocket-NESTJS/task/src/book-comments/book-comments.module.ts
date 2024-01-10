import { Module } from '@nestjs/common';
import { BookCommentsController } from './book-comments.controller';
import { BookCommentsService } from './book-comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookCommentSchema,
  BookComments,
} from './schemas/book-comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComments.name, schema: BookCommentSchema },
    ]),
  ],
  controllers: [BookCommentsController],
  providers: [BookCommentsService],
  exports: [BookCommentsService],
})
export class BookCommentsModule {}
