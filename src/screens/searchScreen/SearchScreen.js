import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import React from 'react';
import SearchHeader from './SearchHeader';
import SearchBox from './SearchBox';
import SearchContent from './SearchContent';
import SearchUsers from './SearchUsers';
import HomeMix from '../homeScreen/HomeMix';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchHeader />
      
      <View>
        {/* <Image
              source={{
                uri: 'https://www.dngappdeveloper.com/images/app-development/android-application-development-banner.jpg',
              }}
              style={{
                width: '98%',
                height: 100,
                borderRadius: 8,
                borderWidth: 3,
                borderColor: 'gray',
                margin: 8,
                padding: 4,
              }}
            /> */}
      </View>
      {/* <SearchUsers /> */}
      <HomeMix/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default SearchScreen;
