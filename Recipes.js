import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Constants from 'expo-constants'
import {db} from './config';
import {Button, ListItem, Header, Icon} from 'react-native-elements';


export default function Recipes({navigation, route}) {
  const [list, setList] = useState([]); 

  useEffect(() => {
    db.ref('/recipes').on('value', snapshot => {
      const info = snapshot.val(); 
      const alas = []; 
      for (let [key, value] of Object.entries(info)) {
        let item = {key: key, value: value}; 
        alas.push(item);  

      }
      setList(alas); 

    })
  }, [])


 
  
  const renderItem = ({item}) => {
    return (
      <ListItem bottomDivider>
    <ListItem.Content>
      <ListItem.Title>{item.value.name}</ListItem.Title>
    </ListItem.Content>
    <ListItem.Chevron onPress={() => navigation.navigate('Recipe', {key: item.value})}/>
    </ListItem>

    )
  }
    
    
  
  



    return (
        <View style={styles.container}>
          <View>
          <Header
      barStyle="default"
      centerComponent={{
        text: "ALL RECIPES",
        style: { color: "#fff" }
      }}
      rightComponent={<Icon name='menu' type='entypo' color= '#fff' size={27} onPress={() => navigation.openDrawer()}/>}
      />
    </View>
          {(list.length>0)? 
          <View>
             <FlatList
           data={list}
           renderItem={renderItem}
           style={{flex: 1, width: 250}}
           keyExtractor={(item) => item.key.toString()}
           />
          </View> : 
          <View>
            <Text>You have no recipes yet</Text>
          </View>
          }
            
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
