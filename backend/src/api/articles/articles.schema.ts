import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
@Schema()
export class Article {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	doi: string;

	@Prop()
	authors: string;

	// This is the journal name, publisher, site name, etc.
	@Prop()
	source: string;

	@Prop()
	pages: string;

	@Prop()
	pubYear: number;

	@Prop()
	volume: number;

	@Prop()
	number: number;

	@Prop()
	claims: string[];

	@Prop()
	method: string;

	@Prop()
	ratings: number[];

	@Prop({ required: true, default: false })
	moderated: boolean;

	@Prop({ required: true, default: false })
	analysed: boolean;

	@Prop({ required: true, default: false })
	rejected: boolean;

	@Prop({ required: true, default: false })
	approved: boolean;

}
export const ArticleSchema = SchemaFactory.createForClass(Article);
