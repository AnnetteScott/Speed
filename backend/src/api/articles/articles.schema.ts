import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
@Schema()
export class Article {
	@Prop()
	_id: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	doi: string;

	@Prop()
	authors: string[];

	// This is the journal name, publisher, site name, etc.
	@Prop()
	source: string;

	@Prop()
	pages: string;

	@Prop()
	pubYear: number;

	@Prop()
	claim: string[];

	@Prop()
	evidence: string;

	@Prop({ required: true, default: false })
	moderated: boolean;

	@Prop({ required: true, default: false })
	analysed: boolean;

	@Prop({ required: true, default: false })
	approved: boolean;

}
export const ArticleSchema = SchemaFactory.createForClass(Article);
