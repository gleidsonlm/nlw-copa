import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, Center } from "native-base";

import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

/* todo: fix for theme.ts file name */
import { THEME } from './src/styles/theme.js';

export default function App() {

  const [fontsLoaded] = useFonts( { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } )

  return (
    <NativeBaseProvider theme={THEME}>
      { fontsLoaded ? <SignIn /> : <Loading /> }
    </NativeBaseProvider>
  );
}