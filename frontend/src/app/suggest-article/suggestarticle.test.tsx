import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SuggestArticle from './page';
import { parseBibtex } from '../../utils/bibtexParser';

jest.mock('../../utils/bibtexParser');

describe('SuggestArticle Component', () => {
  let fileReaderMock: any;

  beforeAll(() => {
    fileReaderMock = {
      readAsText: jest.fn(),
      onload: null,
      result: '@article{sample, title={Sample Title}, doi={10.1000/xyz123}, author={John Doe, Jane Doe}, journal={Sample Journal}, year={2022}, volume={5}, number={2}, pages={12-34}}',
    };

    global.FileReader = jest.fn(() => fileReaderMock) as unknown as typeof FileReader;
  });

  test('should parse BibTeX file correctly', async () => {
    const mockParsedData = {
      title: 'Sample Title',
      doi: '10.1000/xyz123',
      authors: 'John Doe, Jane Doe',
      source: 'Sample Journal',
      pages: '12-34',
      volume: '5',
      number: '2',
      pubYear: '2022',
    };

    (parseBibtex as jest.Mock).mockReturnValue(mockParsedData);

    render(<SuggestArticle />);

    const bibFile = new Blob([`@article{sample, title={Sample Title}, doi={10.1000/xyz123}, author={John Doe, Jane Doe}, journal={Sample Journal}, year={2022}, volume={5}, number={2}, pages={12-34}}`], { type: 'application/x-bibtex' });

    const fileInput = screen.getByLabelText(/Upload BibTeX File/i);
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [new File([bibFile], 'sample.bib')] } });
      fileReaderMock.onload({
        target: {
          result: fileReaderMock.result,
        },
      });
    });
    expect(fileReaderMock.readAsText).toHaveBeenCalledWith(expect.any(File));
    expect(parseBibtex).toHaveBeenCalledWith(fileReaderMock.result);
    expect(screen.getByDisplayValue('Sample Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10.1000/xyz123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe, Jane Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sample Journal')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12-34')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2022')).toBeInTheDocument();
  });
});
