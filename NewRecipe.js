import React from 'react';
import { useState } from 'react';
import Constants from 'expo-constants'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {Button, Input, ListItem, Header} from 'react-native-elements'; 
import {db} from './config'; 




export default function NewRecipe({navigation}) {
  //const [recipe, setRecipe] = useState({nameR: '', instructions:''});
  const [instruct, setInstuct] = useState(''); 
  const [recName, setRecName] = useState(''); 
  const [allIng, setAllIng] = useState([]);
  const [ing, setIng] = useState({nameI: '', unit: '', amount: ''}); 

  //const db = Firebase.database(); 


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
      />
    
          <View>
            <Input
            placeholder='Name'
            onChangeText={value => setRecName(value)}
            value={recName}
            />
           </View> 
           <Text style={{paddingLeft: 5}}>Add ingredients</Text>
           <View style={styles.ings}>
             <View style={styles.child}>
             <Input 
              
              placeholder='Amount'
              name='amount'
              value={ing.amount}
              onChangeText={value => setIng({...ing, amount: value})}
              />
              </View>
              <View style={styles.child}>
              <Input 
             
              placeholder='Unit'
              value={ing.unit}
              onChangeText={value => setIng({...ing, unit: value})}
              />
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
                color: 'black'
              }}
              onPress={() => saveIng()}/>
           </View>
           <View>
             <Input
             style={styles.box}
             placeholder='Instructions'
             onChangeText={value => setInstuct(value)}
             value={instruct}
             multiline={true}
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
      justifyContent: 'center',
      alignItems: 'center'

    },
    box: {
      borderWidth: 1, 
      borderColor: 'black',
      height: 60,
      width: 200
    }, 
    child: {
      width: 90
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