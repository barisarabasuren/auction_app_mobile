import React, { useCallback } from 'react'
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { httpGetCollections } from '../../hooks/requests'
import GalleryCard from './GalleryCard'
import { useNavigation } from "@react-navigation/native";

const GalleryList = ({galleries, handleSetCollections }) => {
    const navigation = useNavigation();

    const handleGalleryPress = useCallback( async(id) => {
        const collections = await httpGetCollections(id)
        handleSetCollections(collections)
        navigation.navigate('Discover', { screen: 'CollectionList'})
    }, [])

    if(galleries === undefined) {
        return(
            <Text>Nope</Text>
        )
    } else {
        const list = galleries.map(gallery => {
            return(
                <View key={gallery.gallery_id}>
                    <TouchableOpacity onPress={() => handleGalleryPress(gallery.gallery_id)}>
                        <GalleryCard 
                            gallery={gallery}
                        />
                    </TouchableOpacity> 
                </View>  
            )
        })
        return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {list}
                </ScrollView>
            </View>  
        )
    }
}

export default GalleryList;

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
