import { createContext, ReactNode, useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../services/api'


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
    // state with user information given by Google.response
    const [user, setUser] = useState<UserProps>({} as UserProps);
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
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle (access_token: string) {
        try {
            setIsUserLoading(true);

            const tokenResponse = await api.post('/users',{ access_token });
            // setting api default with authenticated user token
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

            // reques api /me to retrieve user information
            const userInfoResponse = await api.get('/me');
            // and setState with them
            setUser(userInfoResponse.data.user);

        } catch (error) {
            console.log(error);
            throw error;

        } finally {
            setIsUserLoading(false);

        }
    }

    // useEffect will listen to Google.response
    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    },
    [response]
    );

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
            { children }
        </AuthContext.Provider>
    )
}