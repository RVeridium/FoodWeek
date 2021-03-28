import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { Button, Card, Header, Input, Icon } from "react-native-elements";
import { db } from "./config";
import { Alert } from "react-native";
import { Pressable } from "react-native";

export default function Week({ navigation }) {
  const [list, setList] = useState([]);
  const [menu, setMenu] = useState({});
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  useEffect(() => {
    db.ref("/week").on("value", (snapshot) => {
      const info = snapshot.val();
      const alas = [];
      for (let [key, value] of Object.entries(info)) {
        let item = { key: key, value: value };
        alas.push(item);
      }
      setList(alas);
    });
  }, []);

  const testCase = ({ item }) => {
    Alert.alert("You selected: " + item.value.week);
    let search = item.key;
    db.ref("/week/" + search).on("value", (snapshot) => {
      const info = snapshot.val();
      const menu = info.menu;
      setMenu(menu);
    });
  };

  const Weekday = (props) => {
    const [current] = props.day;

    return menu.hasOwnProperty(props.day) &&
      menu[props.day].toString().length > 0 ? (
      <Card>
        <Card.Title style={{ textTransform: "capitalize" }}>
          {props.day}
        </Card.Title>
        <Card.Divider />
        <View style={styles.row}>
          <Text style={{ fontSize: 23 }}>Breakfast:</Text>
          <Text style={{ fontSize: 17, maxWidth: "30%" }}>
            {menu[props.day].breakfast.value.name}
          </Text>
          <Button
            style={styles.button}
            title="Check"
            onPress={() =>
              navigation.navigate("All recipes", {
                screen: "Recipe",
                params: {
                  key: menu[props.day].breakfast.value,
                },
              })
            }
          />
        </View>
        <View style={styles.row}>
          <Text style={{ fontSize: 23 }}>Lunch:</Text>
          <Text style={{ fontSize: 17 }}>
            {menu[props.day].lunch.value.name}
          </Text>
          <Button
            style={styles.button}
            title="Check"
            onPress={() =>
              navigation.navigate("All recipes", {
                screen: "Recipe",
                params: { key: menu[props.day].lunch.value },
              })
            }
          />
        </View>
        <View style={styles.row}>
          <Text style={{ fontSize: 23 }}>Dinner:</Text>
          <Text style={{ fontSize: 17 }}>
            {menu[props.day].dinner.value.name}
          </Text>
          <Button
            style={styles.button}
            title="Check"
            onPress={() =>
              navigation.navigate("All recipes", {
                screen: "Recipe",
                params: {
                  key: menu[props.day].dinner.value,
                },
              })
            }
          />
        </View>
      </Card>
    ) : null;
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => testCase({ item })}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            paddingHorizontal: 5,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 20 }}>{item.value.week}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        barStyle="default"
        centerComponent={{
          text: "WEEK MENU",
          style: { color: "#fff" },
        }}
        rightComponent={
          <Icon
            name="menu"
            type="entypo"
            color="#fff"
            size={27}
            onPress={() => navigation.openDrawer()}
          />
        }
      />
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontSize: 23 }}>
          Available weeks
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.key}
            horizontal={true}
          />
        </View>
        {Object.keys(menu).length === 0 ? (
          <Text style={{ textAlign: "center", paddingTop: 10, fontSize: 20 }}>
            Please select a week
          </Text>
        ) : (
          days.map((item, index) => <Weekday day={item} key={index} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  all: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
});
