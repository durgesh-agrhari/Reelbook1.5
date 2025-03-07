import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {trendingReelsData} from '../../../data/trendingReelsData';

const TrendingReels = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: 13}}>
      <View
        style={{
          backgroundColor: 'gray',
          borderRadius: 20,
          margin: 10,
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: 0.6,
        }}>
        <TouchableOpacity>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Trending feed
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'gray',
            padding: 5,
            borderRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VideoCategoryPage')}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 10,
              }}>
              Choose Video Category
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('VideoCategoryPage')}>
            <Feather name="chevron-down" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {trendingReelsData.map((reels, index) => (
          <View key={index}>
            <TouchableOpacity>
              <Image style={styles.story} source={{uri: reels.image}} />
              <View
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  flexDirection: 'row',
                  padding: 6,
                  bottom: 0,
                }}>
                <Image style={styles.dp} source={{uri: reels.image}} />
                <Text style={{color: 'white', marginLeft: 2}}>
                  {reels.user.length > 10
                    ? reels.user.slice(5, 10).toLowerCase() + '..'
                    : reels.user.toUpperCase()}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'black',
                    opacity: 0.6,
                    borderRadius: 20,
                    paddingRight: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', marginLeft: 18}}>35k</Text>
                  <AntDesign
                    name="heart"
                    style={{fontSize: 15, color: 'red'}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 150,
    height: 260,
    borderRadius: 10,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: 'gray',
  },
  dp: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: 'white',
  },
  like: {
    width: 15,
    height: 15,
    marginBottom: 0,
    marginTop: 3.5,
    marginLeft: 2,
  },
});

export default TrendingReels;
