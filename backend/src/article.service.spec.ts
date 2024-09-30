// backend/src/api/articles/article.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './api/articles/article.service';
import { getModelToken } from '@nestjs/mongoose';
import { Article } from './api/articles/articles.schema';
import { Model } from 'mongoose';

const mockArticle = {
  title: 'Test Article',
  doi: '10.1234/testdoi',
  moderated: false,
  approved: false,
};

describe('ArticleService', () => {
  let service: ArticleService;
  let model: Model<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken(Article.name),
          useValue: {
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockArticle]),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    model = module.get<Model<Article>>(getModelToken(Article.name));
  });

  it('should return all articles that are not moderated', async () => {
    const result = await service.getPending();
    expect(result).toEqual([mockArticle]);
    expect(model.find).toHaveBeenCalledWith({ moderated: false });
  });
});
