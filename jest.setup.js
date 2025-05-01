import '@testing-library/jest-dom';

// Mock di next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  useServerInsertedHTML: jest.fn(),
}));

// Mock per nextAuth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { user: { name: 'Test User' } },
    status: 'authenticated',
  })),
}));

// Polyfill for globals not available in jsdom
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Polyfill for Headers in test environment if needed
if (typeof Headers === 'undefined') {
  global.Headers = class {
    constructor() {
      return {};
    }
  };
}