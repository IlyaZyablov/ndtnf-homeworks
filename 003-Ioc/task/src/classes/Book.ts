import { BookTypes } from "../types/index";

export default class Book implements BookTypes {
  id: number;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  
  constructor(title: string, description: string, authors: string, favorite: boolean, fileCover: string, fileName: string) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.id = Date.now(); // простой ID в виде числа
  }
}