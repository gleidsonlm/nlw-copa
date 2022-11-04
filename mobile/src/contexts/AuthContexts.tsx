import { createContext, ReactNode } from 'react';

interface UserProps {
    name: string;
    avatarURL: string;
}

export interface AuthContextDataProps{
    user: UserProps;
    signIn: () => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext(
        {} as AuthContextDataProps
    );

export function AuthContextProvider({ children }:AuthProviderProps){
    async function signIn(){ 
        console.log('logged in')
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'gleidsonlm',
                avatarURL: 'https://github.com/gleidsonlm.png',
            }
        }}>
            { children }
        </AuthContext.Provider>
    )
}