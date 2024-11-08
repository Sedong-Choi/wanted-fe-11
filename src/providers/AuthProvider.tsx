
import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { useSnackbar } from "./SnackbarProvider";

type AuthState = {
    error: string,
    setError: (message: string) => void;
    isLogin: boolean;
    login: ({ email, token }: { email: string, token: string }, message?: string) => void;
    logout: () => void;
    tokenExists: (email: string) => boolean;
    userData: User
}
interface User {
    email: string | null;
    token: string | null;
}

const initialAuthState: AuthState = {
    isLogin: false,
    login: ({ email, token }: { email: string, token: string }, message?: string) => false,
    logout: () => { },
    tokenExists: (_email: string) => false,
    userData: {
        email: '',
        token: '',
    },
    setError: () => { },
    error: '',
};
const AuthContext = createContext<AuthState>(initialAuthState)
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const { setMessage } = useSnackbar();
    const queryClient = useQueryClient();

    const [mounted, setMounted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [user, setUser] = useState<User>({ email: null, token: null });

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
        // persist storage sync onSuccess event
        // check login state
        window.addEventListener('syncWithLocalStorage', () => {
            setIsLoaded(true);
        });
        return () => {
            setMounted(false);
            window.removeEventListener('syncWithLocalStorage', () => {
                setIsLoaded(false);
            });
        }
    }, []);

    // api error 발생시 준비
    const [error, setError] = useState<string>("");

    // 
    const setUserData = useCallback(({ email, token }: User) => {
        setUser({ email, token });
        queryClient.setQueryData(['userData', email], token);
    }, [queryClient]);

    const handleLogin = useCallback(({ email, token }: User, message?: string) => {
        if (!isLoaded) {
            return;
        }
        if (message) {
            setMessage(message);
        }
        setUserData({ email, token });
        setIsLogin(true);
    }, [isLoaded, setUserData, setMessage]);



    // localStorage에 있을때 바로 login
    const tokenExists = useCallback((email: string) => {
        if (!isLoaded) {
            return false;
        }
        const cachedUserData = queryClient.getQueryData(['userData', email]) as string;
        if (cachedUserData) {
            handleLogin({ email, token: cachedUserData }, "로그인이 완료되었습니다");
            return true;
        }

        // fallback false
        return false

    }, [isLoaded, queryClient, handleLogin]);

    // 반복되는 리셋 로직 함수로 정의
    const resetUserData = useCallback(() => {
        setUser({ email: null, token: null });
        queryClient.setQueryData(['userLogin'], null);
        setIsLogin(false);
    }, [queryClient])

    const handleLogout = useCallback(() => {
        resetUserData();
        setMessage('로그아웃이 완료되었습니다');
    }, [resetUserData, setMessage]);

    // error 발생시 effect
    useEffect(() => {
        if (error) {
            resetUserData();
            setMessage(error);
        }
    }, [error, resetUserData, setMessage, user]);

    // 새로고침시 로그인 되어있었는지 확인.
    useEffect(() => {
        if (isLoaded) {
            const loginState = queryClient.getQueryData(['userLogin']) as { isLogin: boolean, email: string };
            if (!loginState) {
                setIsLogin(false);
                return;
            }
            const {
                isLogin,
                email
            } = loginState
            const cachedUserData = queryClient.getQueryData(['userData', email]) as string;
            setUserData({ email, token: cachedUserData });
            setIsLogin(isLogin ?? false);
        }
    }, [queryClient, isLoaded, setIsLogin, setUserData]);

    // login 상태 변경시 cache
    useEffect(() => {
        if (isLoaded && mounted) {
            queryClient.setQueryData(['userLogin'], { isLogin, email: user.email });
        }
    }, [isLoaded, queryClient, mounted, isLogin, user]);


    // error 발생시 3초뒤에 error 삭제
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }, [error]);

    return <AuthContext.Provider
        value={{
            isLogin,
            login: ({ email, token }: User, message?: string) => handleLogin({ email, token }, message),
            logout: () => handleLogout(),
            error,
            setError: (message: string) => setError(message),
            tokenExists,
            userData: user
        }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        const error = new Error(`[AuthContext]: Provider not found.`);
        throw error;
    }
    return context
}