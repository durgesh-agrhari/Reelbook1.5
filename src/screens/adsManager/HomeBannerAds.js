import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-1779800052220862/9142949738';
// const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
// 

const HomeBannerAds = () => {
    // const bannerRef = useRef<BannerAd>(null);
    const bannerRef = useRef(null);

    // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
    // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    })
    return (
        <View >
            <BannerAd 
            ref={bannerRef} 
            unitId={adUnitId} 
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} 
            />
        </View>
    )
}

export default HomeBannerAds

const styles = StyleSheet.create({})