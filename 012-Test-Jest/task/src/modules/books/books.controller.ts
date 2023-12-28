import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { BooksService } from './books.service';
import { Books, BooksDocument } from './schemas/books.schema';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { IParamId } from './interfaces/interfaces';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  public getBooks(): Promise<Books[]> {
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
