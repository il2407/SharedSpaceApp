import React, { useState } from "react";
import { adduser } from "../../api/user_api";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Button,
  TextInput 
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SignUp({ navigation }) {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_Confirmation] = useState("");
  const [username, setUsername] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("user");

  const signUpFun = () => {
    adduser(
      JSON.stringify({
        username: username.toLocaleLowerCase(),
        email: email.toLocaleLowerCase(),
        password: password,
        full_name: full_name,
        date_of_birth: date_of_birth,
        role: role,
      })
    );
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          style={styles.image}
          name="chevron-back-sharp"
          size={35}
          color="#FF5733"
        ></Ionicons>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Text style={styles.sginInDesign}>Create Account</Text>
      </View>
      <View>
        <TextInput 
          value={full_name}
          onChangeText={(text) => setName(text.trim())}
          placeholder="Full Name"
          style={styles.inputField}
        />
        <TextInput 
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          placeholder="E-mail"
          keyboardType="email-address" 
          style={styles.inputField}
        />
        <TextInput 
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.inputField}
        />
        <TextInput 
          value={password_confirmation}
          onChangeText={(text) => setPassword_Confirmation(text.trim())}
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.inputField}
        />
        <TextInput 
          value={username}
          onChangeText={(text) => setUsername(text.trim())}
          placeholder="Username"
          style={styles.inputField}
        />
        <TextInput 
          value={date_of_birth}
          onChangeText={(text) => setDateOfBirth(text.trim())}
          placeholder="Date Of Birth"
          style={styles.inputField}
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
      >
        <Text style={{ marginRight: 10 }}>Role:</Text>
        <Switch
          value={role === "owner"}
          onValueChange={(value) => setRole(value ? "owner" : "user")}
        />
        <Text>{role === "owner" ? "Owner" : "User"}</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Button 
          title="Sign Up"
          color="#4CAF50"
          onPress={() => signUpFun()}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              marginLeft: 5,
              color: "#FF5733",
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  sginInDesign: {
    color: "#FF5733",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  image: {
    height: 30,
    width: 50,
    borderRadius: 25,
    borderColor: "#000",
    margin: 10,
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
