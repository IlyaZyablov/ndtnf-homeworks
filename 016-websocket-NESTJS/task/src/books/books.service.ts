import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  Connection,
  HydratedDocument,
  Model,
  QueryWithHelpers,
} from 'mongoose';
import { Books, BooksDocument } from './schemas/books.schema';
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
