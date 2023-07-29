import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  FlatList,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios"; // Import Axios
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect



export const SLIDER_WIDTH = Dimensions.get("window").width + 2;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

export default function Appartements({ navigation }) {
  const [groups, setGroups] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      setGroups([])

      // Fetching data using Axios
      axios
        .post("http://localhost:5000/get_available_groups")
        .then((response) => {
          setGroups(response.data.group_details);
          console.log("response.data", response.data.group_details);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Search input field below */}
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="search-sharp"
          size={20}
          color="grey"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          color="#000"
        ></TextInput>
      </View>

      {/* Below is a list of data which render from the fetched data */}
      <FlatList
  style={{ marginEnd: 10, marginEnd: 10 }}
  data={groups}
  renderItem={({ item }) => (
    // Displaying all the details returned for each group
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>Appartement Address: {item.group_name} - {item.group_description}</Text>
      <Text>Appartement Max Roomates: {item.group_max_members}</Text>
      <Text>End of Contract: {item.end_of_contract}</Text>
      <Text>Roomate Name: {item.username}</Text>
    </View>
  )}
  keyExtractor={(item, index) =>
    item.group_id ? item.group_id.toString() : index.toString()
  }
/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Notification: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "#000",
  },
  searchSection: {
    borderColor: "#02C38E",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "grey",
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
  },
  searchIcon: {
    padding: 10,
    marginTop: 4,
  },
  input: {
    backgroundColor: "#ffffff",
    color: "grey",
    width: "50%",
    borderColor: "#02C38E",
    borderRadius: 10,
  },
  categeory: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
