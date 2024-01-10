import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BooksDocument = Books & Document;

@Schema()
export class Books {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public authors: string;

  @Prop({ required: true })
  public fileCover: string;

  @Prop({ required: true })
  public fileName: string;

  @Prop({ required: true })
  public fileBook: string;

  @Prop()
  public favorite: boolean;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
