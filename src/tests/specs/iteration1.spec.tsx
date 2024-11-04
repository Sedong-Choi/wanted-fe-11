import {  screen } from '@testing-library/react';
import { describe, test, expect} from 'vitest';
import { renderWithProviders } from 'tests/renderWithProviders';
import { userEvent } from '@testing-library/user-event';

describe('init test', () => {

    test('App render test', async () => {
        renderWithProviders();

        await screen.findByText(/App main/);

        expect(screen.getByText(/App main/)).toBeInTheDocument();
    });

});

describe('routing test', () => {

    test('Navigate To "Login" page', async () => {
        renderWithProviders();
        await screen.findByText(/App main/);

        const loginButton = await screen.findByText(/Login page/);

        const user = userEvent.setup();

        await user.click(loginButton);
        await screen.findByText(/Login Todo/);
        expect(screen.getByText(/Login Todo/)).toBeInTheDocument();
    });

    test('navigate to "Sign up" page', async () => {
        renderWithProviders();
        await screen.findByText(/App main/);

        const signUpBotton = await screen.findByText(/Sign Up page/);

        const user = userEvent.setup();

        await user.click(signUpBotton);
        expect(screen.getByText(/Sign Up Todo/)).toBeInTheDocument();
    });
})