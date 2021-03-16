import React, { useEffect } from 'react';

import { useState } from 'react';
import Constants from 'expo-constants'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {Button, Input, ListItem, Header} from 'react-native-elements'; 
import {db} from './config'; 

export default function SingleRes({route, navigation}) {
    const key = route.params; 
    const [recipe, setRecipe] = useState({name: '', instructions: '', ingredients: []}); 


    useEffect(() => {
      console.log(key.key); 
        db.ref('/recipes/'+ key.key).once('value')
        .then(snapshot => {
            const out = snapshot.val(); 
            setRecipe({...recipe, name: out.name, instructions: out.instructions, ingredients: out.ingredients})
        }).catch(function(error) {
          console.log(error); 
        })
    },[key])


        const Leftie = () => {
            return (
                <Text onPress={() => navigation.goBack()} style={{color: 'white'}}>BACK</Text>
            )
        }

    const renderItem = ({item}) => (
        <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.amount} {item.unit} {item.nameI}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      )

    return (
        <View style={styles.container}>
            <Header
      barStyle="default"
      centerComponent={{
        text: "RECIPE",
        style: { color: "#fff" }
      }}
      leftComponent={<Leftie/>} 
      />
            <Text style={{paddingTop: 10, fontSize: 20, textAlign: 'center'}}>
                {recipe.name}
            </Text>
            <FlatList
           data={recipe.ingredients}
           renderItem={renderItem}
           keyExtractor={(item, index) => index.toString()}
           style={{flex: 1, width: 200}}
           />
            <Text style={{ fontSize: 18, flex: 1}}>
                {recipe.instructions}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      //paddingTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    header: {
      width: 200,
      height: 45,
      backgroundColor: '#fff', 
    }
  });
