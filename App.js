import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'; 
import {db} from './config'; 
import Week from './Week'; 
import NewWeek from './NewWeek'; 
import Shopping from './Shopping'; 
import Recipes from './Recipes'; 
import NewRecipe from './NewRecipe'; 
import SingleRes from './SingleRes';

export default function App() {
  const Drawer = createDrawerNavigator();
  const [first, setFirst] = useState('');  

  useEffect(() => {
    db.ref('/recipes').once('value', snapshot =>{
      const all = snapshot.val(); 
      let m = Object.keys(all)[0]
      setFirst(m);
    })
  }, [Drawer]); 

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
    <Drawer.Navigator>
    <Drawer.Screen name="Week plan" component={Week} />
    <Drawer.Screen name="New week plan" component={NewWeek} />
    <Drawer.Screen name="All recipes" component={Recipes} />
    <Drawer.Screen name="New recipe" component={NewRecipe} />
    <Drawer.Screen name="Current recipe" component={SingleRes} initialParams={{key: first}}/>

    </Drawer.Navigator>
  </NavigationContainer>
  );
}


