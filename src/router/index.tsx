import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { SignUpPage } from "../pages/SignUp";
import { Main } from "pages/Main";

export const routerConfig = [
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/auth",
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignUpPage />,
            }
        ]
    },
];
export const router = createBrowserRouter(routerConfig);
