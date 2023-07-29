import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const CreateGroup = ({ navigation }) => {
  // const [userID, setUserID] = useState(0);
  const [groupID, setGroupID] = useState("");
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [memberNames, setMemberNames] = useState([]);
  const [isLandlord, setIsLandlord] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMaxMembers, setGroupMaxMembers] = useState(0);
  const [groupDescription, setGroupDescription] = useState("");
  const [dateTermination, setDateTermination] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // const handleGetUserIdDetails = async () => {
  //   const data = JSON.stringify({
  //     email: email, // replace with the email of the current user
  //   });
  //   try {
  //     console.log(data);
  //     const response = await axios.post(
  //       "http://localhost:5000/id_from_email",
  //       data,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     setUserID(response.data.user);
  //     console.log(userID);
  //     console.log(response.data.user);
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert("Error", "Unable to get group details");
  //   }
  // };



  const handleCreateNewGroup = async () => {
    console.log("end" ,dateTermination )

    try {
      const data = {
        userID: userID,
        is_landlord: isLandlord,
        group_name: groupName,
        group_max_members: groupMaxMembers,
        group_description: groupDescription,
        end_of_contract : dateTermination,
      };

      const response = await axios.post(
        "http://localhost:5000/add_group",
        data
      );
      if (response.status === 200) {
        showMessage({
          message: "Success",
          description: "Group created successfully",
          type: "success",
        });
        console.log("Asd", response.data);
        setGroupID(response.data.group_id);
        AsyncStorage.setItem("groupID", response.data.group_id);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "Error",
        description: "Unable to create group",
        type: "danger",
      });
    }
  };



  const handleGetGroupDetailsById = async () => {
    try {
      console.log("groupID", groupID)
      const data = { group_id: groupID };

      const response = await axios.post(
        "http://localhost:5000/members_from_group_id",
        data
      );
      console.log(response);
      const groupMembers = response.data;

      // Extract the fullname field of each user
      const memberName = groupMembers.map((member) => member.fullName);

      // Conditionally update the state only if the data has changed
      if (JSON.stringify(memberNames) !== JSON.stringify(memberName)) {
        setMemberNames(memberName);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "Error",
        description: "Unable to get group details",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    const fetchGroupID = async () => {
      const storedGroupID = await AsyncStorage.getItem("groupID");
      console.log("storedGroupID", storedGroupID)
      setGroupID(storedGroupID);
    };
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem("userID");
      console.log("storedUserID", storedUserID)
      setUserID(storedUserID);
    };
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem("userName");
      setUserName(storedUserName);
    };

    fetchUserID();
    fetchGroupID();
    fetchUserName();

  }, []);


  useEffect(() => {
    handleGetGroupDetailsById();
  }, [groupID]);

  return (

    <View style={styles.container}>
    
      <View style={styles.header}>
      <Text style={styles.title}>You are a house owner</Text>

        <Text style={styles.title}>Create New Group</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="Apartment Address ( Street & Number )"
          onChangeText={setGroupName}
          value={groupName}
        />
                <Text style={styles.title}>Apartment Max Members</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Apartment Max Members"
          keyboardType="numeric"
          onChangeText={(text) => setGroupMaxMembers(Number(text))}
          value={groupMaxMembers.toString()}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Apartment City"
          onChangeText={setGroupDescription}
          value={groupDescription}
        />
        <TextInput
          style={styles.textInput}
          placeholder="End Of Contract"
          onChangeText={setDateTermination}
          value={dateTermination}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
        
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreateNewGroup}>
          <Text style={styles.buttonText}>Create New Group</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate("OwnerPage")}
      >
        <Text style={styles.bottomButtonText}>Home</Text>
      </TouchableOpacity>
      <FlashMessage position="top" />
    </View>
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#ddd",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  groupIDContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupIDLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  groupID: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  bottomButton: {
    backgroundColor: "#007bff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    alignItems: "center",
  },
  bottomButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default CreateGroup;
