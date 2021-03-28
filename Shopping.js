import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Header, Icon } from "react-native-elements";
import { db } from "./config";
import { Alert } from "react-native";
import { Pressable } from "react-native";

export default function Shopping({ navigation }) {
  const [list, setList] = useState([]);
  const [menu, setMenu] = useState({});
  const [shop, setShop] = useState("");

  useEffect(() => {
    db.ref("/week").on("value", (snapshot) => {
      const info = snapshot.val();
      const alas = [];
      for (let [key, value] of Object.entries(info)) {
        let item = { key: key, value: value.week };
        alas.push(item);
      }
      setList(alas);
    });
  }, []);

  const testCase = ({ item }) => {
    Alert.alert("You selected: " + item.value);
    let search = item.key;
    db.ref("/week/" + search).on("value", (snapshot) => {
      const info = snapshot.val();
      const menu = info.menu;
      setMenu(menu);
    });
  };

  useEffect(() => {
    let full = Object.values(menu);
    let ot = [];
    var b;
    for (var i = 0; i < full.length; i++) {
      if (full[i].toString().length > 0) {
        b = ot.concat(
          full[i].breakfast.value.ingredients,
          full[i].lunch.value.ingredients,
          full[i].dinner.value.ingredients
        );
      }
    }
    setShop(b);
  }, [menu]);

  const renderItem2 = ({ item }) => {
    return (
      <View>
        <Text style={{ fontSize: 20 }}>
          {item.nameI} {item.amount} {item.unit}
        </Text>
      </View>
    );
  };
  const flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#000",
          margin: 10,
        }}
      />
    );
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
          <Text style={{ fontSize: 20 }}>{item.value}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        barStyle="default"
        centerComponent={{
          text: "SHOPPING LISTS",
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
      <View style={{ flex: 1 }}>
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
        <View style={styles.lineStyle} />
        <View>
          {Object.keys(menu).length === 0 ? (
            <Text style={{ textAlign: "center", paddingTop: 10, fontSize: 20 }}>
              Please select a week
            </Text>
          ) : (
            <View style={styles.list}>
              <FlatList
                data={shop}
                renderItem={renderItem2}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={flatListItemSeparator}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
  },
  list: {
    alignItems: "center",
    justifyContent: "center",
  },
});
