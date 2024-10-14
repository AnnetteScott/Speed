import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './api/articles/article.controller';
import { ArticleService } from './api/articles/article.service'; 
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  const mockArticleService = {
    getPending: jest.fn().mockResolvedValue([
      { title: 'Test Article', doi: '10.1234/testdoi', moderated: false },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [{ provide: ArticleService, useValue: mockArticleService }],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should return all articles that are not moderated', async () => {
    const result = await controller.getPending();
    expect(result).toEqual([
      { title: 'Test Article', doi: '10.1234/testdoi', moderated: false },
    ]);
    expect(service.getPending).toHaveBeenCalled();
  });

  it('should throw an HttpException when no articles are found', async () => {
    jest.spyOn(service, 'getPending').mockResolvedValueOnce([]);

    try {
      await controller.getPending();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(error.message).toBe('No Articles found');
    }
  });
});
