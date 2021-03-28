import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { Button, Card, Header, Input, Icon } from "react-native-elements";
import Collapsible from "react-native-collapsible";

import { db } from "./config";
import { Pressable } from "react-native";

export default function NewWeek({ navigation }) {
  const [weekN, setWeekN] = useState("");
  const [list, setList] = useState([]);
  const [fullweek, setFullweek] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
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
    db.ref("/recipes").on("value", (snapshot) => {
      const info = snapshot.val();
      const alas = [];
      for (let [key, value] of Object.entries(info)) {
        let item = { key: key, value: value };
        alas.push(item);
      }
      setList(alas);
    });
  }, []);

  const Weekday = (props) => {
    const IconUp = () => {
      return (
        <Icon
          name="chevron-up"
          type="font-awesome"
          containerStyle={{ margin: 10 }}
        />
      );
    };
    const IconDown = () => {
      return (
        <Icon
          name="chevron-down"
          type="font-awesome"
          containerStyle={{ margin: 10 }}
        />
      );
    };
    const [expand, setExpand] = useState(true);
    const toggle = () => {
      setExpand(!expand);
    };

    const [fullday, setFullday] = useState({
      breakfast: "",
      lunch: "",
      dinner: "",
    });
    const [ex1, setEx1] = useState(false);
    const [ex2, setEx2] = useState(false);
    const [ex3, setEx3] = useState(false);
    const toggle1 = () => {
      setEx1(!ex1);
    };
    const toggle2 = () => {
      setEx2(!ex2);
    };
    const toggle3 = () => {
      setEx3(!ex3);
    };

    const RenderItem = (props) => {
      const pull = () => {
        props.func();
      };

      return (
        <Pressable
          onPress={() => {
            setFullday({ ...fullday, [props.meal]: props.item });
            pull();
          }}
        >
          <View>
            <Text
              style={{ fontSize: 20, marginHorizontal: 5, marginVertical: 10 }}
            >
              {props.item.value.name}
            </Text>
          </View>
        </Pressable>
      );
    };

    return (
      <View style={styles.border}>
        <View>
          <Pressable style={styles.titleCont} onPress={() => toggle()}>
            <Text style={styles.titleText}>{props.title}</Text>
            {!expand ? <IconUp /> : <IconDown />}
          </Pressable>
        </View>
        <Collapsible collapsed={expand}>
          <View>
            <Text style={styles.text}>Breakfast</Text>
            <Collapsible collapsed={ex1}>
              <FlatList
                data={list}
                style={{ marginHorizontal: 10 }}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) => (
                  <RenderItem item={item} meal={"breakfast"} func={toggle1} />
                )}
                horizontal={true}
              />
            </Collapsible>
          </View>
          <View>
            <Text style={styles.text}>Lunch</Text>
            <Collapsible collapsed={ex2}>
              <FlatList
                data={list}
                style={{ marginHorizontal: 10 }}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) => (
                  <RenderItem item={item} meal={"lunch"} func={toggle2} />
                )}
                horizontal={true}
              />
            </Collapsible>
          </View>
          <View>
            <Text style={styles.text}>Dinner</Text>
            <Collapsible collapsed={ex3}>
              <FlatList
                data={list}
                style={{ marginHorizontal: 10 }}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) => (
                  <RenderItem item={item} meal={"dinner"} func={toggle3} />
                )}
                horizontal={true}
              />
            </Collapsible>
          </View>

          <Button
            title="Save"
            style={{ marginBottom: 5, marginHorizontal: 5, marginTop: 8 }}
            onPress={() => {
              console.log(fullday);
              setFullweek({ ...fullweek, [props.id]: fullday });
              setExpand(true);
            }}
          />
        </Collapsible>
      </View>
    );
  };

  const saveAll = () => {
    console.log(fullweek);
    if (weekN.length === 0) {
      Alert.alert("Please enter a number for the week");
    } else {
      const reff = db.ref("/week/").push();
      reff
        .set({
          week: weekN,
          menu: fullweek,
        })
        .then(function () {
          Alert.alert("Menu succesful");
        })
        .catch(function (error) {
          Alert.alert("Something went wrong");
        });
      setFullweek({});
      setWeekN("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        barStyle="default"
        centerComponent={{
          text: "NEW WEEK MENU",
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
      <Input
        placeholder="Week number"
        value={weekN}
        onChangeText={(value) => setWeekN(value)}
        keyboardType={"number-pad"}
        style={{ textAlign: "center" }}
      />
      <ScrollView>
        {days.map((item, index) => (
          <Weekday id={item} title={item} key={index} />
        ))}
      </ScrollView>
      <Button title="Save week" onPress={() => saveAll()} />
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
  other: {
    //flexDirection: 'row',
    justifyContent: "space-between",
  },
  text: {
    //width: '50%',
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 5,
  },
  onePicker: {
    // height: 44,
    width: "50%",
  },
  onePickerItem: {
    marginHorizontal: 5,
    //width: '50%'
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    textTransform: "capitalize",
  },
  border: {
    borderWidth: 1,
    borderColor: `#808080`,
    marginBottom: 3,
    marginHorizontal: 5,
  },
});

