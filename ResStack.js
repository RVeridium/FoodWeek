import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Recipes from './Recipes'; 
import SingleRes from './SingleRes';

const Stack = createStackNavigator();

export default function ResStack() {

  return (

    <Stack.Navigator
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="Recipes" component={Recipes}/>
      <Stack.Screen name="Recipe" component={SingleRes} />
    </Stack.Navigator>

  );
}