import fetchMock from 'jest-fetch-mock';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page'; // Adjust the path if needed
import '@testing-library/jest-dom/extend-expect';

describe('Column Visibility Toggle in Articles Table', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mocks before each test
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          title: 'Sample Article 1',
          doi: '10.1000/182',
          authors: 'John Doe',
          source: 'Science Journal',
          pages: '1-10',
          pubYear: 2020,
          volume: '12',
          number: '3',
          claims: ['Claim 1'],
          ratings: [5],
          approved: true,
        },
      ])
    );
  });

  test('all columns are shown by default', async () => {
    render(<Home />);

    // Wait for the articles to load
    const titleHeader = await screen.findByText('Title');
    const doiHeader = await screen.findByText('DOI');
    const authorsHeader = await screen.findByText('Authors');
    const sourceHeader = await screen.findByText('Source');
    const yearHeader = await screen.findByText('Year');

    expect(titleHeader).toBeInTheDocument();
    expect(doiHeader).toBeInTheDocument();
    expect(authorsHeader).toBeInTheDocument();
    expect(sourceHeader).toBeInTheDocument();
    expect(yearHeader).toBeInTheDocument();
  });
});
