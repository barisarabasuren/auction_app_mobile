import React, { useCallback } from 'react'
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import CollectionCard from './CollectionCard'
import { useNavigation } from "@react-navigation/native";
import { httpGetArtworks } from '../../hooks/requests';

const CollectionList = ({collections, handleSetArtworks}) => {
    const navigation = useNavigation();

    const handleCollectionPress = useCallback( async(id) => {
        const artworks = await httpGetArtworks(id)
        handleSetArtworks(artworks)
        navigation.navigate('Discover', { screen: 'ArtworkList'})
    }, [])

    if(collections === undefined) {
        return(
            <Text>Nope</Text>
        )
    } else {
        const list = collections.map(collection => {
            return(
                <View key={collection.collection_id}>
                    <TouchableOpacity onPress={() => handleCollectionPress(collection.collection_id)}>
                        <CollectionCard collection={collection} />
                    </TouchableOpacity>
                </View>  
            )
        })
        return(
            <View  style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {list}
                </ScrollView> 
            </View>  
        )
    }
}

export default CollectionList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'black'
    }
});
