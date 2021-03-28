import React from 'react';
import { useState } from 'react';
import Constants from 'expo-constants'
import { StyleSheet, Text, View, FlatList, ScrollView, Keyboard } from 'react-native';
import {Button, Input, ListItem, Header, Icon, ButtonGroup} from 'react-native-elements'; 
import {db} from './config'; 
import {Picker} from '@react-native-picker/picker'; 




export default function NewRecipe({navigation}) {
  const [instruct, setInstuct] = useState(''); 
  const [recName, setRecName] = useState(''); 
  const [allIng, setAllIng] = useState([]);
  const [ing, setIng] = useState({nameI: '', unit: '', amount: ''}); 

  const units = ['tl', 'rl', 'dl', 'l', 'g', 'kg']; 


  const saveRecipe = () => {
    //console.log("Recipe is"+ JSON.stringify(recipe)); 
    var reff = db.ref('/recipes').push();
    //reff.set(); 
    reff.set({'ingredients': allIng,'name': recName, 'instructions': instruct}); 
    //setRecipe({name: '', instructions: ''});
    setInstuct(''); 
    setRecName('') 
    setAllIng([]); 
  }

  const saveIng = () => {
    setAllIng([...allIng, ing]) 
    setIng({nameI: '', unit: '', amount: ''}); 
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
        text: "ADD RECIPE",
        style: { color: "#fff" }
      }}
      rightComponent={<Icon name='menu' type='entypo' color= '#fff' size={27} onPress={() => navigation.openDrawer()}/>}
      />
    
          <View>
            <Input
            placeholder='Name'
            onChangeText={value => setRecName(value)}
            value={recName}
            />
           </View> 
           <Text style={{textAlign: 'center', marginBottom: 5, fontSize: 20}}>Add ingredients</Text>
           <View style={styles.ings}>
             <View style={{width: 100}}>
             <Input 
              placeholder='Amount'
              name='amount'
              value={ing.amount}
              onChangeText={value => setIng({...ing, amount: value})}
              keyboardType='numeric'
              />
              </View>
              <View>
                <Picker
                style={[styles.onePicker]}
                itemStyle={styles.onePickerItem}
                selectedValue={ing.unit}
                onValueChange={(itemValue, itemIndex) => 
                  setIng({...ing, unit: itemValue})
                }>
                {units.map((item, index) => {
                return(<Picker.Item label={item} value={item} key={index}/>)
              })}
                </Picker>
              </View>
              <View style={styles.child}>
              <Input 
              
              placeholder='Name'
              name='nameI'
              value={ing.nameI}
              onChangeText={value => setIng({...ing, nameI: value})}
              />
              </View>
              <Button
              icon={{
                name: 'plus-one', 
                size: 15, 
                color: 'white'
              }}
              onPress={() => saveIng()}
              style={{marginRight: 5}}/>
           </View>
           <View>
             <Input
             style={styles.box}
             placeholder='Instructions'
             onChangeText={value => setInstuct(value)}
             value={instruct}
             multiline={true}
             onEndEditing={Keyboard.dismiss}
             />
           </View>
           <Button
           title='Save'
           onPress={() => saveRecipe()}/>
           <View>

           </View>
           <Text style={{alignSelf: 'center', fontSize: 20}}>{recName}</Text>
           <FlatList
           data={allIng}
           renderItem={renderItem}
           keyExtractor={(item, index) => index.toString()}
           style={{flex: 1}}
           />
           <View style={{flex: 2, justifyContent: 'flex-start', alignItems: 'center'}}>
           <Text >{instruct}</Text>
           </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      //paddingTop: Constants.statusBarHeight, 
      flex: 1,
      backgroundColor: '#fff',

    },
    ings: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    box: {
      borderWidth: 1, 
      borderColor: 'black',
      height: 60,
      width: 200
    }, 
    child: {
      width: 150
    }, 
    topdown: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }, 
    onePicker: {
      height: 44,
      width: 60 
    }, 
    onePickerItem: {
      height: 44
      //does not apply to android?????
    }
  });

  /**
   * <View style={styles.ings}>
        <Text>{item.amount} </Text>
        <Text>{item.unit} </Text>
        <Text>{item.nameI}</Text>
      </View>
   * 
   * 
   */