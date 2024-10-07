type ClaimMapping = {
    method: string;   // SE Method name
    claims: string[]; // List of claims associated with the method
};

export default class ArticleDTO {
    title: string;
    doi: string;
    authors: string;
    source: string;
    pages: string;
    volume: number;
    number: number;
    pubYear: number;
    claimsByMethod: ClaimMapping[]; // Updated to hold claims by SE method
    evidence: string;
    moderated: boolean;
    rejected: boolean;
    analysed: boolean;
    approved: boolean;
    ratings: number[];
    seMethod: string;

    constructor() {
        // Initialize defaults if needed
        this.claimsByMethod = [];
    }
}