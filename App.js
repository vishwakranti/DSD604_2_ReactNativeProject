import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Quiz from "./src/components/quiz";
import DbCities from "./src/components/db";
import WeatherApi from "./src/components/weatherApi";
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Quiz" component={Quiz} />
        <BottomTab.Screen name="Weather" component={WeatherApi} />
        <BottomTab.Screen name="Database" component={DbCities} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
  };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#ffffff',
    fontSize: 25,
  }
});
