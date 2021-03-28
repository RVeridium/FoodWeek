import React, { useEffect, useState, useRef} from 'react';
import { Children } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated
} from "react-native";
import { Icon } from "react-native-elements";
import Collapsible from 'react-native-collapsible';
//import Animated from 'react-native-reanimated';

export default function Panel(props) {
  const IconUp = () =>{ return (<Icon name="chevron-up" type='font-awesome' containerStyle= {{margin: 10}} 
  onPress={() => toggleUp()}/>)}; 
  const IconDown = () => {return  (<Icon name="chevron-down" type='font-awesome' containerStyle= {{margin: 10}} 
  onPress={() => toggleDown()}/>)}; 
  const numb = 300;  
  const [expand, setExpand] = useState(true);
  const [viewheight, setViewheight] = useState(numb);


  


  const toggleUp = () => {
    setExpand(!expand); 
    setViewheight(0); 


  }

  const toggleDown = () => {
    setExpand(!expand);
    setViewheight(numb); 

  }

  return (
  <View style={styles.container}>
      <View>
          <Pressable style={styles.titleCont}>
          <Text style={styles.titleText}>{props.title}</Text>
          {(expand===true)?  <IconUp/> : <IconDown/>}
          </Pressable>
      </View>
      <Collapsible collapsed={expand}>
        <View>
          {props.children}
          </View>
      </Collapsible>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    overflow: "hidden",
    borderWidth: 1, 
    borderColor: 'grey'
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  text: {
    width: "50%",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  body: {
    padding: 10,
    paddingTop: 0
  }, 
  titleText: {
    fontSize: 20, 
    marginVertical: 10, 
    marginHorizontal: 10, 
    textTransform: 'capitalize'
  }
});
