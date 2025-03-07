import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import HomeBannerAds from '../adsManager/HomeBannerAds';

const SearchHeader = () => {
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'},
      ]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
            style={{
              marginLeft: 10,
              color: THEME.data == 'LIGHT' ? 'black' : 'white',
            }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.hederText,
            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
          ]}>
          Search
        </Text>
      </View>
      <Divider style={{backgroundColor: 'gray', height: 2, opacity: 0.2}} />
      <HomeBannerAds/>
    </SafeAreaView>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  hederText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    marginRight: 30,
  },
});
