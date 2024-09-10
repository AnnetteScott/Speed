import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './articles.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
	controllers: [ArticleController],
	providers: [ArticleService]
})
export class ArticleModule {}
