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
	rejected: boolean;
	analysed: boolean;
	approved: boolean;
	ratings: number[]
}