import { createBrowserRouter, RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { SignUpPage } from "../pages/SignUp";
import { Main } from "pages/Main";
import { Layout } from "pages/Layout";
type NavName = string;
export type RouteChildren = RouteObject & {
    name?: NavName
    children?: Record<NavName, RouteChildren>[]
}
type CustomRouteObject = RouteObject & RouteChildren;

export const routerConfig: CustomRouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                name: "Main",
                element: <Main />,
            },
            {
                path: "/auth",
                children: [
                    {
                        path: 'login',
                        name: "Login",
                        element: <LoginPage />,
                    },
                    {
                        path: "signup",
                        name: "Sign Up",
                        element: <SignUpPage />,
                    }
                ]
            },]
    }
];
export const router = createBrowserRouter(routerConfig);
