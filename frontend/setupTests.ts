import '@testing-library/jest-dom';

//mocking the router for navigation (next/navigation), this will be used almost everywhere in the tests
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    }),
  }));