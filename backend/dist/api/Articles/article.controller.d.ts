import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    test(): string;
    findAll(): Promise<import("./articles.schema").Article[]>;
    findOne(id: string): Promise<import("./articles.schema").Article>;
    addArticle(createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    updateArticle(id: string, createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    deleteArticle(id: string): Promise<import("mongoose").Document<unknown, {}, import("./articles.schema").Article> & import("./articles.schema").Article & Required<{
        _id: string;
    }>>;
}
