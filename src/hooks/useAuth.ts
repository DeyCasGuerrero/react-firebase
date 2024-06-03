import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
    onAuthStateChanged,
    User,
    signOut,
    signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { LogOutFunction, SignUpAndLoginFunction } from "../types/ContextType";

import { auth as authFirebase } from "../firebase/config";

export function useAuth() {

    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState<SignUpAndLoginFunction["loading"]>(true);


    const signUp: SignUpAndLoginFunction["signUp"] = async (auth) => {
        const { email, password } = auth;
        try {
            await createUserWithEmailAndPassword(authFirebase, email, password);

        } catch (error: any) {

            throw new Error(error.message || "Error desconocido");
        }
    };

    const login: SignUpAndLoginFunction["login"] = async (auth) => {
        const { email, password } = auth;
        try {
            await signInWithEmailAndPassword(authFirebase, email, password);
        } catch (error: any) {
            throw new Error(error.message || "Error desconocido");
        }
    };

    const loginWhitGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            await signInWithPopup(authFirebase, googleProvider);
        } catch (error) {
            console.error("Error during Google login:", error);
            throw error;
        }
    };

    const logOut: LogOutFunction = () => {
        signOut(authFirebase);
    };

    useEffect(() => {

        const unsubcribe = onAuthStateChanged(authFirebase, (CurretUser) => {
            setUser(CurretUser);
            setLoading(false);
        })

        return () => unsubcribe();

    }, []); //<-----la dependecia es vacio debio a que se ejecuta al renderizar el componente

    return {
        user,
        loading,
        signUp,
        login,
        loginWhitGoogle,
        logOut,
    };
}
