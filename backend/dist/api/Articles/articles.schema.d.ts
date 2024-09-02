import { Date, HydratedDocument } from 'mongoose';
export type ArticleDocumnet = HydratedDocument<Article>;
export declare class Article {
    _id: string;
    title: string;
    author: string;
    published_date: Date;
    publisher: string;
    volume: string;
    submitted: number;
    moderated: number;
    analyzed: number;
    approved: number;
    rejected: number;
    updated_date: Date;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, import("mongoose").Document<unknown, any, Article> & Article & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & Required<{
    _id: string;
}>>;
