import { render, screen, fireEvent } from '@testing-library/react';
import ModeratorPage from '../page';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Mock articles data
const mockArticles = [
  {
    _id: 'article1',
    title: 'Article 1',
    doi: '10.1000/xyz123',
    authors: 'Author 1',
    source: 'Source 1',
    pages: '1-10',
    pubYear: '2024',
    volume: '12',
    number: '3',
    note: '',
    rejected: false,
  },
  {
    _id: 'article2',
    title: 'Article 2',
    doi: '10.1000/xyz456',
    authors: 'Author 2',
    source: 'Source 2',
    pages: '11-20',
    pubYear: '2023',
    volume: '5',
    number: '1',
    note: '',
    rejected: false,
  },
];

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('ModeratorPage', () => {
  it('should approve an article when "Approve" button is clicked', async () => {
    // Mock the fetch response for fetching articles
    fetchMock.mockResponses(
      [JSON.stringify(mockArticles), { status: 200 }],
      ['', { status: 200 }] // Mock for approve call
    );

    render(<ModeratorPage />);

    // Wait for articles to be loaded and rendered
    const article1 = await screen.findByText('Article 1');
    expect(article1).toBeInTheDocument();

    // Click the "Approve" button for the first article
    const approveButton = screen.getAllByText('Approve')[0];
    fireEvent.click(approveButton);

    // Ensure the approve API call was made with the correct ID
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/approvedByModerator/article1`,
      expect.objectContaining({
        method: 'PATCH',
      })
    );
  });

  it('should reject an article when "Reject" button is clicked', async () => {
    // Mock the fetch response for fetching articles
    fetchMock.mockResponses(
      [JSON.stringify(mockArticles), { status: 200 }],
      ['', { status: 200 }] // Mock for reject call
    );

    render(<ModeratorPage />);

    // Wait for articles to be loaded and rendered
    const article2 = await screen.findByText('Article 2');
    expect(article2).toBeInTheDocument();

    // Click the "Reject" button for the second article
    const rejectButton = screen.getAllByText('Reject')[1];
    fireEvent.click(rejectButton);

    // Ensure the reject API call was made with the correct ID
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/reject/article2`,
      expect.objectContaining({
        method: 'PATCH',
      })
    );
  });
});
