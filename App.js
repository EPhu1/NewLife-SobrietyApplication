import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mainReducer } from './src/redux/reducer'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen'
import InformationScreen from './src/screens/InformationScreen'
import LogIntakeScreen from './src/screens/LogIntakeScreen'


const store = createStore(mainReducer);

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store = {store}>
      <View style = {styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = {'Home'}>
            <Stack.Screen name = 'Information' component = {InformationScreen} options = {{ 
              headerTitleAlign: 'center', //need this to align the title to the center properly.
              headerStyle: {backgroundColor: '#7ab0fc'},
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: 25,
                fontFamily: 'serif'
              },
            }}/>
            <Stack.Screen name = 'Home' component = {HomeScreen} options = {{ 
              title: 'Dashboard', 
              headerTitleAlign: 'center', //need this to align the title to the center properly.
              headerStyle: {backgroundColor: '#7ab0fc'},
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: 25,
                fontFamily: 'serif',
              },
            }}/>
            <Stack.Screen name = 'LogIntake' component = {LogIntakeScreen} options = {{ 
              title: 'Log Intake', 
              headerTitleAlign: 'center', //need this to align the title to the center properly.
              headerStyle: {backgroundColor: '#7ab0fc'},
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: 25,
                fontFamily: 'serif'
              },
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ededed',
  },
});
