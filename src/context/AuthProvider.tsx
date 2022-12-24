import { createContext } from "react";
import type { ReactNode } from "react";
import { signIn, useSession } from "next-auth/react";

const AuthContext = createContext({});

export const AuthProvider = ({children}: {children: ReactNode}) => {

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated: () => {
            signIn("google", {callbackUrl: "/"});
        }
    })
    
    if (status === "authenticated" && session) {
        return (
            <AuthContext.Provider value={{}}>
                {children}
            </AuthContext.Provider>
        )
    }
    
    return <></>
}
