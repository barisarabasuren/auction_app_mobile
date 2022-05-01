import CountDown from "react-native-countdown-component"
import { StyleSheet, View, Text } from "react-native";

const BeginCountdown = ({ auctionStartsIn, handleStartAuction }) => {
    return(
        <View>
            <Text style={styles.text}>Live Auction Begins in</Text>
            <CountDown
                until={auctionStartsIn}
                onFinish={() => handleStartAuction(true)}
                size={20}
                digitStyle={{backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}}
                digitTxtStyle={{color: 'white'}}
                timeLabelStyle={{color: 'white'}}
                timeLabels={{d: 'DD', h: 'HH', m: 'MM', s: 'SS'}}
            />
        </View>    
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        alignSelf: 'center'
    }
});

export default BeginCountdown