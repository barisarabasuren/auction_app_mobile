import React  from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {List} from 'react-native-paper'

const BidHistoryDetail = ({bidDetail}) => {
    const renderBidHistory = () => {
        var bidIndex = bidDetail.bids.length + 1
        const bids = bidDetail.bids.reverse().map(bid => {
            bidIndex = bidIndex - 1
            return(
                <List.Item
                    key={bid.bid_id} 
                    style={styles.listItem} 
                    title={`${bidIndex} - ${bid.price} €`}
                    titleStyle={styles.titleStyle}
                />
            )
        })
        return bids
    }

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <List.Section>
                    <List.Subheader style={styles.listHeader}>Your Previous Bids</List.Subheader>
                    {renderBidHistory()}
                </List.Section>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingLeft: 20,
        paddingRight: 20
    },
    listItem: { 
        backgroundColor: '#1e1e1e',
        marginTop: 2
    },
    titleStyle: {
        color: 'white',
        fontSize: 20
    },
    listHeader: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center'
    },
});

export default BidHistoryDetail