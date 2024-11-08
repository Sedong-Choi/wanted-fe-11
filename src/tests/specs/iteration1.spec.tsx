import { renderHook, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { renderWithProviders } from 'tests/renderWithProviders';
import { userEvent } from '@testing-library/user-event';


import { mockServer } from 'tests/mocks/mockServer';
import { mockAPI } from 'tests/mocks/mockAPI';
import { useQueryClient } from '@tanstack/react-query';
import { TestProviders } from 'tests/TestProviders';




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

        const loginButton = await screen.findByText(/Login/);

        const user = userEvent.setup();

        await user.click(loginButton);
        await screen.findByText(/Login Todo/);
        expect(screen.getByText(/Login Todo/)).toBeInTheDocument();
    });

    test('navigate to "Sign up" page', async () => {
        renderWithProviders();
        await screen.findByText(/App main/);

        const signUpBotton = await screen.findByText(/Sign Up/);

        const user = userEvent.setup();

        await user.click(signUpBotton);
        expect(screen.getByText(/Sign Up Todo/)).toBeInTheDocument();
    });
});


describe('Sign Up Form validate', () => {
    beforeEach(async () => {
        renderWithProviders();
        const user = userEvent.setup();
        const signUpBotton = await screen.findByText(/Sign Up/);
        await user.click(signUpBotton);

        await screen.findByText(/Sign Up Todo/);
    });
    // just render component
    // Providers does not necessary on Sign up form test
    test('email validate', async () => {

        const idInput = screen.getByRole('textbox', { name: 'Id' });
        await userEvent.type(idInput, 't');
        await screen.findByText('Please enter email');
        expect(screen.getByText(/Please enter email/)).toBeInTheDocument();

        await userEvent.type(idInput, 'test@test.ts');
        const emailError = screen.queryByText(/Please enter email/);
        expect(emailError).toBeNull();
    });

    test('password validate', async () => {

        const passwordInput = screen.getByLabelText('Password');
        await userEvent.type(passwordInput, '1234');
        await screen.findByText(/Password must more than 8 charactor/);
        expect(screen.getByText(/Password must more than 8 charactor/)).toBeInTheDocument();

        await userEvent.type(passwordInput, '12341234');
        const passwordError = screen.queryByText(/Password must more than 8 charactor/);
        expect(passwordError).toBeNull();
    });

    test('password confirm validate', async () => {

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

describe('Sign up with server', () => {
    mockServer.use(
        mockAPI.post('http://localhost:8080/users/create', {
            token: 'test_token', message: '계정이 성공적으로 생성되었습니다'
        })
    );

    test('navigate to "/auth/signup",create user "test@test.ts" and redirect', async () => {
        // renderWithProviders 사용안함
        const { result } = renderHook(() => useQueryClient(), { wrapper: TestProviders });

        const signUpBotton = await screen.findByText(/Sign Up/);

        const user = userEvent.setup();

        await user.click(signUpBotton);
        expect(screen.getByText(/Sign Up Todo/)).toBeInTheDocument();

        const idInput = screen.getByRole('textbox', { name: 'Id' });
        await userEvent.type(idInput, 'test@test.ts');
        const emailError = screen.queryByText(/Please enter email/);
        expect(emailError).toBeNull();

        const passwordInput = screen.getByLabelText('Password');
        await userEvent.type(passwordInput, '12341234');
        const passwordError = screen.queryByText(/Password must more than 8 charactor/);
        expect(passwordError).toBeNull();

        const confirmInput = screen.getByLabelText(/Password Confirm/);
        await userEvent.type(confirmInput, '12341234');
        const confirmError = screen.queryByText(/Passwords do not match/);
        expect(confirmError).toBeNull();

        const singupButton = screen.getByRole('button', { name: "Sign Up" });
        expect(singupButton).not.toBeDisabled();

        await user.click(singupButton);

        const token = result.current.getQueryData(['userToken']);
        expect(token).not.toBeNull();


        await screen.findByText(/계정이 성공적으로 생성되었습니다/);
        expect(screen.getByText(/계정이 성공적으로 생성되었습니다/)).toBeInTheDocument();


        await screen.findByText(/App main/);
        expect(screen.getByText(/App main/)).toBeInTheDocument();
    });
});

describe('Login', () => {
    beforeEach( ()=>{
        mockServer.use(
            mockAPI.post('http://localhost:8080/users/login', {
                token: 'test_token', message: '성공적으로 로그인 했습니다'
            })
        );
    })
    test('Basic login test', async () => {
        const { result } = renderHook(() => useQueryClient(), { wrapper: TestProviders });

        const navLoginBotton = await screen.findByText(/Login/);

        const user = userEvent.setup();
        // main page to login page
        await user.click(navLoginBotton);
        expect(screen.getByText(/Login Todo/)).toBeInTheDocument();

        const userEmail = 'test@test.ts';
        // fill user data
        const idInput = screen.getByRole('textbox', { name: 'Id' });
        await userEvent.type(idInput, userEmail);


        const passwordInput = screen.getByLabelText('Password');
        await userEvent.type(passwordInput, '12341234');

        const loginButton = await screen.findByRole('button', { name: "Login" });
        expect(loginButton).toBeEnabled();

        await user.click(loginButton);
        await screen.findByText('성공적으로 로그인 했습니다');
        await screen.findByText(/App main/);
        expect(screen.getByText(/App main/)).toBeInTheDocument();

        //check token
        const queryClient = result.current;
        const token = queryClient.getQueryData(['userData', userEmail]);
        expect(token === 'test_token').toBe(true);
    });

    test('Login with localStorage token', async () => {
        const { result } = renderHook(() => useQueryClient(), { wrapper: TestProviders });

        const userEmail = 'test@test.ts';
        const tokenValue = 'local_token';
        // setting token
        const queryClient = result.current;

        queryClient.setQueryData(['userData', userEmail], tokenValue);

        // main to login page
        const navLoginBotton = await screen.findByText(/Login/);

        const user = userEvent.setup();
        // main page to login page
        await user.click(navLoginBotton);
        expect(screen.getByText(/Login Todo/)).toBeInTheDocument();

        // fill user data
        const idInput = screen.getByRole('textbox', { name: 'Id' });
        await userEvent.type(idInput, userEmail);
        const passwordInput = screen.getByLabelText('Password');
        await userEvent.type(passwordInput, '12341234');

        const loginButton = await screen.findByRole('button', { name: "Login" });
        expect(loginButton).toBeEnabled();

        // check user token logic
        // Login API not called
        await user.click(loginButton);
        const token = queryClient.getQueryData(['userData', userEmail]);
        expect(token === tokenValue).toBe(true);
        
        await screen.findByText('성공적으로 로그인 했습니다');
        await screen.findByText(/App main/);
        expect(screen.getByText(/App main/)).toBeInTheDocument();
    });
});