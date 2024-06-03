import { SignUpAndLoginFunction, AuthProviderProps } from '../types/ContextType';
import { useAuth } from '../hooks/useAuth';
import { createContext, useContext} from "react";

export const contextAuth = createContext<SignUpAndLoginFunction | undefined>(
    undefined
);

export const useAuthContext = () => {
    const context = useContext(contextAuth);
    if (!context) throw new Error("There is not auth provider");
    return context;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const {loading, logOut, loginWhitGoogle, login, signUp, user } = useAuth();
    return (
        <contextAuth.Provider value={{ loading ,signUp, login, user, logOut, loginWhitGoogle }}>
            {children}
        </contextAuth.Provider>
    )
}


