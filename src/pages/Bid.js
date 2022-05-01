import React, {useState} from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import { List } from 'react-native-paper'
import {
    Button,
    TextInput,
} from "react-native-paper";
import { httpBidOnArtwork, httpGetArtwork } from '../hooks/requests';
import { useNavigation } from "@react-navigation/native";

const Bid = ({artwork, handleSetArtwork}) => {
    const [bidPrice, setBidPrice] = useState("");

    const navigation = useNavigation();

    const handleBid = async() => {
        try {
            const response = await httpBidOnArtwork(artwork.artwork_id, bidPrice)
            if(response.status === 200) {
                const newArtwork = await httpGetArtwork(artwork.artwork_id)
                handleSetArtwork(newArtwork)
                navigation.navigate('Discover', { screen: 'Artwork'})
            }
        } catch(err) {
            console.log(err)
        }
    }

    const listedBids = artwork.bids.slice(-5).reverse()

    const renderBids = () => {
        const listItems = listedBids.map(bid => {
            if(bid === listedBids[0]) {
                return(
                    <List.Item 
                        key={bid.bid_id}
                        style={styles.listItem} 
                        title={`${bid.price} €`}
                        titleStyle={[styles.itemTitle, {color: 'white'}]}
                    />
                )
            } else {
                return(
                    <List.Item 
                        key={bid.bid_id}
                        style={styles.listItem} 
                        title={`${bid.price} €`}
                        titleStyle={styles.itemTitle}
                    />
                )
            }
        })
        
        return listItems
    }

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    underlineColor="transparent"
                    activeOutlineColor="transparent"
                    label="Bid"
                    value={bidPrice}
                    autoCapitalize="none"
                    onChangeText={(text) => setBidPrice(text)}
                    keyboardType='numeric'
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
                <Button
                    style={styles.buttonLogin}
                    mode="outlined"
                    color="black"
                    onPress={() => handleBid()}
                >
                    Place Bid
                </Button>
                <List.Section>
                    <List.Subheader style={styles.listHeader}>Last 5 Bids</List.Subheader>
                    {renderBids()}
                </List.Section>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'black',
        justifyContent: 'space-between'
    },
    input: {
        borderColor: "black",
        backgroundColor: "black",
        marginBottom: 20,
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        alignSelf: 'center'
    },
    buttonLogin: {
        borderColor: "white",
        marginBottom: 50,
        width: 200,
        alignSelf: "center",
        backgroundColor: "white",
    },
    listHeader: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center'
    },
    listItem: { 
        backgroundColor: '#1e1e1e',
        borderTopColor: 'grey',
        borderTopWidth: 1
    },
    itemTitle: {
        color: 'grey',
        fontSize: 18
    }
});

export default Bid