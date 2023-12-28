import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

describe('BooksController', () => {
  let app: INestApplication;

  const mockBook = {
    title: '1',
    description: '2',
    authors: '3',
    fileCover: '4',
    fileName: '5',
    fileBook: '6',
    favorite: true,
  };

  class TestingBooksService {
    static getBooks = jest.fn().mockResolvedValue([
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
    ]);

    static create = jest.fn().mockResolvedValue(mockBook);

    static update = jest.fn().mockResolvedValue(mockBook);

    static delete = jest.fn().mockReturnValue(true);
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: TestingBooksService,
        },
        {
          provide: getConnectionToken(''),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET books', async () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(await TestingBooksService.getBooks());
  });

  it('/POST books', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(mockBook)
      .expect(201);
  });

  it('/PUT books', () => {
    return request(app.getHttpServer())
      .put('/books/123')
      .send(mockBook)
      .expect(200)
      .expect(mockBook);
  });

  it('/delete books', () => {
    return request(app.getHttpServer())
      .delete('/books/123')
      .expect(200)
      .expect('true');
  });

  afterAll(async () => {
    await app.close();
  });
});
