import { Body, Controller, Delete, Get, 
	HttpException, HttpStatus, Param, Post, Put, Patch, NotFoundException
} from '@nestjs/common';
import { ArticleService } from './article.service';
import ArticleDTO from './article.dto';
import { error } from 'console';
import { retry } from 'rxjs';
  
@Controller('api/articles')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	// Get all Articles
	@Get('/')
	async findAll() {
		try {
			return this.articleService.findAll();
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No Articles found'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}

	// Get all Articles
	@Get('/pending')
	async getPending() {
		try {
			return this.articleService.getPending();
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No Articles found'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}

	// Get one article via doi
	@Get('/:doi')
	async findOne(@Param('doi') doi: string) {
		try {
			return this.articleService.findOne(doi);
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No Article found'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}

	// Add an article
	@Post('/')
	async addArticle(@Body() articleDTO: ArticleDTO) {
		try {
			await this.articleService.create(articleDTO);
			return { message: 'Article added successfully' };
		} catch {
			throw new HttpException(
				{ status: HttpStatus.BAD_REQUEST, error: 'Unable to add this Article'},
				HttpStatus.BAD_REQUEST,
				{ cause: error },
			);
		}
	}

	// Update an Article
	@Put('/:doi')
	async updateArticle(@Param('doi') doi: string, @Body() articleDTO: ArticleDTO) {
		try {
			await this.articleService.update(doi, articleDTO);
			return { message: 'Article updated successfully' };
		} catch {
			throw new HttpException(
				{status: HttpStatus.BAD_REQUEST, error: 'Unable to update this Article'},
				HttpStatus.BAD_REQUEST,
				{ cause: error },
			);
		}
	}

	// Delete an Article via doi
	@Delete('/:id')
	async deleteArticle(@Param('id') id: string) {
		try {
			return await await this.articleService.delete(id);
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No such a article'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}

	@Patch('/approvedByModerator/:id')
    async approveArticle(@Param('id') id: string) {
        try {
            return await this.articleService.moderatorApproved(id);
        } catch (error) {
            throw new NotFoundException(`Could not approve article with ID ${id}: ${error.message}`);
        }
    }

	@Patch('/reject/:id')
    async rejectArticle(@Param('id') id: string) {
        try {
            return await this.articleService.rejectArticle(id);
        } catch (error) {
            throw new NotFoundException(`Could not approve article with ID ${id}: ${error.message}`);
        }
    }

	@Get('/claims/:seMethod')
    async getClaims(@Param('seMethod') seMethod: string) {
        try {
            return await this.articleService.getClaimsByMethod(seMethod);
        } catch (error) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Invalid SE Method' },
                HttpStatus.BAD_REQUEST,
                { cause: error }
            );
        }
}
@Get('/methods')
async getMethods(){
	console.log("hello");
	try{
		return await this.articleService.getMethods();
	}catch(error){
		throw new HttpException(
			{ status: HttpStatus.BAD_REQUEST, error: 'Invalid SE Method' },
			HttpStatus.BAD_REQUEST,
			{ cause: error }
		);
	}
}

}