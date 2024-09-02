/* eslint-disable prettier/prettier */
import {Date} from 'mongoose';

export class CreateArticleDto{
_id:string;
title:string;
author:string;
published_date:Date;
publisher:string;
volume:string;

submitted:number;
moderated:number;
analyzed:number;
approved:number;
rejected:number;


updated_date:Date;





}