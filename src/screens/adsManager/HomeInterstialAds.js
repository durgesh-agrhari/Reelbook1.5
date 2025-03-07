import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Platform, StatusBar } from 'react-native';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { TouchableOpacity } from 'react-native';

// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-1779800052220862/2069203096';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const HomeInterstialAds = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
            if (Platform.OS === 'ios') {
                // Prevent the close button from being unreachable by hiding the status bar on iOS
                StatusBar.setHidden(true)
            }
        });

        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            if (Platform.OS === 'ios') {
                StatusBar.setHidden(false)
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeOpened();
            unsubscribeClosed();
        };
    }, []);

    // No advert ready to show yet
    if (!loaded) {
        return null;
    }

    return (
        <View style={{ flex: 1, margin:20}}>
            <TouchableOpacity 
            style={{
                width: 150,
                height: 40,
                borderWidth: 4,
                borderColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 3,
            }}
            onPress={() => {
                interstitial.show();
            }}
            >
                <Text>Show Revarded ads</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeInterstialAds

const styles = StyleSheet.create({})