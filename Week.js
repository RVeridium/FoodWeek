import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Button, Card, Header, Input} from 'react-native-elements';  
import {db} from './config'; 
import { Alert } from 'react-native';
import { Pressable } from 'react-native';

export default function Week({navigation}) {
  const [list, setList] = useState([]); 
  const [menu, setMenu] = useState({}); 

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
       setMenu(menu); 
      })
  }

  const Monday = () => {
    return(
    (menu.monday.toString().length>0)? 
    <Card>
    <Card.Title>Monday</Card.Title>
    <Card.Divider/>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Breakfast:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.monday.breakfast]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Lunch:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.monday.lunch]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Dinner:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.monday.dinner]})}/>
    </View>
    </Card>: null
    )
  }
  const Tuesday = () => {
    return(
    (menu.tuesday.toString().length>0)? 
    <Card>
    <Card.Title>Tuesday</Card.Title>
    <Card.Divider/>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Breakfast:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.tuesday.breakfast]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Lunch:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.tuesday.lunch]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Dinner:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.tuesday.dinner]})}/>
    </View>
    </Card>: null
    )
  }
  const Wednesday = () => {
    return(
    (menu.wednesday.toString().length>0)? 
    <Card>
    <Card.Title>Wednesday</Card.Title>
    <Card.Divider/>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Breakfast:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.wednesday.breakfast]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Lunch:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.wednesday.lunch]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Dinner:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.wednesday.dinner]})}/>
    </View>
    </Card>: null
    )
  }
  const Thursday = () => {
    return(
    (menu.thursday.toString().length>0)? 
    <Card>
    <Card.Title>Thursday</Card.Title>
    <Card.Divider/>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Breakfast:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.thursday.breakfast]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Lunch:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.thursday.lunch]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Dinner:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.thursday.dinner]})}/>
    </View>
    </Card>: null
    )
  }
  const Friday = () => {
    return(
    (menu.friday.toString().length>0)? 
    <Card>
    <Card.Title>Friday</Card.Title>
    <Card.Divider/>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Breakfast:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.friday.breakfast]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Lunch:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.friday.lunch]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Dinner:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.friday.dinner]})}/>
    </View>
    </Card>: null
    )
  }
  const Saturday = () => {
    return(
    (menu.saturday.toString().length>0)? 
    <Card>
    <Card.Title>Saturday</Card.Title>
    <Card.Divider/>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Breakfast:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.saturday.breakfast]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Lunch:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.saturday.lunch]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Dinner:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.saturday.dinner]})}/>
    </View>
    </Card>: null
    )
  }
  const Sunday = () => {
    return(
    (menu.hasOwnProperty('sunday') && menu.sunday.toString().length>0)? 
    <Card>
    <Card.Title>Sunday</Card.Title>
    <Card.Divider/>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Breakfast:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.sunday.breakfast]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Lunch:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.sunday.lunch]})}/>
    </View>
    <View style={styles.row}>
    <Text style={{fontSize: 23}}>Dinner:</Text> 
    <Button style={styles.button} title='Check' onPress={() => navigation.navigate('Current recipe', {key: [menu.sunday.dinner]})}/>
    </View>
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
            {(Object.keys(menu).length===0)? 
            <Text style={{textAlign: 'center', paddingTop: 10, fontSize: 20}}>Please select a week</Text>
            : 
            <View>
            <Monday/>
            <Tuesday/>
            <Wednesday/>
            <Thursday/>
            <Friday/>
            <Saturday/>
            <Sunday/>
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
    }, 
    button: {
      width: 100
    }, 
    row: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingBottom: 5
    }, 


  });
