import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, Center } from "native-base";

/* todo: fix for theme.ts file name */
import { THEME } from './src/styles/theme.js'

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bgColor='gray.900' >
        <Text color='white' fontSize={24} >NLW Copa</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}