import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title} >NLW Copa</Text>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black' ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  }
});
