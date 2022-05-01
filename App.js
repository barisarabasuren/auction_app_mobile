import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import LandingPage from './src/pages/LandingPage';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import BidHistory from './src/pages/BidHistory';
import Profile from './src/pages/Profile';

import GalleryList from './src/components/gallery/GalleryList';
import CollectionList from './src/components/collection/CollectionList';
import ArtworkList from './src/components/artwork/ArtworkList';

import useGalleries from './src/hooks/useGalleries';
import ArtworkDetail from './src/components/artwork/ArtworkDetail';
import Bid from './src/pages/Bid';
import { CheckLoggedIn } from './src/hooks/checkedLoggedIn';
import BidHistoryDetail from './src/components/BidHistoryDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [collections, setCollections] = useState(undefined)
  const [artworks, setArtworks] = useState(undefined)
  const [artwork, setArtwork] = useState(undefined)
  const [bidHistoryArtworks, setBidHistoryArworks] = useState(undefined)
  const [bidDetail, setBidDetail] = useState(undefined)

  let galleries = useGalleries();

  const handleLoggedIn = (bool) => {
    setLoggedIn(bool)
  }

  const handleSetCollections = (collections) => {
    setCollections(collections)
  }

  const handleSetArtworks = (artworks) => {
    setArtworks(artworks)
  }

  const handleSetArtwork = (artwork) => {
    setArtwork(artwork)
  }

  const handleSetBidHistoryArtworks = (bidHistory) => {
    setBidHistoryArworks(bidHistory)
  }

  const handleSetBidDetail = (artwork) => {
    setBidDetail(artwork)
  }

  CheckLoggedIn(handleLoggedIn)

  const renderContent = () => {
    if(loggedIn === 'loading') {
      return(
        <View>
          <Text>loading</Text>
        </View>
      )
    } else if(loggedIn === false) {
      return(
        <Stack.Navigator
          initialRouteName='LandingPage'
        >
          <Stack.Screen 
            name="LandingPage" 
            component={LandingPage} 
            options={{
              headerTitle: ''
            }}
          />
          <Stack.Screen 
            name="Login" 
            options={{
              headerTitle: ''
            }} 
          >
            {props => <Login {...props} handleLoggedIn={handleLoggedIn}/>}
          </Stack.Screen>
          <Stack.Screen 
            name="SignUp" 
            options={{
              headerTitle: ''
            }} 
          >
          {props => <Signup {...props} handleLoggedIn={handleLoggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
      )
    } else {
      return(
        <Tab.Navigator
          initialRouteName='Discover'
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Discover') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'search-circle'
                        : 'search-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Profile') {
                return (
                  <Ionicons
                    name={focused ? 'person' : 'person-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Bid History') {
                return (
                  <Ionicons
                    name={focused ? 'time' : 'time-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'tomato',
          })}
        >
          <Tab.Screen name='Discover'>
            {() => 
              <Stack.Navigator initialRouteName='GalleryList'>
                <Stack.Screen 
                  name='GalleryList'
                  options={{
                    headerTitle: 'Galleries'
                  }} 
                >
                  {props => 
                    <GalleryList 
                      galleries={galleries}
                      handleSetCollections={handleSetCollections}
                    />
                  }
                </Stack.Screen>
                <Stack.Screen 
                  name='CollectionList'
                  options={{
                    headerTitle: 'Collections'
                  }} 
                >
                  {props => 
                    <CollectionList 
                      collections={collections}
                      handleSetArtworks={handleSetArtworks}
                    />
                  }
                </Stack.Screen>
                <Stack.Screen 
                  name='ArtworkList'
                  options={{
                    headerTitle: 'Artworks'
                  }} 
                >
                  {props => 
                    <ArtworkList 
                      artworks={artworks}
                      handleSetArtwork={handleSetArtwork}
                    />
                  }
                </Stack.Screen>
                <Stack.Screen 
                  name='Artwork'
                >
                  {props => 
                    <ArtworkDetail 
                      artwork={artwork}
                    />
                  }
                </Stack.Screen>
                <Stack.Screen 
                  name='Bid'
                >
                  {props => 
                    <Bid
                      artwork={artwork}
                      handleSetArtwork={handleSetArtwork}
                    />
                  }
                </Stack.Screen>
              </Stack.Navigator>
            }
          </Tab.Screen>
          <Tab.Screen name='Bid History'>
            {() =>
              <Stack.Navigator initialRouteName='History'>
              <Stack.Screen 
                  name='History'
                  options={{
                    headerTitle: 'Bid History'
                  }} 
                >
                  {props => 
                    <BidHistory
                      handleSetBidHistoryArtworks={handleSetBidHistoryArtworks}
                      bidHistoryArtworks={bidHistoryArtworks}
                      handleSetBidDetail={handleSetBidDetail}
                    />
                  }
                </Stack.Screen>
                <Stack.Screen
                  name='Detail'
                  options={{
                    headerTitle: 'Bids'
                  }}
                >
                  {props =>
                    <BidHistoryDetail
                      bidDetail={bidDetail}
                    />
                  }
                </Stack.Screen>
              </Stack.Navigator>
            }
          </Tab.Screen>
          <Tab.Screen name='Profile'>
            { () => 
              <Profile 
                handleLoggedIn={handleLoggedIn}
              />
            }
          </Tab.Screen>
        </Tab.Navigator>
      )
    }
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content"/>
      <NavigationContainer theme={MyTheme}>
        {renderContent()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  }
});

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(0, 0, 0)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 255, 255)',
  },
};
