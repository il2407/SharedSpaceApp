import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function OwnerScreen({ navigation }) {
  const [userName, setUserName] = useState("asd");
  const [groupID, setGroupID] = useState("");

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem("userName");
      setUserName(storedUserName);
    };

    const fetchGroupID = async () => {
      const storedGroupID = await AsyncStorage.getItem("groupID");
      setGroupID(storedGroupID);
    };

    fetchGroupID();
    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 16 }}>
        <Text style={styles.textStyle}>{userName}</Text>
        <View style={{ flex: 1 }} />
      </View>
      <Text style={styles.textStyle}>Menu</Text>
      <View style={styles.createGroupContainer}>
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={() => {
            handleNavigate("CreateGroup");
          }}
        >
          <Text style={styles.createGroupButtonText}>Create Group</Text>
        </TouchableOpacity>
        
        {/* Button to Navigate to AdminRequestPage */}
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={() => {
            handleNavigate("AdminRequestPage");
          }}
        >
          <Text style={styles.createGroupButtonText}>Admin Requests</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  textStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  createGroupContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  createGroupButton: {
    backgroundColor: "#B4C7E7",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,  // Added a margin for separation between buttons
  },
  createGroupButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
