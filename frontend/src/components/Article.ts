export type Article = {
	_id?: string;
	title: string;
	doi: string;
	source: string;
	pages: string;
	pubYear: number;
	authors: string;
	volume: number;
	number: number;
	
	claims: string[];
	method: string;
	moderated: boolean;
	analysed: boolean;
	approved: boolean;
	rejected: boolean;
	ratings: number[];
};

export const DefaultEmptyArticle: Article = {
	_id: undefined,
	title: "",
	doi: "",
	authors: "",
	source:  "",
	pages: "",
	volume: 0,
	number: 0,
	pubYear: 0,
	claims: [],
	method: "",
	moderated: false,
	rejected: false,
	analysed: false,
	approved: false,
	ratings: []
}