import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from './schemas/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
