import React  from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';

const CollectionCard = ({collection}) => {
    return(
        <Card style={styles.container}>
            <Card.Cover resizeMethod='scale' style={styles.cover} source={{ uri: collection.image}}/>
            <Title style={styles.title}>{collection.collection_name}</Title>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        marginBottom: 20,
    },
    cover: {
        height: 150,
        padding: 2,
        backgroundColor: 'white'
    }, 
    title: {
        alignSelf: 'center',
    }
  });

export default CollectionCard