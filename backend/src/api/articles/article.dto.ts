export default class ArticleDTO {
	title: string;
	doi: string;
	authors: string;
	source: string;
	pages: string;
	volume: number;
	number: number;
	pubYear: number;
	claims: string[];
	method: string;
	moderated: boolean;
	rejected: boolean;
	analysed: boolean;
	approved: boolean;
	ratings: number[]
}