import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { ArticleModule } from './api/articles/article.module'
import { AuthModule } from './api/auth/auth.module'

@Module({
	imports: [ConfigModule.forRoot(), 
		MongooseModule.forRoot(process.env.DB_URI), ArticleModule, AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
	
