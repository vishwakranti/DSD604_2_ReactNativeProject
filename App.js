import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

function HomeScreen() {
  return (
  <View style={styles.container}>
    <Text style={styles.text}>Test your city knowledge!</Text>
    <StatusBar style="auto" />
  </View>);
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Home" component={HomeScreen} />
        {/* <BottomTab.Screen name="Settings" component={SettingsScreen} /> */}
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
