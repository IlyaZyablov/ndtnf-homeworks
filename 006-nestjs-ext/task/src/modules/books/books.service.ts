import { Injectable } from '@nestjs/common';
import { BookTypes } from 'src/infrastructure/interfaces';

@Injectable()
export class BooksService {
  private readonly books: BookTypes[] = [];

  getBooks(): BookTypes[] {
    return this.books;
  }
}
