import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Quiz from "./src/components/quiz";
import DbCities from "./src/components/db";
const BottomTab = createBottomTabNavigator();

function HomeScreen() {
  return (
  <View style={styles.container}>
    <Text style={styles.text}>Test your city knowledge!</Text>
    <StatusBar style="auto" />
  </View>);
}

function WeatherApi(){
  return(<View style={styles.container}>
    <Text style={styles.text}>Weather Api</Text>
    <StatusBar style="auto" />
  </View>);
}

function WrongCityDatabase(){
  return(<View style={styles.container}>
    <Text style={styles.text}>Wrong City!</Text>
    <StatusBar style="auto" />
  </View>);
}

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
