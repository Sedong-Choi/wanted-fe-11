import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { cleanup, configure, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom';
import { clearCache } from './TestProviders';
import { mockServer } from './mocks/mockServer';
// import { mockAPI } from './mocks/mockAPI';

configure({
  getElementError: (message: string | null, container) => {
    const error = new Error();

    if (message && message.includes('<body>')) {
      error.message = message;
    } else {
      const prettifiedDOM = prettyDOM(container);
      error.message = `${message}\n\n${prettifiedDOM}`;
    }

    error.name = 'TestingLibraryElementError';
    return error;
  },
});

beforeAll(() => {
  mockServer.listen();
});

beforeEach(() => {
});

afterEach(() => {
  clearCache();
  cleanup();
});

afterAll(() => {

});
