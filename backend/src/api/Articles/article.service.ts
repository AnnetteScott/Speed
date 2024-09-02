/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Article } from './articles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';


@Injectable()

export class ArticleService{
constructor (@InjectModel(Article.name) private articleModel: Model<Article>){}

test():string{
    return 'article route testig';
}

async findAll(): Promise<Article[]>{
    return await this.articleModel.find().exec();
}

async findOne(_id:string):Promise<Article>{
    return await this.articleModel.findById(_id).exec();
}

async create(createArticleDto:CreateArticleDto){
    return await this.articleModel.create(createArticleDto);
}
async update(_id:string,createArticleDto:CreateArticleDto){

    return await this.articleModel.findByIdAndUpdate(_id,createArticleDto).exec();
}

async delete(_id:string){
    const deletedBook= await this.articleModel.findByIdAndDelete(_id).exec();
    return deletedBook;
}




}