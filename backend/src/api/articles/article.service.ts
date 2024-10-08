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

	async delete(id: string) {
		const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
		return deletedArticle;
	}

	async getPending(): Promise<Article[]> {
        return await this.articleModel.find({moderated: false}).exec();
    }

	async moderatorApproved(id: string): Promise<Article> {
        const article = await this.articleModel.findById(id);

        article.moderated = true;
        await article.save();
        return article;
    }

	async rejectArticle(id: string): Promise<Article> {
        const article = await this.articleModel.findById(id);

        article.moderated = true;
        article.rejected = true;
        await article.save();
        return article;
    }
	
}
