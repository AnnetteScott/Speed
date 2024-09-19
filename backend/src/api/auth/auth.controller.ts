import { Body, Controller, Delete, Get, 
	HttpException, HttpStatus, Param, Post, Put 
} from '@nestjs/common';
import { UserService } from './auth.service';
import { UserDTO } from './auth.dto';
import { error } from 'console';
  
@Controller('api/auth')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// Get all users
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

	// Get one user via id
	@Get('/:id')
	async findOne(@Param('id') id: string) {
		try {
			return this.userService.findOne(id);
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No User found'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}


	// Get one user via id
	@Get('/login/:username/:password')
	async login(@Param('username') username: string, @Param('password') password: string) {
		try {
			return this.userService.loginUser(username, password);
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No User found'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}

	// Add a user
	@Post('/')
	async addUser(@Body() userDTO: UserDTO) {
		try {
			await this.userService.create(userDTO);
			return { message: 'User added successfully' };
		} catch {
			throw new HttpException(
				{ status: HttpStatus.BAD_REQUEST, error: 'Unable to add this User'},
				HttpStatus.BAD_REQUEST,
				{ cause: error },
			);
		}
	}

	// Update a user
	@Put('/:id')
	async updateUser(@Param('id') id: string, @Body() userDTO: UserDTO) {
		try {
			await this.userService.update(id, userDTO);
			return { message: 'User updated successfully' };
		} catch {
			throw new HttpException(
				{status: HttpStatus.BAD_REQUEST, error: 'Unable to update this User'},
				HttpStatus.BAD_REQUEST,
				{ cause: error },
			);
		}
	}

	// Delete a user via id
	@Delete('/:id')
	async deleteUser(@Param('id') id: string) {
		try {
			return await await this.userService.delete(id);
		} catch {
			throw new HttpException(
				{status: HttpStatus.NOT_FOUND, error: 'No such a book'},
				HttpStatus.NOT_FOUND,
				{ cause: error },
			);
		}
	}
}