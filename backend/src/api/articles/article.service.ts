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
		return await this.articleModel.findById(doi).exec();
	}

	async create(articleDTO: ArticleDTO) {
		return await this.articleModel.create(articleDTO);
	}

	async update(doi: string, articleDTO: ArticleDTO) {
		return await this.articleModel.findByIdAndUpdate(doi, articleDTO).exec();
	}

	async delete(id: string) {
		const deletedBook = await this.articleModel.findByIdAndDelete(id).exec();
		return deletedBook;
	}
}
