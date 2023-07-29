import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  TextInput,
} from "react-native";
import PasswordComponent from "../../../src/Component/PasswordComponent";
import { user_login } from "../../api/user_api";
import { UserContext } from "../../api/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [groupID, setGroupID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = () => {
    console.log("in");
    AsyncStorage.setItem("userEmail", email)
      .then(() => {
        console.log("Email saved successfully");
      })
      .catch((error) => {
        console.error(error);
      });
    user_login(
      JSON.stringify({
        email: email.toLocaleLowerCase(),
        password: password,
      })
    )
      .then((result) => {
        if (result.status == 200) {
          console.log("success");
          // send another Axios request to get the user ID
          handleGetUserIdDetails().catch((error) => {
            console.error(error);
          });
        }
      })
      .catch((err) => {
        setErrorMessage("                The Username/Password is incorrect"); // set error message if login fails

        console.error(err);
      });
  };

  const handleGetGroupIdDetails = async () => {
    const data = JSON.stringify({
      user_id: userID, // replace with the email of the current user
    });
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/group_id_from_user_id",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      setGroupID(response.data.group);

      // Alert.alert("Group Number", `The group number is ${response.data.group}`);
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Unable to get group details");
    }
  };

  const handleGetUserIdDetails = async () => {
    const data = JSON.stringify({
      email: email, // replace with the email of the current user
    });
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/id_from_email",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserID(response.data.user);
      console.log(userID);
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Unable to get group details");
    }
  };

  const handleGetUserNameDetails = async () => {
    const data = JSON.stringify({
      user_id: userID, // replace with the email of the current user
    });
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/get_user_details_by_id",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("ASdasdasd", response.data);
      setUserName(response.data[1].username);
      setRole(response.data[10].role);
      
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Unable to get group details");
    }
  };

  useEffect(() => {
    console.log("groupID", groupID);

    if (userID !== "") {
      AsyncStorage.setItem("userID", userID);
      handleGetUserNameDetails();
      handleGetGroupIdDetails();
    }
  }, [userID]);


  useEffect(() => {
    if (groupID !== "") {
      AsyncStorage.setItem("groupID", groupID);
      console.log("username is ", userName);

      AsyncStorage.setItem("userName", userName);
      AsyncStorage.setItem("role", role);

      if (role === "user") {
        navigation.navigate("UserPage");
      } else if (role === "owner") {
        navigation.navigate("OwnerPage");
      }
    }
  }, [groupID]);

  return (
    <SafeAreaView style={styles.container}>
      <UserContext.Provider value={{ email }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: 120, height: 220 }}>
            <Image
              source={require("../../../assets/icon.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode={"cover"}
            />
          </View>
        </View>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <View>
          <TextInput 
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            keyboardType="email-address" 
            style={styles.inputField}
          />
          {checkValidEmail ? (
            <Text style={styles.textFailed}>Wrong format email</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
          <PasswordComponent
            placeholder={"Enter your password"}
            icon="key"
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Button
            title="Sign In"
            onPress={handleLogin}
            color="#4CAF50" // hardcoded color for green
          />
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                marginLeft: 5,
                color: "#FF5733", // hardcoded color for primary
                fontWeight: "bold",
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </UserContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  sginInDesign: {
    color: "#7B7BC4",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  forgetPassword: {
    color: "#7B7BC4",
    marginVertical: 5,
    fontSize: 14,
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 10,
    width: "100%",
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 24,
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
