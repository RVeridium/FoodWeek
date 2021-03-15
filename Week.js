import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Button, Card, Header, Input} from 'react-native-elements'; 
import {Picker} from '@react-native-picker/picker'; 
import {db} from './config'; 
import { Alert } from 'react-native';
import { Pressable } from 'react-native';

export default function Week({navigation}) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [list, setList] = useState([]); 
  const [menu, setMenu] = useState([]); 
///to be fixed
  useEffect(() => {
    db.ref('/week').on('value', snapshot => {
      const info = snapshot.val(); 
      const alas = []; 
      for (let [key, value] of Object.entries(info)) {
        let item = {key: key, value: value.week}; 
        alas.push(item);  
      }
      setList(alas); 
    })
  }, []); 

  const testCase = (key) => { 
      Alert.alert('You selected: ' + key); 
      let search = key 
      db.ref('/week/'+search).on('value', snapshot => {
        let out = snapshot.val();
        let fix = []; 
        out.menu.forEach(({item, index}) => (
          (!item===undefined)?
          fix.push(item) : null
        )
      )
        setMenu(fix)
        console.log(menu); 
      })
  }

  const GetName = (key) => {
    db.ref('/recipe' + key).once('value')
    .then(function(snapshot) {
      let full = snapshot.val(); 
      let name = full.name; 
      return (name)
    })
   
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => testCase(item.key)}>
        <View style={{borderWidth: 1, borderColor: 'black', paddingHorizontal: 5, marginHorizontal: 5}}>
      <Text style={{fontSize: 20}}>{item.value}</Text>
      </View>
      </Pressable>
    )
  };

  const CardLife = () => {
    return(
      menu.map(({item, index}) => (
        <Card key={index}>
          <Card.Title>{days[index]}</Card.Title>
          <Card.Divider/>
          <Text>Breakfast: </Text>
          <Text>Lunch: {item.lunch}</Text>
          <Text>Dinner: {item.dinner}</Text>
        </Card>
      ))
      )
  }

    return (
        <View style={{flex: 1}}>
          <Header
            barStyle="default"
            centerComponent={{
              text: "WEEK MENU",
              style: { color: "#fff" }
            }}
          />
          <ScrollView>
            <Text style={{textAlign: 'center', fontSize: 23}}>Available weeks</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}> 
            <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.value.toString()}
            horizontal={true}
            />
            </View>
             {(menu.length>0)? 
             menu.map((item, index) => 
             <Card>
               <Card.Title>{days[index]}</Card.Title>
               <Card.Divider/>
               <Text>Breakfast: {item.breakfast}</Text>
               <Text>Lunch: {item.lunch}</Text>
               <Text>Dinner: {item.dinner}</Text>
             </Card>
           )
             : 
             <Text style={{justifyContent: 'center', alignContent: 'center'}}>No cards here</Text>
             }
             </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    all: {
      flex: 1, 
      flexDirection: 'row', 
      flexWrap: 'wrap'
    }
  });

  /**
   * 
   * menu.map((item, index) => 
              <Card>
                <Card.Title>{days[index]}</Card.Title>
                <Card.Divider/>
                <Text>Breakfast: {item.breakfast}</Text>
                <Text>Lunch: {item.lunch}</Text>
                <Text>Dinner: {item.dinner}</Text>
              </Card>
            )
   */