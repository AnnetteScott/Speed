import { Article } from './articles.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<Article>);
    test(): string;
    findAll(): Promise<Article[]>;
    findOne(_id: string): Promise<Article>;
    create(createArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, Article> & Article & Required<{
        _id: string;
    }>>;
    update(_id: string, createArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, Article> & Article & Required<{
        _id: string;
    }>>;
    delete(_id: string): Promise<import("mongoose").Document<unknown, {}, Article> & Article & Required<{
        _id: string;
    }>>;
}
