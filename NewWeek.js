import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import {Button, Card, Header, Input} from 'react-native-elements'; 
import {Picker} from '@react-native-picker/picker'; 
import {db} from './config'; 



export default function NewWeek({navigation}) {
  const [weekN, setWeekN] = useState(''); 
  const [list, setList] = useState([]); 
  const [fullday, setFullday] = useState({'breakfast': '', 'lunch': '', 'dinner': '' }); 
  const [fullweek, setFullweek] = useState({'monday': '', 'tuesday': '', 'wednesday': '',
   'thursday': '', 'friday': '', 'saturday': '', 'sunday': ''}); 


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

  const CardCont = (props) => {
    //const id = props.id; 
    return(
      <View style={{flex: 0}}>
        <View style={styles.other}>
          <Text style={styles.text}>Breakfast</Text>
          <Picker
            style={{width: '50%'}}
            selectedValue={fullday.breakfast}
            onValueChange={(itemValue, itemIndex) =>
              setFullday({...fullday, 'breakfast': itemValue})
            }>
            {list.map((item, index) => {
              return(<Picker.Item label={item.value.name} value={item.key} key={item.key}/>)
            })}
            
          </Picker>
          </View>
          <View style={styles.other}>
        <Text style={styles.text}>Lunch</Text>
          <Picker
          style={{width: '50%'}}
            selectedValue={fullday.lunch}
            onValueChange={(itemValue, itemIndex) =>
              setFullday({...fullday, 'lunch': itemValue})
            }>
            {list.map((item, index) => {
              return(<Picker.Item label={item.value.name} value={item.key} key={item.key}/>)
            })}
          </Picker>
          </View>
          <View style={styles.other}>
            <Text style={styles.text}>Dinner</Text>
          <Picker
          style={{width: '50%'}}
            selectedValue={fullday.dinner}
            onValueChange={(itemValue, itemIndex) =>
              setFullday({...fullday, 'dinner': itemValue})
            }>
            {list.map((item, index) => {
              return(<Picker.Item label={item.value.name} value={item.key} key={item.key}/>)
            })}
          </Picker>
          </View>
          <Button
          title='Save'
          onPress={() => {
            setFullweek({...fullweek, [props.id]: fullday}); 
          }}
          />
      </View>
    )
  }

  const saveAll = () => {

    const reff = db.ref('/week/').push(); 
    reff.set({
      'week': weekN, 
      'menu': fullweek
    }).then(function () {Alert.alert('Menu succesful'); })
    .catch(function(error) { Alert.alert('Something went wrong'); }) 
    setFullweek({}); 
    setWeekN(''); 
    
  };


    return (
      <View style={{flex: 1}}>
      <Header
        barStyle="default"
        centerComponent={{
          text: "NEW WEEK MENU",
          style: { color: "#fff" }
        }}
      />
      <Input
      placeholder='Week number'
      value={weekN}
      onChangeText={value => setWeekN(value)}
      keyboardType={'number-pad'}
      style={{textAlign: 'center'}}
      />
      <ScrollView>
         <Card>
           <Card.Title>Monday</Card.Title>
           <Card.Divider/>
           <CardCont id={'monday'}/>
         </Card>
         <Card>
           <Card.Title>Tuesday</Card.Title>
           <Card.Divider/>
           <CardCont id={'tuesday'}/>
         </Card>
         <Card>
           <Card.Title>Wednesday</Card.Title>
           <Card.Divider/>
           <CardCont id={'wednesday'}/>
         </Card>
         <Card>
           <Card.Title>Thursday</Card.Title>
           <Card.Divider/>
           <CardCont id={'thursday'}/>
         </Card>
         <Card>
           <Card.Title>Friday</Card.Title>
           <Card.Divider/>
           <CardCont id={'friday'}/>
         </Card>
         <Card>
           <Card.Title>Saturday</Card.Title>
           <Card.Divider/>
           <CardCont id={'saturday'}/>
         </Card>
         <Card>
           <Card.Title>Sunday</Card.Title>
           <Card.Divider/>
           <CardCont id={'sunday'}/>
         </Card>
         <Button
         title='Save all'
         onPress={() => saveAll()}
         />
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
    other: {
      flexDirection: 'row', 
      justifyContent: 'space-between'
    }, 
    text: {
      width: '50%', 
      alignSelf: 'center', 
      fontWeight: 'bold', 
      fontSize: 20
    }
  });
