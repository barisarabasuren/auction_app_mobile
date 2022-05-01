import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import BidHistoryCard from '../components/BidHistoryCard';
import useBidHistory from '../hooks/useBidHistory';
import { useNavigation } from "@react-navigation/native";

const BidHistory = ({bidHistoryArtworks, handleSetBidHistoryArtworks, handleSetBidDetail}) => {
  handleSetBidHistoryArtworks(useBidHistory())

  const navigation = useNavigation();

  const handleArtworkPress = (artwork) => {
    handleSetBidDetail(artwork)
    navigation.navigate('Bid History', { screen: 'Detail'})
  }

  const renderHistoryCards = () => {
    const cards = bidHistoryArtworks.map(artwork => {
      return(
        <TouchableOpacity key={artwork.artwork_id} onPress={() => handleArtworkPress(artwork)}>
          <BidHistoryCard artwork={artwork}/>
        </TouchableOpacity>
      )
    })
    return cards
  }

  if(bidHistoryArtworks) {
    return(
      <View  style={styles.container}>
        <ScrollView  showsVerticalScrollIndicator={false}>
          {renderHistoryCards()}
        </ScrollView>
      </View>
    )
  } else {
    return(
      <View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: 20,
    paddingRight: 20
  },
});

export default BidHistory
