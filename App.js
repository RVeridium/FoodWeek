import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Week from './Week'; 
import NewWeek from './NewWeek'; 
import Shopping from './Shopping'; 

import NewRecipe from './NewRecipe'; 
import ResStack from './ResStack'

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
    <Drawer.Navigator>
    <Drawer.Screen name="Week plan" component={Week} />
    <Drawer.Screen name="New week plan" component={NewWeek} />
    <Drawer.Screen name="All recipes" component={ResStack} />
    <Drawer.Screen name="New recipe" component={NewRecipe} />
    <Drawer.Screen name="Shopping lists" component={Shopping} />
    </Drawer.Navigator>

  </NavigationContainer>
  );
}


