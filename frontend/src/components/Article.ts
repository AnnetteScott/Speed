export type Article = {
	title: string;
	doi: string;
	source: string;
	pages: string;
	pubYear: number;
	authors: string;
	volume: number;
	number: number;
	
	claim: string[];
	evidence: string;
	moderated: boolean;
	analysed: boolean;
	approved: boolean;
	rejected: boolean;
	ratings: number[];
};

export const DefaultEmptyArticle: Article = {
	title: "",
	doi: "",
	authors: "",
	source:  "",
	pages: "",
	volume: 0,
	number: 0,
	pubYear: 0,
	claim: [],
	evidence: "",
	moderated: false,
	rejected: false,
	analysed: false,
	approved: false,
	ratings: []
}