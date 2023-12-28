import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Books } from './schemas/books.schema';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Books>;

  class TestingBookModel {
    constructor(private data) {}
    save = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn();
    static findOneAndUpdate = jest.fn();
    static findOneAndDelete = jest.fn();
  }

  const mockBook = {
    title: '1',
    description: '2',
    authors: '3',
    fileCover: '4',
    fileName: '5',
    fileBook: '6',
    favorite: true,
  };

  const mockBooks = [
    {
      title: '1',
      description: '2',
      authors: '3',
      fileCover: '4',
      fileName: '5',
      fileBook: '6',
      favorite: true,
    },
    {
      title: '2',
      description: '3',
      authors: '4',
      fileCover: '5',
      fileName: '6',
      fileBook: '7',
      favorite: true,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Books.name),
          useValue: TestingBookModel,
        },
        {
          provide: getConnectionToken(''),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Books>>(getModelToken(Books.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBooks),
    } as any);

    const books = await service.getBooks();
    expect(books).toEqual(mockBooks);
  });

  it('should update book', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue(mockBook as any);

    const updatedBook = await service.update('123', mockBook);
    expect(updatedBook).toEqual(mockBook);
  });

  it('should delete book', async () => {
    jest.spyOn(model, 'findOneAndDelete').mockReturnValue(mockBook as any);

    const deletedBook = await service.delete('123');
    expect(deletedBook).toEqual(mockBook);
  });

  it('should create book', async () => {
    const newBook = await service.create(mockBook);
    expect(newBook).toEqual(mockBook);
  });
});
