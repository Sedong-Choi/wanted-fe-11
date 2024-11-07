import { useAuth } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Logout = () => {
    const { logout, isLogin } = useAuth();
    const { setMessage } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            logout();
            setMessage('로그아웃 되었습니다.');
            navigate('/');
        }
    }, [isLogin, logout, navigate, setMessage]);
    return <></>;
}