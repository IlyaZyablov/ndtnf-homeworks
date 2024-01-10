import { Test, TestingModule } from '@nestjs/testing';
import { BookCommentsController } from './book-comments.controller';

describe('BookCommentsController', () => {
  let controller: BookCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookCommentsController],
    }).compile();

    controller = module.get<BookCommentsController>(BookCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
