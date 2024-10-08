import { Body, Controller, Delete, Get, 
	HttpException, HttpStatus, Param, Post, Put 
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDTO } from './admin.dto';
import { error } from 'console';
  
@Controller('api/admin')
export class AdminController {
	constructor(private readonly userService: AdminService) {}

	// Get admin doc
	@Get('/')
	async findAll() {
		try {
			return this.userService.findAll();
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No Users found'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}
}