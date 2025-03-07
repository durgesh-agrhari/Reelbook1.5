import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {musicList} from '../../data/musicList';
import {useNavigation} from '@react-navigation/native';

// import TrackPlayer, { Capability } from 'react-native-track-player';
const bg =
  'https://ih0.redbubble.net/image.2546240015.6926/raf,360x360,075,t,fafafa:ca443f4786.jpg';

const MusicPlayer = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  // const playbackState = useVideoPlayer()

  useEffect(() => {
    setPlayer();
  }, []);

  const setPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        CompactCapabilities: [Capability.Play, Capability.Pause],
      });

      await TrackPlayer.add(musicList);
    } catch (e) {}
  };
  return (
    <View style={{marginTop: 0, position: 'relative'}}>
      <Image source={{uri: bg}} style={styles.mainContainer} />
      <View
        style={{
          position: 'absolute',
          top: 15,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 25,
            marginRight: 40,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Play</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '75%',
              height: 40,
              backgroundColor: '#044263',
              borderRadius: 5,
              flexDirection: 'row',
              padding: 5,
              paddingLeft: 10,
              opacity: 0.6,
            }}>
            <FontAwesome name="search" size={24} color="white" />
            <TextInput
              placeholder="Find your playlist"
              placeholderTextColor="white"
              style={{marginLeft: 10, width: 240}}
            />
          </View>
          <View
            style={{
              width: '20%',
              height: 40,
              backgroundColor: '#044263',
              borderRadius: 5,
              flexDirection: 'row',
              padding: 5,
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.6,
            }}>
            <Text style={{color: 'white'}}>Sort List</Text>
          </View>
        </View>
        <Image
          source={{uri: musicList[currentIndex].image}}
          style={{
            width: '75%',
            height: 350,
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 20,
          }}>
          <Image
            source={{
              uri: 'https://cdn.iconscout.com/icon/free/png-256/free-spotify-3166423-2641594.png?f=webp',
            }}
            style={{width: 40, height: 40}}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
              color: 'white',
            }}>
            English Song
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginLeft: 10,
              color: 'white',
              opacity: 0.5,
            }}>
            255 views | 20+ saved |
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginLeft: 5,
              color: 'white',
              opacity: 0.5,
            }}>
            Duration 3:30 minites
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Feather
              name="plus-circle"
              size={30}
              color="white"
              style={{marginRight: 10, opacity: 0.6}}
            />
            <Entypo
              name="arrow-with-circle-down"
              size={30}
              color="white"
              style={{marginRight: 10, opacity: 0.6}}
            />
            <Entypo
              name="dots-three-horizontal"
              size={30}
              color="white"
              style={{marginRight: 10, opacity: 0.6}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              name="swap"
              size={40}
              color="white"
              style={{marginRight: 10, opacity: 0.6}}
            />
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }}>
              <MaterialIcons
                name="play-circle-fill"
                size={40}
                color="green"
                style={{marginRight: 10, opacity: 1}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={musicList}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <ScrollView>
                  <TouchableOpacity
                    style={{
                      width: 100,
                      heigh: 100,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: 20,
                      paddingRight: 0,
                      marginTop: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{uri: item.image}}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 5,
                          marginTop: 10,
                        }}
                      />
                      <View style={{paddingTop: 10}}>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 15,
                            width: '100%',
                          }}>
                          {item.user}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 15,
                            width: '100%',
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 15,
                            width: '100%',
                          }}>
                          3:20 minites
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Entypo
                        name="dots-three-horizontal"
                        size={30}
                        color="white"
                        style={{
                          marginLeft: 45,
                          opacity: 0.6,
                          justifyContent: 'center',
                          paddingTop: 20,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});
