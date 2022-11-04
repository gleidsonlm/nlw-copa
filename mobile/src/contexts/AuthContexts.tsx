import { createContext, ReactNode, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';


interface UserProps {
    name: string;
    avatarURL: string;
}

export interface AuthContextDataProps{
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext( {} as AuthContextDataProps );

export function AuthContextProvider({ children }:AuthProviderProps){
    // state if the user is going through oauth or not.
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync ] = Google.useAuthRequest({
        clientId: '833877542055-kelur2o05qq66cnn2o7v09hv49drfhf0.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile','email']
    });

    async function signIn(){ 
        try {
            setIsUserLoading(true);
        } catch (error) {
            
        } finally {
            setIsUserLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user: {
                name: 'gleidsonlm',
                avatarURL: 'https://github.com/gleidsonlm.png',
            }
        }}>
            { children }
        </AuthContext.Provider>
    )
}