import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
// import {Slider} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
// import TrackPlayer from 'react-native-track-player';
// import TrackPlayer, {Capability} from 'react-native-track-player';

import {songs} from '../../data/MusicData';

const {width, height} = Dimensions.get('window');

const Music = () => {
  const route = useRoute();
  const [currentSong, setCurrentsong] = useState(route.params.index);
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 100);
  }, []);

  // useEffect(() => {
  //   setupPlayer();
  // }, []);

  // const setupPlayer = async () => {
  //   try {
  //     await TrackPlayer.setupPlayer();
  //     // The player is ready to be used
  //     await TrackPlayer.updateOptions({
  //       // Media controls capabilities
  //       capabilities: [
  //         Capability.Play,
  //         Capability.Pause,
  //         Capability.SkipToNext,
  //         Capability.SkipToPrevious,
  //         Capability.Stop,
  //       ],

  //       // Capabilities that will show up when the notification is in the compact form on Android
  //       compactCapabilities: [Capability.Play, Capability.Pause],

  //       // Icons for the notification on Android (if you don't like the default ones)
  //       // playIcon: require('./play-icon.png'),
  //       // pauseIcon: require('./pause-icon.png'),
  //       // stopIcon: require('./stop-icon.png'),
  //       // previousIcon: require('./previous-icon.png'),
  //       // nextIcon: require('./next-icon.png'),
  //       // icon: require('./notification-icon.png'),
  //     });
  //     await TrackPlayer.add(songs);
  //   } catch (e) {}
  // };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={songs}
          renderItem={({item, index}) => {
            return (
              <View style={styles.imagebox}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold '}}>
                    {item.singer}
                  </Text>
                  <Text style={{fontSize: 12}}>{item.title}</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <View style={{marginTop: 30, width: '90%', alignSelf: 'center'}}>
            {/* <Slider /> */}
            <Slider
              // style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="green"
              maximumTrackTintColor="#000000"
            />
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (currentSong > 0) {
                  setCurrentsong(currentSong - 1);
                  ref.current.scrollToIndex({
                    animated: true,
                    index: currentSong - 1,
                  });
                }
              }}>
              <AntDesign name="stepbackward" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={async () => {
            //   await TrackPlayer.skip(1);
            //   await TrackPlayer.play();
            // }}
            >
              <AntDesign name="play" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (songs.length - 1 > currentSong) {
                  setCurrentsong(currentSong + 1);
                  ref.current.scrollToIndex({
                    animated: true,
                    index: currentSong + 1,
                  });
                }
              }}>
              <AntDesign name="stepforward" size={40} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity>
              <Feather name="repeat" size={40} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="hearto" size={40} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Music;

const styles = StyleSheet.create({
  imagebox: {
    width: width,
    height: height / 2,
  },
  image: {
    width: '90%',
    height: '80%',
    borderRadius: 20,
    marginTop: 50,
    marginHorizontal: 20,
  },
});
