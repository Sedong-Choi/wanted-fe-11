import { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { SignUpPage } from "../pages/SignUp";
import { Main } from "pages/Main";
import { Layout } from "pages/Layout";
import { Logout } from "pages/Logout";
import { Todos } from "pages/Todos";
type NavName = string;
export type CustomRouteObject = RouteObject & {
    protect?: boolean;
    name?: NavName
    children?: CustomRouteObject[]
}

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
                path: "/todos",
                name: "Todos",
                protect: true,
                element: <Todos />
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

                    },
                    {
                        path: 'logout',
                        name: 'Logout',
                        protect: true,
                        element: <Logout />
                    }
                ]
            },
        ]
    }
];
