import { NavigationBar } from "components/NavigationBar"
import { useAuth } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router"

export const Layout = () => {
    const navigate = useNavigate();

    const { error } = useAuth();
    const { setMessage } = useSnackbar();

    useEffect(() => {
        if (error) {
            setMessage(error);
            navigate('/auth/login');
        }
    }, [error, setMessage, navigate]);

    return <>
        <NavigationBar />
        <Suspense fallback={<>Loading...</>}>
            <Outlet />
        </Suspense>
    </>
}