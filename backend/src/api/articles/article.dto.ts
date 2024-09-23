export default class ArticleDTO {
	title: string;
	doi: string;
	authors: string;
	source: string;
	pages: string;
	volume: number;
	number: number;
	pubYear: number;
	claim: string[];
	evidence: string;
	moderated: boolean;
	analysed: boolean;
	approved: boolean;
	rejected:boolean;
	ratings: string[]
}