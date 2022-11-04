import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';
import { New } from './src/screens/New';

import { themeCopa } from './src/styles/theme';
import { AuthContextProvider } from './src/contexts/AuthContexts';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={themeCopa}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />

        { fontsLoaded ? <New /> : <Loading /> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}