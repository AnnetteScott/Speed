import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, UserSchema } from './admin.schema';
import { AdminService } from './admin.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Admin.name, schema: UserSchema }]),
	],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
