import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {screens} from './src/screens';
import { noteItem } from './src/components/noteItem';

const Stack = createNativeStackNavigator();

export default function App() {
  const p = new noteItem("Nmae", "adsadasdawd", "27.04.2022");
  console.log(p);
  return (    
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((s) => <Stack.Screen name ={s.name} key={s.name} component={s.component}></Stack.Screen>)}
        {/* <Stack.Screen name = "About" component={About}> </Stack.Screen>
        <Stack.Screen name = "Counter" component={Counter}> </Stack.Screen> */}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
