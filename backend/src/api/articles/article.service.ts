import { Injectable, NotFoundException } from '@nestjs/common';
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
		const rejectedArticle=await this.articleModel.findOne({doi:doi,rejected:true}).exec();

		if (!rejectedArticle) {
			throw new NotFoundException('No such article');
		
		  }

		return rejectedArticle;
		
	}

	//Rate an Article from 1-5 stars giving the doi of the article
	async rating(doi:string,rate:string){

		const ratingNumber=parseInt(rate,10);

		if (ratingNumber>=1 && ratingNumber <=5){

			const article= await this.articleModel.findOne({doi:doi,approved:true}).exec();

			if (article){
				article.ratings.push(rate);
				await article.save();
			}
			else{
				 throw new NotFoundException('No such article');
			}
		}
		else{
			return alert("Rating must be a number between 1 and 5.");
		}
	}

	//Get Articles between two given years (inclusive)

	async yearFiltering(fromYear: number,toYear:number): Promise <Article[]>{
		const filteredArticles=await this.articleModel.find({
			pubYear:{$gte:fromYear,$lte:toYear}
		}).exec();
		if (filteredArticles){
			return(filteredArticles);
		}
		else{
			throw new NotFoundException('No such articles');
		}

		
	}
}
