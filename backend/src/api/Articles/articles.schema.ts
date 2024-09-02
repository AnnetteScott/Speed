/* eslint-disable prettier/prettier */
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

import { Date, HydratedDocument } from 'mongoose';


export type ArticleDocumnet = HydratedDocument<Article>;

@Schema()
export class Article{

    @Prop({
        type: String,
        required: true,
        unique: true,
        match: /^(http:\/\/|https:\/\/)[a-fA-F0-9]{24}$/, // Regex pattern to start with http:// or https://
      })
      _id:string;

    @Prop({required: true})
    title:string;

    @Prop({required:true})
    author:string;

    @Prop({type:Date})
    published_date:Date;

    @Prop()
    publisher:string;
    
    @Prop()
    volume:string;

    @Prop({required:true,enum:[0,1]})
    submitted:number;

    @Prop({required:true,enum:[0,1]})

    moderated:number;

    @Prop({required:true,enum:[0,1]})
    analyzed:number;

    @Prop({required:true,enum:[0,1]})
    approved:number;

    @Prop({required:true,enum:[0,1]})
    rejected:number;

    @Prop({type:DataView,default:Date.now})
    updated_date:Date;

    }
    export const ArticleSchema=SchemaFactory.createForClass(Article);