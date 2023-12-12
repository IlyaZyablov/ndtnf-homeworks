import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookTypes } from 'src/infrastructure/interfaces';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): BookTypes[] {
    return this.booksService.getBooks();
  }
}
