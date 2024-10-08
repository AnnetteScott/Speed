import { Injectable } from '@nestjs/common';
import { Admin } from './admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDTO } from './admin.dto';

@Injectable()
export class AdminService {
  	constructor(@InjectModel(Admin.name) private userModel: Model<Admin>) {}

	async findAll(): Promise<Admin[]> {
		return await this.userModel.find().exec();
	}
}
