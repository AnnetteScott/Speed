import { Injectable } from '@nestjs/common';
import { Article } from './articles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ArticleDTO from './article.dto';
@Injectable()
export class ArticleService {
	constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

	async findAll(): Promise<Article[]> {
		return await this.articleModel.find().exec();
	}

	async findOne(doi: string): Promise<Article> {
		return await this.articleModel.findOne({doi: doi}).exec();
	}

	async create(articleDTO: ArticleDTO) {
		return await this.articleModel.create(articleDTO);
	}

	async update(doi: string, articleDTO: ArticleDTO) {
		const article = await this.articleModel.findOne({doi: doi}).exec();
		return await this.articleModel.findByIdAndUpdate(article._id, articleDTO).exec();
	}

	async delete(doi: string) {
		const article = await this.articleModel.findOne({doi: doi}).exec();
		const deletedArticle = await this.articleModel.findByIdAndDelete(article._id).exec();
		return deletedArticle;
	}

	//Checks if an Article is rejected by providing doi
	async rejected(doi:string): Promise <Article>{
		const rejectedArticle=await this.articleModel.findOne({doi:doi}).exec();

		return rejectedArticle;
		
	}
}
