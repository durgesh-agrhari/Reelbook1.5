import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import {Divider} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

const poss =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtQFimChCBtcLJdKs0QLRWrLZPUs_nXCL2h8z47-Mkcw&s';
const profile =
  'https://i.pinimg.com/474x/2a/63/7a/2a637ad55088ffa297ed62989b2061ff.jpg';
const music =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

const HomeReelView = () => {
  const navigation = useNavigation();

  const [selectIndex, setSelectIndex] = useState(0);

  const [like, setLike] = useState();
  const [follow, setFollow] = useState();

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={[
          {
            videoLink:
              'https://videos.pexels.com/video-files/7963239/7963239-uhd_1440_2560_25fps.mp4',
          },
          {
            videoLink:
              'https://videos.pexels.com/video-files/3201104/3201104-hd_1080_1920_25fps.mp4',
          },
          {
            videoLink:
              'https://cdn.pixabay.com/video/2021/08/13/84878-588566505_tiny.mp4',
          },
          {
            videoLink:
              'https://videos.pexels.com/video-files/7963239/7963239-uhd_1440_2560_25fps.mp4',
          },
        ]}
        onScroll={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y.toFixed(0) /
              Dimensions.get('window').height,
          );
          setSelectIndex(index);
        }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <Divider
                width={2}
                style={{backgroundColor: 'white', opacity: 0.08}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'gray',
                  padding: 15,
                  opacity: 0.5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    // source={{uri: post.imagelink}}
                    source={{
                      uri: 'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg',
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      borderColor: 'white',
                      borderWidth: 2,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 5,
                      }}>
                      {/* {post.user} */}
                      Durgesh Zone
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Feather
                    name="more-vertical"
                    style={{fontSize: 22, color: 'white'}}
                  />
                </TouchableOpacity>
              </View>

              {/* end */}
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height - 50,
                  top: 0,
                  bottom: 0,
                }}
                // key={index}
              >
                <Video
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 50,
                  }}
                  paused={selectIndex == index ? false : true}
                  repeat={true}
                  shouldPlay={selectIndex == index}
                  resizeMode="cover"
                  source={{uri: item.videoLink}}
                  isLooping
                />

                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 50,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,.1)',
                    top: 0,
                  }}
                  onPress={() => {
                    if (selectIndex == -1) {
                      setSelectIndex(index);
                    } else {
                      setSelectIndex(-1);
                    }
                  }}>
                  {selectIndex == -1 ? (
                    <Ionicons
                      name="play"
                      style={{color: 'white', fontSize: 50}}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>

              {/* start bottom */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  paddingVertical: 15,
                  backgroundColor: '#0b1321',
                  marginTop: 2,
                  marginBottom: 2,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => setLike(!like)}>
                    <AntDesign
                      name={like ? 'heart' : 'hearto'}
                      style={{
                        paddingRight: 20,
                        fontSize: 30,
                        color: like ? 'red' : 'white',
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.push('Comments')}>
                    <MaterialCommunityIcons
                      name="comment-text-outline"
                      style={{paddingRight: 20, fontSize: 30, color: 'white'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <FontAwesome
                      name="share"
                      style={{color: 'white', fontSize: 25}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{width: follow ? 82 : 72}}
                  onPress={() => setFollow(!follow)}>
                  <View
                    style={{
                      width: '100%',
                      height: 30,
                      borderRadius: 5,
                      // backgroundColor: follow ? '#fff' : '#3493D9',
                      borderWidth: follow ? 1 : 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: follow ? 'gray' : 'white',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: follow ? 'gray' : 'white',
                        fontWeight: 'bold',
                      }}>
                      {follow ? 'Following' : 'Follow'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* dfgh */}

              <View>
                <Text style={{color: 'white'}}>
                  Liked by 355
                  {/* {like ? 'you and ' : ''}{' '} */}
                  {/* {like ? post.likes + 1 : post.likes}  */}
                  others
                </Text>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    paddingVertical: 2,
                    color: 'white',
                  }}>
                  if you like post! please like my first poast :)
                </Text>

                {/* <View style={{marginTop: 2, marginBottom: 2}}>
                  {!!post.comments.length && (
                    <Text style={{color: 'grey'}}>
                      View {post.comments.length > 1 ? 'all' : ''}{' '}
                      {post.comments.length}{' '}
                      {post.comments.length > 1 ? 'Comments' : 'Comment'}
                    </Text>
                  )}
                </View> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{
                        uri: 'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg',
                      }}
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 100,
                        borderColor: 'orange',
                        marginRight: 10,
                      }}
                    />
                    <TextInput
                      placeholder="add a comment"
                      placeholderTextColor="white"
                      style={{color: 'white', opacity: 0.6}}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Entypo
                      name="emoji-happy"
                      style={{fontSize: 15, color: 'green', marginRight: 10}}
                    />
                    <Entypo
                      name="emoji-neutral"
                      style={{fontSize: 15, color: 'pink', marginRight: 10}}
                    />
                    <Entypo
                      name="emoji-sad"
                      style={{fontSize: 15, color: 'red', marginRight: 10}}
                    />
                  </View>
                </View>
              </View>

              {/* end bottom */}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeReelView;
