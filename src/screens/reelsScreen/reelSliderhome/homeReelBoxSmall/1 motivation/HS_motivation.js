import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {motivationalReelsData} from '../../../../../data/motivationalReelsData';

const HS_motivation = ({video}) => {
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: 13}}>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Motivational Reels
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {motivationalReelsData.map((reels, index) => (
          <View
            key={index}
            style={{
              borderRadius: 10,
              borderColor: 'gray',
              borderWidth: 3,
              margin: 4,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('MotivationPlayVideoList', {
                  videolist: video,
                })
              }
              style={{borderRadius: 10, backgroundColor: 'gray'}}>
              <Video
                style={{width: 150, height: 260}}
                repeat={true}
                shouldPlay={true}
                muted
                resizeMode="cover"
                source={{uri: reels.video}}
                isLooping
              />

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
                  <Text style={{color: 'white', marginLeft: 18}}>
                    {reels.likes}
                  </Text>
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

export default HS_motivation;
