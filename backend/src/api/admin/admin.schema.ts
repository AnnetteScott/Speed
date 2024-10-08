import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
	@Prop({ required: true })
	methods: string[];
}

export const UserSchema = SchemaFactory.createForClass(Admin);
