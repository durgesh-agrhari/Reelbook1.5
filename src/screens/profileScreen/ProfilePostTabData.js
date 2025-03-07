import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';
import {useInstaContext} from '../../context/InstaContext';
import backendURL from '../../utils/Strings';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const timeDifference = previous => {
  const current = new Date();
  var msPreMinute = 60 * 1000;
  var msPreHour = msPreMinute * 60;
  var msPreDay = msPreHour * 24;
  var msPreMonth = msPreDay * 30;
  var msPreYear = msPreMonth * 365;

  var elapsed = current - previous;

  if (elapsed < msPreMinute) {
    return Math.round(elapsed / 1000) + ' second ago';
  } else if (elapsed < msPreHour) {
    return Math.round(elapsed / msPreMinute) + ' minutes ago';
  } else if (elapsed < msPreDay) {
    return Math.round(elapsed / msPreHour) + ' hours ago';
  } else if (elapsed < msPreMonth) {
    return Math.round(elapsed / msPreDay) + ' days ago';
  } else if (elapsed < msPreYear) {
    return Math.round(elapsed / msPreMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPreYear) + ' years ago';
  }
};

const ProfilePostTabData = ({
  data,
  indux,
  onClickOptions,
  onClickLike,
  onFollow,
  isFollowed,
  onReportOption,
}) => {
  const navigation = useNavigation();
  const THEME = useSelector(state=> state.theme)
  // const [userData, setUserData] = useState({});
  // const {userToken} = useInstaContext();
  // async function getData() {
  //   axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
  //     setUserData(res.data.data);
  //   });
  // }
  // useEffect(() => {
  //   getData();
  // }, []);
  const {userData} = useSelector(s=>s.auth);
  const dispatch = useDispatch();

  const checkLiked = () => {
    let isLiked = false;
    data.likes.map((item, index) => {
      if (item == userData?._id) {
        isLiked = true;
      }
    });
    return isLiked;
  };
  return (
    <View>
      <View>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
          }}>
          {/* <Divider
            width={2}
            style={{backgroundColor: 'white', opacity: 0.08, marginTop: 6}}
          /> */}
          {/* #0b1321 */}
          <View style={[{borderRadius:20, backgroundColor:'#5536ba', margin:10},  styles.elevation]}>
          <View
            style={{
              flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
                backgroundColor: '#5536ba',
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                // source={{
                //   uri: 'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg',
                // }}
                source={{uri: userData.profilePic}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderColor: 'white',
                  borderWidth: 2,
                }}
              />
              <View>
                <Text style={styles.username}>{data.username}</Text>
                <Text style={styles.time}>
                  {timeDifference(new Date(data.createdAt))}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <TouchableOpacity
                style={{width: 72}}
                // onPress={() => setFollow(!follow)}
              >
                <View
                  style={{
                    width: '100%',
                    height: 30,
                    borderRadius: 5,
                    // backgroundColor: follow ? '#fff' : '#3493D9',
                    // borderWidth: follow ? 1 : 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderColor: follow ? 'gray' : 'white',
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      // color: follow ? 'gray' : 'white',
                      fontWeight: 'bold',
                    }}>
                    {/* {follow ? 'Following' : 'Follow'} */}
                  </Text>
                </View>
              </TouchableOpacity>
              {userData?._id == data.userId && (
                <TouchableOpacity
                  onPress={() => {
                    onClickOptions();
                  }}>
                  <Feather
                    name="more-vertical"
                    style={{
                      fontSize: 22,
                      color: 'white',
                      paddingLeft: 10,
                      marginVertical: 4,
                    }}
                  />
                </TouchableOpacity>
              )}

              {userData?._id != data.userId && (
                <TouchableOpacity
                  style={styles.followbtn}
                  onPress={() => {
                    onFollow();
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
                    {isFollowed ? 'Unfollow' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: data.imageurl,
              }}
              style={{
                width: '98%',
                height: 400,
                borderRadius:15,
                backgroundColor:'black',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              paddingVertical: 15,
              backgroundColor: '#5536ba',
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => onClickLike()}>
                <AntDesign
                  name={checkLiked() ? 'heart' : 'hearto'}
                  style={{
                    paddingRight: 8,
                    fontSize: 22,
                    color: checkLiked() ? 'red' : 'white',
                  }}
                />
              </TouchableOpacity>
              <Text style={{color: 'white', fontSize:12}}>
                {/* Liked by {like ? 'you and ' : ''}{' '} */}
                {/* {like ? post.likes + 1 : post.likes} Likes */}
                {/* {data.likes.lenght + 'Likes'} */}
                {data.likes?.length + ' Likes'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('PostComments', {
                    id: data._id,
                  })
                }>
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  style={{
                    // paddingLeft: 20,
                    fontSize: 22,
                    color: 'white',
                    paddingRight: 6,
                  }}
                />
              </TouchableOpacity>
              <View style={{marginTop: 2, marginBottom: 2, fontSize:12}}>
                <Text style={{color: 'white'}}>
                  {data.comments.length + ' Comments'}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <FontAwesome
                  name="share"
                  style={{
                    paddingLeft: 20,
                    fontSize: 22,
                    color: 'white',
                    paddingRight: 6,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize:12
                }}>
                365
              </Text>
            </View>

            {userData?._id != data.userId && (
                <TouchableOpacity
                  onPress={() => {
                    onReportOption();
                  }}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 6,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 30,
                    borderColor: 'gray',
                    borderWidth: 0.2,
                    marginLeft: 5,
                  }}>
                  <Entypo
                    name="dots-three-vertical"
                    style={{
                      // marginLeft: 20,
                      fontSize: 22,
                      color: 'white',
                      // paddingRight: 6,
                    }}
                  />
                </TouchableOpacity>
              )}

          </View>
          </View>

          <View style={{marginHorizontal:15, marginTop:5}} >
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                paddingVertical: 2,
                color: THEME.data == 'LIGHT' ? 'black': "gray",
              }}>
              {data.caption}
            </Text>

            <View style={{marginTop: 2, marginBottom: 2}}>
              {/* {!!post.comments.length && (
              <Text style={{color: 'grey'}}>
                View {post.comments.length > 1 ? 'all' : ''}{' '}
                {post.comments.length}{' '}
                {post.comments.length > 1 ? 'Comments' : 'Comment'}
              </Text>
            )} */}
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  // source={{
                  //   uri: 'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg',
                  // }}
                  source={{uri: userData.profilePic}}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    borderColor: 'orange',
                    marginRight: 10,
                  }}
                />
                <TouchableOpacity onPress={() => navigation.push('Comments')}>
                  <Text style={{color: THEME.data == 'LIGHT' ? 'black': "gray", opacity: 0.6}}>
                    add a comment
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-happy"
                    style={{fontSize: 15, color: 'green', marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-neutral"
                    style={{fontSize: 15, color: 'pink', marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-sad"
                    style={{fontSize: 15, color: 'red', marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
        </View>
      </View>
  );
};

export default ProfilePostTabData;
const styles = StyleSheet.create({
  username: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  time: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  followbtn: {
    backgroundColor: 'gray',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
  },
  elevation:{
    elevation:20,
    shadowColor:'#ccc',
    shadowOffset:{
      width:5,
      height:5,
    },
    shadowOpacity:0.5,
    shadowRadius:3.84,

  },
});
