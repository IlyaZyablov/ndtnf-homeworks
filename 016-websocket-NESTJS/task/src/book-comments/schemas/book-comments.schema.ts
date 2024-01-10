import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookCommentsDocument = BookComments & Document;

@Schema()
export class BookComments {
  @Prop({ required: true })
  public bookId: string;

  @Prop({ required: true })
  public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComments);
