import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { renderWithProviders } from 'tests/renderWithProviders';
import { userEvent } from '@testing-library/user-event';
import { SignUpPage } from 'pages/SignUp';

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
});


describe('Sign Up Form validate', () => {
    // just render component
    // Providers does not necessary on Sign up form test
    test('email validate', async () => {
        render(<SignUpPage />);

        await screen.findByText(/Sign Up Todo/);

        const idInput = screen.getByRole('textbox', { name: 'Id' });
        await userEvent.type(idInput, 't');
        await screen.findByText('Please enter email');
        expect(screen.getByText(/Please enter email/)).toBeInTheDocument();

        await userEvent.type(idInput, 'test@test.ts');
        const emailError = screen.queryByText(/Please enter email/);
        expect(emailError).toBeNull();
    });

    test('password validate', async () => {
        render(<SignUpPage />);

        await screen.findByText(/Sign Up Todo/);

        const passwordInput = screen.getByLabelText('Password');
        await userEvent.type(passwordInput, '1234');
        await screen.findByText(/Password must more than 8 charactor/);
        expect(screen.getByText(/Password must more than 8 charactor/)).toBeInTheDocument();

        await userEvent.type(passwordInput, '12341234');
        const passwordError = screen.queryByText(/Password must more than 8 charactor/);
        expect(passwordError).toBeNull();
    });

    test('password confirm validate', async () => {
        render(<SignUpPage />);

        await screen.findByText(/Sign Up Todo/);

        const passwordInput = screen.getByLabelText('Password');
        await userEvent.type(passwordInput, '1234');
        await screen.findByText(/Password must more than 8 charactor/);
        expect(screen.getByText(/Password must more than 8 charactor/)).toBeInTheDocument();

        await userEvent.type(passwordInput, '1234');
        const passwordError = screen.queryByText(/Password must more than 8 charactor/);
        expect(passwordError).toBeNull();

        const confirmInput: HTMLInputElement = screen.getByLabelText(/Password Confirm/);
        await userEvent.type(confirmInput, '1234');
        await screen.findByText(/Passwords do not match/);
        expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();


        await userEvent.type(confirmInput, '12345');
        await screen.findByText(/Passwords do not match/);
        expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();

        confirmInput.setSelectionRange(7, 8)
        await userEvent.type(confirmInput, '{backspace}');
        const confirmError = screen.queryByText(/Passwords do not match/);
        expect(confirmError).toBeNull();
    });

    test('Change "Sign Up" disabled', async () => {
        render(<SignUpPage />);

        await screen.findByText(/Sign Up Todo/);

        const singupButton = screen.getByRole('button', { name: "Sign Up" });
        expect(singupButton).toBeDisabled();

        const idInput = screen.getByLabelText('Id');
        await userEvent.type(idInput, 'test@test.ts');

        const passwordInput = screen.getByLabelText('Password');
        await userEvent.type(passwordInput, 'testpass');
        const passwordError = screen.queryByText(/Password must more than 8 charactor/);
        expect(passwordError).toBeNull();

        const confirmInput: HTMLInputElement = screen.getByLabelText(/Password Confirm/);
        await userEvent.type(confirmInput, 'testpass');
        const confirmError = screen.queryByText(/Passwords do not match/);
        expect(confirmError).toBeNull();

        expect(singupButton).not.toBeDisabled();
    });
});