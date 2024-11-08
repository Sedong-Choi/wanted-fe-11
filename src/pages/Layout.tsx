import { NavigationBar } from "components/NavigationBar"
import { useAuth } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router"
import { routerConfig } from 'router';
import { findRouter } from "helper";
export const Layout = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const { error, isLogin } = useAuth();
    const { setMessage } = useSnackbar();

    useEffect(() => {
        if (error) {
            setMessage(error);
            navigate('/auth/login');
        }
    }, [error, setMessage, navigate]);

    useEffect(() => {
        const target = findRouter(location.pathname, routerConfig);
        if (!isLogin && target.protect === true) {
            navigate('/auth/login');
        }
    }, [isLogin, location, navigate]);


    return <>
        <NavigationBar />
        <Outlet />
    </>
}