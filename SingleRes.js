import React from 'react';

import { StyleSheet, Text, View, FlatList } from 'react-native';
import {ListItem, Header} from 'react-native-elements'; 

export default function SingleRes({route, navigation}) {
    const {key} = route.params; 

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
                {key.name}
            </Text>
            <FlatList
           data={key.ingredients}
           renderItem={renderItem}
           keyExtractor={(item, index) => index.toString()}
           style={{flex: 1, width: 200}}
           />
            <Text style={{ fontSize: 18, flex: 1}}>
                {key.instructions}
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
