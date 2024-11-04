import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { renderWithProviders } from 'tests/renderWithProviders';
import App from 'App';


describe('init test', () => {

    test('App render test', async () => {
        renderWithProviders(
            <App />
        );
        await screen.findByText(/App main/);
        expect(screen.getByText(/App main/)).toBeInTheDocument();
    });
});