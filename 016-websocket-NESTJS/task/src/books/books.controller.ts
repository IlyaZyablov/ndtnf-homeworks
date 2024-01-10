import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { BooksDocument } from './schemas/books.schema';
import { IParamId } from './interfaces/interfaces';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { CreateBookDto } from './interfaces/dto/create-book';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  public getBooks(): Promise<BooksDocument[]> {
    return this.booksService.getBooks();
  }

  @Post()
  public create(@Body() body: CreateBookDto): Promise<BooksDocument> {
    return this.booksService.create(body);
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BooksDocument, object, object> | null,
    HydratedDocument<BooksDocument, object, object>,
    object,
    BooksDocument
  > {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  public delete(
    @Param() { id }: IParamId,
  ): QueryWithHelpers<
    HydratedDocument<BooksDocument, object, object> | null,
    HydratedDocument<BooksDocument, object, object>,
    object,
    BooksDocument
  > {
    return this.booksService.delete(id);
  }
}
