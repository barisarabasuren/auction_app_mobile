import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { Card, Title, Button, List } from 'react-native-paper';
import BeginCountdown from './countdowns/BeginCoundown';
import EndCountdown from './countdowns/EndCountdown';
import { useNavigation } from "@react-navigation/native";

const ArtworkDetail = ({artwork}) => {
    const [isAuctionOn, setIsAuctionOn] = useState('loading')
    const [startAuction, setStartAuction] = useState(false)
    const [endAuction, setEndAuction] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const navigation = useNavigation();

    const handleStartAuction = () => {
        setStartAuction(true)
    }

    const handleEndAuction = () => {
        setEndAuction(true)
    }

    const calculateRemainingTimeToStart = () => {
        const auctionStarts = new Date(artwork.auction_starts).getTime()
        const now = new Date().getTime()
    
        return(auctionStarts - now) / 1000
    }

    const calculateRemainingTimeToEnd = () => {
        const auctionEnds = new Date(artwork.auction_ends).getTime()
        const now = new Date().getTime()
    
        return(auctionEnds - now) / 1000
    }

    const auctionStartsIn = calculateRemainingTimeToStart()
    const auctionEndsIn = calculateRemainingTimeToEnd()

    useEffect(() => {
        if(isAuctionOn === 'loading') {
            if(auctionStartsIn > 0){
                setIsAuctionOn(false)
            } else {
                if(auctionEndsIn > 0) {
                    setIsAuctionOn(true)
                    setButtonDisabled(false)
                } else {
                    setIsAuctionOn('ended')
                }
            }
        }
    }, [artwork])

    useEffect(() => {
        if(startAuction) {
            setIsAuctionOn(true)
            setButtonDisabled(false)
        }
    }, [startAuction])

    useEffect(() => {
        if(endAuction) {
            setIsAuctionOn('ended')
            setButtonDisabled(true)
        }
    }, [endAuction])
    
    const renderCounterZone = () => {
        if(isAuctionOn === 'loading') {
            return(
                <View>
                    <Text>
                        Spin
                    </Text>
                </View>
            )
        } else if(isAuctionOn === false) {
            return(
                <View>
                    <View style={ styles.counterContainer }>
                        <BeginCountdown 
                            auctionStartsIn={auctionStartsIn}
                            handleStartAuction={handleStartAuction}
                        />
                    </View>
                    <List.Section>
                        <List.Item 
                            style={styles.listItem} 
                            title='Beginning Price'
                            description={`- ${artwork.beginning_price} €`}
                            titleStyle={styles.itemTitle}
                            descriptionStyle={styles.descriptionStyle}
                        />
                    </List.Section>
                </View>
                
            )
        } else if(isAuctionOn === true) {
            return(
                <View>
                    <View style={ styles.counterContainer }>
                    <EndCountdown 
                        auctionEndsIn={auctionEndsIn}
                        handleEndAuction={handleEndAuction}
                    />
                    </View>
                    <List.Section>
                    {
                        artwork.bids.length ?
                        <List.Item 
                            style={styles.listItem} 
                            title='Highest Bid'
                            description={`- ${artwork.bids[artwork.bids.length - 1].price} €`}
                            titleStyle={styles.itemTitle}
                            descriptionStyle={styles.descriptionStyle}
                        />
                        : 
                        <View/>
                    }
                    <List.Item 
                        style={styles.listItem} 
                        title='Beginning Price'
                        description={`- ${artwork.beginning_price} €`}
                        titleStyle={styles.itemTitle}
                        descriptionStyle={styles.descriptionStyle}
                    />
                    </List.Section>
                </View>
                
                
            )
        } else if(isAuctionOn === 'ended') {
            return(
                <View>
                    <View style={ styles.counterContainer }>
                        <Text style={styles.text}>Ended</Text>
                    </View>
                    <List.Section>
                        <List.Item 
                            style={styles.listItem} 
                            title='Final Bid'
                            description={`- ${artwork.bids[artwork.bids.length - 1].price} €`}
                            titleStyle={styles.itemTitle}
                            descriptionStyle={styles.descriptionStyle}
                        />
                        <List.Item 
                            style={styles.listItem} 
                            title='Beginning Price'
                            description={`- ${artwork.beginning_price} €`}
                            titleStyle={styles.itemTitle}
                            descriptionStyle={styles.descriptionStyle}
                        />
                    </List.Section>
                </View>
            )
        }
    }

    const handleBidButton = () => {
        navigation.navigate('Discover', { screen: 'Bid'})
    }

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card style={styles.cardContainer}>
                    <Card.Cover resizeMethod='scale' style={styles.cover} source={{ uri: artwork.image }}/>
                </Card>
                <Title style={styles.title}>{artwork.artwork_name}</Title>
                {renderCounterZone()}
                <Button
                    style={styles.button}
                    mode="outlined"
                    color="black"
                    disabled={buttonDisabled}
                    onPress={() => handleBidButton()}
                >
                    Place Bid
                </Button>
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
    cardContainer: {
        borderColor: 'black',
        marginBottom: 20,
    },
    cover: {
        height: 300,
        padding: 1,
        backgroundColor: 'white'
    }, 
    title: {
        color: 'white',
        alignSelf: 'center',
    },
    counterContainer: {
        marginTop: 20,
        alignItems: 'center',
        height: 120,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        borderRadius: 5
    }, 
    text: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        alignSelf: 'center'
    },
    button: {
        borderColor: "white",
        alignSelf: "center",
        backgroundColor: "white",
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'stretch',
    },
    listItem: { 
        color: 'white',
        backgroundColor: '#1e1e1e',
        marginBottom: 3
    },
    itemTitle: {
        color: 'white',
        fontSize: 18
    },
    descriptionStyle: {
        color: 'white',
        fontSize: 17,
        marginTop: 10
    }
});

export default ArtworkDetail