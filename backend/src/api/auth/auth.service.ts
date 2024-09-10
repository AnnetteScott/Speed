import { Injectable } from '@nestjs/common';
import { User } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './auth.dto';

@Injectable()
export class UserService {
  	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async findAll(): Promise<User[]> {
		return await this.userModel.find().exec();
	}

	async findOne(id: string): Promise<User> {
		return await this.userModel.findById(id).exec();
	}

	async findByUsername(username: string): Promise<User> {      
		return await this.userModel.findOne({username: username}).exec();
	}

	async loginUser(username: string, password: string): Promise<User> {
		return await this.userModel.findOne({username: username, password: password}).exec();
	}

	async create(createUserDto: UserDTO) {
		return await this.userModel.create(createUserDto);
	}

	async update(id: string, createUserDto: UserDTO) {
		return await this.userModel.findByIdAndUpdate(id, createUserDto).exec();
	}

	async delete(id: string) {
		const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
		return deletedUser;
	}
}
