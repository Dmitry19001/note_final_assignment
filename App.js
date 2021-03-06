import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {screens} from './src/screens';
import { configureStore } from '@reduxjs/toolkit';
import i18n from './src/i18n';
import { loadSettings, saveSettings } from './src/storage/settingsStorage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { 
          screens.map((s) => <Stack.Screen 
            name ={s.name} 
            key={s.name} 
            component={s.component}
          />)
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//options = {{title: s.title}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings_button: {
    position: 'absolute' ,
    right: 10,
    top: 10,
  },
});
