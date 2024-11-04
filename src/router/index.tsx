import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    }
]);
