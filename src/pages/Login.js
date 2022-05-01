import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  Button,
  TextInput,
  Portal,
  Provider,
  Dialog,
  Paragraph,
} from "react-native-paper";
import { httpUserGetToken } from "../hooks/requests";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

export default function Login({ handleLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const showDialog = () => setAlertVisible(true);
  const hideDialog = () => setAlertVisible(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await httpUserGetToken(user);
      const responseData = await response.json();

      if (response.status === 200) {
        await SecureStore.setItemAsync(
            "accessToken", 
            responseData.accessToken
        );
        await SecureStore.setItemAsync(
            "refreshToken",
            responseData.refreshToken
        );
        handleLoggedIn(true);
      } else if (response.status === 400) {
        showDialog();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          underlineColor="transparent"
          s
          activeOutlineColor="transparent"
          label="Email"
          value={email}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          theme={{
            colors: {
              placeholder: "white",
              text: "white",
              primary: "white",
              underlineColor: "transparent",
              background: "#003489",
            },
          }}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          underlineColor="transparent"
          activeOutlineColor="transparent"
          label="Password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          theme={{
            colors: {
              placeholder: "white",
              text: "white",
              primary: "white",
              underlineColor: "transparent",
              background: "#003489",
            },
          }}
        />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonLogin}
            mode="outlined"
            color="black"
            onPress={() => handleLogin()}
          >
            Login
          </Button>
          <View>
            <Text style={styles.textSignup}>Don't have an account?</Text>
            <Button
                style={styles.buttonSignup}
                mode="outlined"
                color="white"
                uppercase={false}
                onPress={() => navigation.navigate("SignUp")}
            >
                Create an account
            </Button>
          </View>
        </View>
        <Portal>
          <Dialog
            visible={alertVisible}
            onDismiss={hideDialog}
            dismissable={false}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogText}>
              Wrong Credentials
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.dialogText}>Please try again</Paragraph>
            </Dialog.Content>
            <Dialog.Actions style={{ alignSelf: "center" }}>
              <Button
                style={styles.dialogButton}
                color="black"
                onPress={hideDialog}
              >
                Close
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
  input: {
    borderColor: "black",
    backgroundColor: "black",
    marginBottom: 20,
  },
  inputContainer: {
    flex: 0.4,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    flex: 0.6,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonLogin: {
    borderColor: "white",
    marginBottom: 50,
    width: 200,
    alignSelf: "center",
    backgroundColor: "white",
  },
  buttonSignup: {
    marginBottom: 50,
    width: 200,
    alignSelf: "center",
    borderColor: "white",
  },
  textSignup: {
    color: "white",
    alignSelf: "center",
    marginBottom: 10,
  },
  dialog: {
    backgroundColor: "black",
    borderWidth: 0.5,
    borderColor: "white",
  },
  dialogText: {
    alignSelf: "center",
    color: "white",
  },
  dialogButton: {
    borderColor: "white",
    width: 200,
    alignSelf: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
});
