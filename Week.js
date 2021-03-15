import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Button, Card, Header, Input} from 'react-native-elements'; 
import {Picker} from '@react-native-picker/picker'; 
import {db} from './config'; 
import { Alert } from 'react-native';
import { Pressable } from 'react-native';

export default function Week({navigation}) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const [list, setList] = useState([]); 
  const [menu, setMenu] = useState({}); 
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

  const testCase = ({item}) => { 
      Alert.alert('You selected: ' + item.value); 
      let search = item.key; 
      db.ref('/week/'+search).on('value', snapshot => {
       const info = snapshot.val(); 
       const menu = info.menu; 
       console.log('manu on'); 
       console.log(menu);
       setMenu(menu); 
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

  //nimihakufunctio kuntoonn. tästä ei saada siistiä. 

  const CardSize = () => {
    return(
      
    (menu.hasOwnProperty('monday'))? 
    <Card>
    <Card.Title>Monday</Card.Title>
    <Card.Divider/>
    <Text>Breakfast:  {menu.monday.breakfast} </Text>
    <Text>Lunch:  {menu.monday.lunch} </Text>
    <Text>Dinner:  {menu.monday.dinner} </Text>
    </Card>: null
      
    )

  }

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => testCase({item})}>
        <View style={{borderWidth: 1, borderColor: 'black', paddingHorizontal: 5, marginHorizontal: 5}}>
      <Text style={{fontSize: 20}}>{item.value}</Text>
      </View>
      </Pressable>
    )
  };

 

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
            <Card>
              <Card.Title>You test forever</Card.Title>
            </Card>
            {(Object.keys(menu).length===0)? 
            <Text>Please select a week</Text>
            : 
            <View>
            <Text>Menu card here</Text>
            <CardSize/>
            </View>
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
   */