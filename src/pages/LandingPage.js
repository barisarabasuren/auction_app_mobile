import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import cover from '../images/cover.png'
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingPage() {
  const navigation = useNavigation()
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={cover}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          style={styles.signUpButton}
          mode= "outlined"
          color= "white"
          onPress={() => navigation.navigate('SignUp')}>
          Create an account
        </Button>
        <Button 
          style={styles.loginButton}
          mode= "outlined"
          color= "black"
          onPress={() => navigation.navigate('Login')}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black'
  },
  imageContainer: {
    flex: 0.7
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    width: 500,
    height: 120,
    marginTop: 150,
    marginBottom: 250
  },
  signUpButton: {
    borderColor: "white",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  loginButton: {
    borderColor: "white",
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
});
