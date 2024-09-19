import 'react-native-gesture-handler'; // Importante para navegação baseada em gestos
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens'; // Melhora o desempenho
import SplashScreen from './src/pages/Splash/SplashScreen';
import ACount from './src/pages/Acount/Acount';
import HomeScreen from './src/pages/HomeScreen/home';
import LoginPage from './src/pages/Login/LoginPage';
import HomeApp from './src/pages/HomeApp'

// Habilita a otimização de telas
enableScreens();

// Cria o stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={LoginPage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Acount" component={ACount} />
        <Stack.Screen name="HomeApp" component={HomeApp} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
