import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  BookComments,
  BookCommentsDocument,
} from './schemas/book-comments.schema';
import {
  Connection,
  HydratedDocument,
  Model,
  QueryWithHelpers,
} from 'mongoose';
import { CreateBookCommentDto } from './interfaces/dto/create-book-comment';
import { UpdateBookCommentDto } from './interfaces/dto/update-book-comment';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComments.name)
    private BookCommentsModel: Model<BookCommentsDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public get(id: string): Promise<BookCommentsDocument> {
    return this.BookCommentsModel.findById(id);
  }

  public create(data: CreateBookCommentDto): Promise<BookCommentsDocument> {
    const todo = new this.BookCommentsModel(data);

    return todo.save();
  }

  public update(
    id: string,
    data: UpdateBookCommentDto,
  ): QueryWithHelpers<
    HydratedDocument<BookCommentsDocument, object, object> | null,
    HydratedDocument<BookCommentsDocument, object, object>,
    object,
    BookCommentsDocument
  > {
    return this.BookCommentsModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(
    id: string,
  ): QueryWithHelpers<
    HydratedDocument<BookCommentsDocument, object, object> | null,
    HydratedDocument<BookCommentsDocument, object, object>,
    object,
    BookCommentsDocument
  > {
    return this.BookCommentsModel.findOneAndDelete({ _id: id });
  }

  public findAllBookComments(bookId: string): Promise<BookCommentsDocument[]> {
    return this.BookCommentsModel.find({ bookId }).exec();
  }
}
