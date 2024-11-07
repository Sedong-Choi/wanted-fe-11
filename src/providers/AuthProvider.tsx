import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"

type AuthState = {
    isLogin: boolean;
    login: (email: string, token?: string) => boolean;
    logout: () => void;
}
interface User {
    email: string | null;
    token: string | null;
}

const initialAuthState: AuthState = {
    isLogin: false,
    login: (_email: string, _token?: string) => false,
    logout: () => { },
};
const AuthContext = createContext<AuthState>(initialAuthState)
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User>({ email: null, token: null });
    const queryClient = useQueryClient();

    const handleLogin = useCallback((newEmail: string, token?: string) => {
        const oldUserData = queryClient.getQueryData(['userData']) as User;

        if (oldUserData && token === undefined) {
            const { email, token } = oldUserData;
            if (newEmail === email) {
                setUser({ email: newEmail, token });
            }
            return true;
        }
        if (newEmail !== '' && token !== undefined) {
            setUser({ email: newEmail, token });
            queryClient.setQueryData(['userData'], { email: newEmail, token });
            return true;
        }

        return false;
    }, [queryClient]);

    const handleLogout = useCallback(() => {
        setUser({ email: null, token: null });
        queryClient.setQueryData(['userData'], null);
    }, [queryClient]);

    // on mount
    useEffect(() => {
        const cacheData = queryClient.getQueryData(['userData']) as User;
        if (cacheData !== undefined) {
            setUser({ email: cacheData.email, token: cacheData.token });
        }
    }, []);

    return <AuthContext.Provider
        value={{
            isLogin: user.email !== null && user.token !== null,
            login: (email: string, token?: string) => handleLogin(email, token),
            logout: () => handleLogout()
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



