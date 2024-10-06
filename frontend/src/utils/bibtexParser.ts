// utils/bibtexParser.ts

export function parseBibtex(bibtexContent: string) {
    // Assuming you parse BibTeX content and return the relevant details
    // You can use a library like `bibtex-parse-js` for this
  
    const bibtexParser = require('bibtex-parse-js');
    const parsed = bibtexParser.toJSON(bibtexContent);
  
    if (parsed && parsed.length > 0) {
      const entry = parsed[0].entryTags;
      return {
        title: entry.title || '',
        doi: entry.doi || '',
        authors: entry.author || '',
        source: entry.journal || '',
        pages: entry.pages || '',
        volume: entry.volume || '',
        number: entry.number || '',
        pubYear: entry.year || '',
      };
    }
  
    return {
      title: '',
      doi: '',
      authors: '',
      source: '',
      pages: '',
      volume: '',
      number: '',
      pubYear: '',
    };
  }
  