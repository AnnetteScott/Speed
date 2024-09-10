export default class ArticleDTO {
	title: string;
	doi: string;
	authors: string[];
	source: string;
	pages: string;
	pubYear: number;
	claim: string[];
	evidence: string;
	moderated: boolean;
	analysed: boolean;
	approved: boolean;
}