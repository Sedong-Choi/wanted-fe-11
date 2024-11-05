import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface User {
    email: string;
    token?: string;
}

interface UserState extends User {
    setUser: Dispatch<SetStateAction<UserState>>;
}

const initialUserState: UserState = {
    email: "",
    token: "",
    setUser: () => { }
};
const AuthContext = createContext<UserState>(initialUserState)
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<UserState>(initialUserState)

    return <AuthContext.Provider value={{ ...user, setUser }}>
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



