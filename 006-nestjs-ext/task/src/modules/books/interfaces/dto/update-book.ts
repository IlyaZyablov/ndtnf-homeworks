export interface UpdateBookDto {
  title: string;
  description: string;
  authors: string;
  fileCover: string;
  fileName: string;
  fileBook: string;
  favorite?: boolean;
}
