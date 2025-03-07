import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import {useInstaContext} from '../../context/InstaContext';
import backendURL, { GET_USERDATA } from '../../utils/Strings';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

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

const PleaseLoginMessage = () => {
  ToastAndroid.show('Please login :)', ToastAndroid.SHORT);
};

const FeedItem = ({
  data,
  indux,
  onClickOptions,
  onClickLike,
  onFollow,
  isFollowed,
  onReportOption,
}) => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme)

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
  const {userData} = useSelector(s => s.auth);
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
  useEffect(() => {
    // getUserProfile(userId)
  }, []);

    // get userprofile data
    const [userprofile, setUserprofile] = useState(null)
    const getUserProfile = () => {
      fetch(backendURL + GET_USERDATA + '/' + userId)
        .then(res => res.json())
        .then(json => {
          json.data.reverse();
          setUserprofile(json.data);
        });
    };
  return (
    <View>
      <View>
        <View style={styles.container}>
          <Divider width={2} style={styles.divider} />
          <View style={[styles.card, styles.elevation]}>
            <View style={styles.cardHeader}>
              <View style={styles.userInfoContainer}>
                {userData?.username == data?.username ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ProfileScreen');
                    }}
                    style={styles.userInfo}>
                    <Image
                      source={{uri: userData.profilePic}}
                      style={styles.profilePic}
                    />
                    <View style={styles.userText}>
                      <Text style={styles.username}>{data.username}</Text>
                      <Text style={styles.time}>
                        {timeDifference(new Date(data.createdAt))}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('UserProfile', {
                        id: data.userId,
                        uname: data.username,
                      });
                    }}
                    style={styles.userInfo}>
                    <Image
                      source={{
                        uri: 'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg',
                      }}
                      style={styles.profilePic}
                    />
                    <View style={styles.userText}>
                      <Text style={styles.username}>{data.username}</Text>
                      <Text style={styles.time}>
                        {timeDifference(new Date(data.createdAt))}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.optionsContainer}>
                {userData?._id == data.userId && (
                  <TouchableOpacity onPress={() => onClickOptions()}>
                    <Feather name="more-vertical" style={styles.moreIcon} />
                  </TouchableOpacity>
                )}

                {userData?._id != data.userId && (
                  <TouchableOpacity
                    style={[styles.followBtn, {width: isFollowed ? 90 : 75}]}
                    onPress={() => onFollow()}>
                    <View
                      style={[
                        styles.followBtnWrapper,
                        {borderColor: isFollowed ? 'gray' : 'white'},
                      ]}>
                      <Text
                        style={[
                          styles.followBtnText,
                          {color: isFollowed ? 'gray' : 'white'},
                        ]}>
                        {isFollowed ? 'Unfollow' : 'Follow'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.imageContainer}>
              {data.imageurl ? (
                <Image source={{uri: data.imageurl}} style={styles.postImage} />
              ) : (
                <View
                  style={{
                    width: '98%',
                    height: 400,
                    borderRadius: 15,
                    backgroundColor: '#5d586e',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="white" />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 22,
                      marginTop: 15,
                    }}>
                    Loading ...
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.actionsContainer}>
              <View style={styles.likeContainer}>
                {userData ? (
                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => onClickLike()}>
                    <AntDesign
                      name={checkLiked() ? 'heart' : 'hearto'}
                      style={[
                        styles.likeIcon,
                        {color: checkLiked() ? 'red' : 'white'},
                      ]}
                    />
                    <Text style={styles.likesText}>
                      {data.likes?.length + ' Likes'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => {
                      PleaseLoginMessage();
                    }}>
                    <AntDesign name="hearto" style={styles.likeIcon} />
                    <Text style={styles.likesText}>
                      {data.likes?.length + ' Likes'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.commentContainer}>
                {userData ? (
                  <TouchableOpacity
                    style={styles.commentBtn}
                    onPress={() =>
                      navigation.push('PostComments', {
                        id: data._id,
                      })
                    }>
                    <MaterialCommunityIcons
                      name="comment-text-outline"
                      style={styles.commentIcon}
                    />
                    <Text style={styles.commentsText}>
                      {data.comments.length + ' Comments'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.commentBtn}
                    onPress={() => {
                      PleaseLoginMessage();
                    }}>
                    <MaterialCommunityIcons
                      name="comment-text-outline"
                      style={styles.commentIcon}
                    />
                    <Text style={styles.commentsText}>
                      {data.comments.length + ' Comments'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.shareContainer}>
                <TouchableOpacity style={styles.shareBtn}>
                  <FontAwesome name="share" style={styles.shareIcon} />
                </TouchableOpacity>
                <Text style={styles.shareText}>365</Text>
              </View>

              {userData?._id != data.userId && (
                <TouchableOpacity
                  onPress={() => {
                    onReportOption();
                  }}
                  style={styles.reportBtn}>
                  <Entypo
                    name="dots-three-vertical"
                    style={styles.reportIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.captionContainer}>
            <Text style={[styles.caption,{color: THEME.data == 'LIGHT' ? 'black': "white"}]}>{data.caption}</Text>
            <View style={styles.commentTextContainer}>
              {/* {!!post.comments.length && (
              <Text style={{color: 'grey'}}>
                View {post.comments.length > 1 ? 'all' : ''}{' '}
                {post.comments.length}{' '}
                {post.comments.length > 1 ? 'Comments' : 'Comment'}
              </Text>
            )} */}
            </View>
            <View style={styles.commentInputContainer}>
              <View style={styles.addCommentContainer}>
                <Image
                  source={{
                    uri: 'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg',
                  }}
                  style={styles.commentProfilePic}
                />
                <TouchableOpacity onPress={() => navigation.push('Comments')}>
                  <Text style={[styles.addCommentText,{color: THEME.data == 'LIGHT' ? 'black': "gray"}]}>add a comment</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.emojiContainer}>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-happy"
                    style={[styles.emojiIcon, {color: 'green'}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-neutral"
                    style={[styles.emojiIcon, {color: 'pink'}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-sad"
                    style={[styles.emojiIcon, {color: 'red'}]}
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

export default FeedItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.1,
  },
  divider: {
    backgroundColor: 'white',
    opacity: 0.08,
    marginTop: 6,
  },
  card: {
    borderRadius: 20,
    // backgroundColor: '#0b1321',
    backgroundColor: '#5536ba',
    margin: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    // backgroundColor: '#0b1321',
    backgroundColor: '#5536ba',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  userText: {
    marginLeft: 6,
  },
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  moreIcon: {
    fontSize: 22,
    color: 'white',
    paddingLeft: 10,
    marginVertical: 4,
  },
  followBtnWrapper: {
    width: '100%',
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  followBtn: {
    width: '100%',
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followBtnText: {
    fontSize: 18,
    fontWeight: '500',
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  postImage: {
    width: '98%',
    height: 400,
    borderRadius: 15,
    backgroundColor: '#5d586e',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 15,
    // backgroundColor: '#0b1321',
    backgroundColor: '#5536ba',
    marginTop: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
  },
  likeContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 0.2,
  },
  likeBtn: {
    flexDirection: 'row',
    marginLeft: -5,
    paddingRight: 16,
    alignItems: 'center',
    padding: 6,
    paddingLeft: 16,
  },
  likeIcon: {
    paddingRight: 8,
    fontSize: 22,
  },
  likesText: {
    color: 'white',
    fontSize: 12,
  },
  commentContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 0.2,
  },
  commentBtn: {
    flexDirection: 'row',
    paddingLeft: 14,
    padding: 6,
    marginLeft: 5,
    paddingRight: 14,
  },
  commentIcon: {
    fontSize: 22,
    color: 'white',
    paddingRight: 6,
  },
  commentsText: {
    color: 'white',
    fontSize: 12,
  },
  shareContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 0.2,
    marginLeft: 5,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 22,
    color: 'white',
    paddingRight: 6,
  },
  shareText: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
  },
  reportBtn: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 0.2,
    marginLeft: 5,
  },
  reportIcon: {
    fontSize: 22,
    color: 'white',
  },
  captionContainer: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  caption: {
    fontWeight: '500',
    fontSize: 14,
    paddingVertical: 2,
  },
  commentTextContainer: {
    marginTop: 2,
    marginBottom: 2,
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentProfilePic: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderColor: 'orange',
    marginRight: 10,
  },
  addCommentText: {
    color: 'black',
    opacity: 0.6,
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiIcon: {
    fontSize: 15,
    marginRight: 10,
  },
});
