import { render, screen } from '@testing-library/react';
import NavBar from '../navBar';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

// Mock the `useRouter` hook from Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockModeratorUser = {
  _id: '123',
  username: 'moderatorUser',
  role: 'Moderator',
};

beforeEach(() => {
  // Mock localStorage for authentication
  (window.localStorage.getItem as jest.Mock) = jest.fn(() =>
    JSON.stringify(mockModeratorUser)
  );
});

describe('NavBar Component', () => {
  it('should show the Moderator link if user role is Moderator', () => {
    // Mock useRouter to avoid the app router error
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(), // Mock any router functions you may use
    });

    render(<NavBar />);

    const moderatorLink = screen.getByText('Moderate');
    expect(moderatorLink).toBeInTheDocument();
  });
});
