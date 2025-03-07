import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds} from 'react-native-google-mobile-ads';
import { TouchableOpacity } from 'react-native';

// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1779800052220862/2597028150';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const HomeRewardedAds = () => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        // Start loading the rewarded ad straight away
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    // No advert ready to show yet
    if (!loaded) {
        return null;
    }


    return (
        <View style={{ flex: 1, margin:20 }}>
            <TouchableOpacity  style={{
                width: 150,
                height: 40,
                borderWidth: 4,
                borderColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 3,
            }}
                onPress={() => {
                    rewarded.show();
                }}
            >
                <Text>Show Interstial ads</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeRewardedAds

const styles = StyleSheet.create({})