import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import App from "../App";
import { SignUpPage } from "../pages/SignUp";

export const routerConfig = [
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/auth/login",
        element: <LoginPage/>,
    },
    {
        path: "/auth/signup",
        element: <SignUpPage/>,
    }
];
export const router = createBrowserRouter(routerConfig);
