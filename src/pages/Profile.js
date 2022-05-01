import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { List, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import useUser from '../hooks/useUser';
import * as SecureStore from "expo-secure-store";

const Profile = ({handleLoggedIn}) => {
  const user = useUser()

  const handleLogOut = async() => {
    await SecureStore.deleteItemAsync('accessToken')
    await SecureStore.deleteItemAsync('refreshToken')
    handleLoggedIn(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Ionicons style={styles.icon} name='person-circle-outline' size={150} color='white'/>
        <List.Section>
          <List.Item 
            style={styles.listItem} 
            title={`Name:  ${user?.name}`}
            titleStyle={styles.titleStyle}
          />
          <List.Item 
            style={styles.listItem} 
            title={`Surname:  ${user?.surname}`}
            titleStyle={styles.titleStyle}
          />
          <List.Item 
            style={styles.listItem} 
            title={`Email:  ${user?.email}`}
            titleStyle={styles.titleStyle}
          />
        </List.Section>
        <Button
            style={styles.button}
            mode="outlined"
            color="black"
            onPress={() => handleLogOut()}
        >
            Log Out
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center'
  },
  icon: {
    alignSelf: 'center'
  },
  listItem: { 
    backgroundColor: '#1e1e1e',
    marginTop: 2
  },
  titleStyle: {
    color: 'white',
    fontSize: 20
  },
  button: {
    borderColor: "white",
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
});

export default Profile;
