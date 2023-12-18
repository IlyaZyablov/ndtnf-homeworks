import { Injectable } from '@nestjs/common';
import { BooksDocument, Books } from './schemas/books.schema';
import {
  Model,
  Connection,
  HydratedDocument,
  QueryWithHelpers,
} from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private BooksModel: Model<BooksDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public getBooks(): Promise<BooksDocument[]> {
    return this.BooksModel.find().exec();
  }

  public create(data: CreateBookDto): Promise<BooksDocument> {
    const todo = new this.BooksModel(data);

    return todo.save();
  }

  public update(
    id: string,
    data: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BooksDocument, object, object> | null,
    HydratedDocument<BooksDocument, object, object>,
    object,
    BooksDocument
  > {
    return this.BooksModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(
    id: string,
  ): QueryWithHelpers<
    HydratedDocument<BooksDocument, object, object> | null,
    HydratedDocument<BooksDocument, object, object>,
    object,
    BooksDocument
  > {
    return this.BooksModel.findOneAndDelete({ _id: id });
  }
}
