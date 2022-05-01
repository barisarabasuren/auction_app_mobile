import React  from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const GalleryCard = ({gallery}) => {
    const navigation = useNavigation();

    return(
        <Card style={styles.container}>
            <Card.Cover resizeMethod='scale' style={styles.cover} source={{ uri: gallery.logo }} />
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
      borderBottomColor: 'white',
      borderColor: '#424242',
      marginBottom: 20,
    },
    cover: {
        height: 150,
        padding: 10,
        backgroundColor: 'white'
    }
  });

export default GalleryCard