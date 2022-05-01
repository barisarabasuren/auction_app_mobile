import React, {useCallback} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import ArtworkCard from './ArtworkCard'
import { useNavigation } from "@react-navigation/native";
import { httpGetArtwork } from '../../hooks/requests';


const ArtworkList = ({artworks, handleSetArtwork}) => {
    const navigation = useNavigation();

    const handleArtworkPress = useCallback( async(id) => {
        const artwork = await httpGetArtwork(id)
        handleSetArtwork(artwork)
        navigation.navigate('Discover', { screen: 'Artwork'})
    }, [])

    if(artworks === undefined) {
        return(
            <Text>Loading</Text>
        )
    } else {
        const list = artworks.map(artwork => {
            return(
                <View key={artwork.artwork_id}>
                    <TouchableOpacity onPress={() => handleArtworkPress(artwork.artwork_id)}>
                        <ArtworkCard artwork={artwork} />
                    </TouchableOpacity>
                </View>  
            )
        })
        return(
            <View  style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.grid}>
                        {list}
                    </View>
                </ScrollView> 
            </View>  
        )
    }
}

export default ArtworkList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'black'
    },
    grid: {
        
    }
});
