import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
// import {profiledata} from '../../data/profiledata';
import axios from 'axios';
// import Share from 'react-native-share';
import {useInstaContext} from '../../context/InstaContext';
import backendURL, {
  DELETE_POST,
  FEEDS,
  LIKE_POST,
  UPDATE_POST,
  USER_POST_DATA,
} from '../../utils/Strings';
import ProfilePostTabData from './ProfilePostTabData';
import PostOptionModal from '../../components/PostOptionModal';
import Loader from '../../components/Loader';
import PostUpdateModal from '../../components/PostUpdateModal';
import ProfileVPS from './ProfileVPS';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserData} from '../../redux/AuthSlice';

const ProfileDetails = ({navigation}) => {
  // const [userData, setUserData] = useState({});

  const THEME = useSelector(state=> state.theme)
  const {userToken} = useInstaContext();
  const [feeds, setFeeds] = useState([]);
  const [openOption, setopenOption] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {userData} = useSelector(s => s.auth);
  const dispatch = useDispatch();
  async function getData() {
    // axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
    //   setUserData(res.data.data);
    //   getUserPostData(res.data.data._id);
    // });
  }

  useEffect(() => {
    // getData();
    getUserPostData(userData?._id);
  }, []);

  const getUserPostData = id => {
    fetch(backendURL + USER_POST_DATA + '/' + id)
      .then(res => res.json())
      .then(json => {
        json.data.reverse();
        setFeeds(json.data);
      });
  };

  const deletePost = () => {
    setLoading(true);
    const myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + DELETE_POST + '/' + selectedItem._id, {method: 'DELETE'})
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        // getData();
        dispatch(fetchUserData(userToken));
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const updatePost = caption => {
    setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData._id,
      caption: caption,
      username: userData.username,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + UPDATE_POST + '/' + selectedItem._id, {
      method: 'PUT',
      body,
      headers: myHeders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        // getData();
        dispatch(fetchUserData(userToken));
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const likePost = item => {
    setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData._id,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + LIKE_POST + '/' + item._id, {
      method: 'PUT',
      body,
      headers: myHeders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        // getData();
        dispatch(fetchUserData(userToken));
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // getData().finally(() => setRefreshing(false));
    dispatch(fetchUserData(userToken)).finally(() => setRefreshing(false));
  }, []);

  return (
    <View>
      <FlatList
        data={[1, 1, 1]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['green']} // Set indicator color to green
          />
        }
        renderItem={({item, index}) => {
          return (
            <View style={styles.fullWidth}>
              {index == 0 && (
                <View>
                  <View
                    style={{
                      backgroundColor: THEME.data == 'LIGHT'? 'white' : 'black',
                      padding: 10,
                      paddingBottom: 30,
                    }}>
                    <View style={styles.coverContainer}>
                      {userData != null && userData.coverPic != '' ? (
                        <Image
                          source={{uri: userData.coverPic}}
                          style={styles.coverImage}
                        />
                      ) : (
                        <View style={styles.coverPlaceholder}></View>
                      )}
                    </View>
                    <View style={styles.profileContainer}>
                      <View>
                        {userData != null && userData.profilePic != '' ? (
                          <Image
                            source={{uri: userData.profilePic}}
                            style={styles.profileImage}
                          />
                        ) : (
                          <View style={styles.profilePlaceholder}></View>
                        )}
                      </View>
                    </View>
                    <View style={styles.profileTextContainer}>
                      <View style={styles.profileText}>
                        <Text style={[styles.profileName, {color:THEME.data == 'LIGHT'? 'black' : 'white'}]}>{userData ? userData?.name : 'Loading..'}</Text>
                        <Text style={styles.profileUsername}>
                          @{userData ? userData.username : 'Loading...'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Follower and Following Section */}
                  <View
                    style={{
                      // backgroundColor: '#dbd7d7',
                      backgroundColor: THEME.data == 'LIGHT'? '#dbd7d7' : '#3f4d63',
                      paddingTop: 35,
                      borderTopEndRadius: 35,
                      borderTopStartRadius: 35,
                      marginTop: -35,
                      paddingBottom: 55,
                    }}>
                    <View style={styles.followerContainer}>
                      <View style={styles.followerBox}>
                        <Text style={styles.followerCount}>
                          {userData ? feeds.length : 0}
                        </Text>
                        <Text style={styles.followerLabel}>Posts</Text>
                      </View>

                      <TouchableOpacity style={styles.followerBox}>
                        <Text style={styles.followerCount}>
                          {userData ? userData.followers?.length : 0}
                        </Text>
                        <Text style={styles.followerLabel}>Followers</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.followerBox}>
                        <Text style={styles.followerCount}>
                          {userData ? userData.following?.length : 0}
                        </Text>
                        <Text style={styles.followerLabel}>Following</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={[styles.bio,{color:THEME.data == 'LIGHT'? 'black':'white'}]}>{userData?.bio}</Text>
                  </View>

                  <View
                    style={{
                      borderTopEndRadius: 35,
                      borderTopStartRadius: 35,
                      backgroundColor: '#5536ba',
                      marginTop: -35,
                    }}>
                    <View style={styles.profileActions}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.push('EditProfile', {
                            data: userData,
                          })
                        }>
                        <Text style={styles.editProfileButton}>
                          Edit Profile
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => navigation.push('EarningDestboard')}>
                        <View style={styles.earningButton}>
                          <Image
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/512/161/161206.png',
                            }}
                            style={styles.earningIcon}
                          />
                          <Text style={styles.earningText}>Earning</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                      //  onPress={() => myCustomShare()}
                      >
                        <Text style={styles.shareProfileButton}>
                          Share Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              {/* <ProfileVPS /> */}
              {index == 1 && (
                <View style={[styles.postListContainer,{backgroundColor: THEME.data == 'LIGHT'? 'white' : 'black'}]}>
                  <FlatList
                    data={feeds}
                    renderItem={({item, index}) => {
                      return (
                        <View>
                          <ProfilePostTabData
                            data={item}
                            key={index}
                            isFollowed={false}
                            onClickOptions={() => {
                              setSelectedItem(item);
                              setopenOption(true);
                            }}
                            onClickLike={() => {
                              likePost(item);
                            }}
                          />
                        </View>
                      );
                    }}
                  />
                  <ProfileVPS />
                </View>
              )}
            </View>
          );
        }}
      />

      <PostOptionModal
        visible={openOption}
        onClose={() => {
          setopenOption(false);
        }}
        onClick={x => {
          setopenOption(false);
          if (x == 2) {
            deletePost();
          } else if (x == 1) {
            setOpenUpdateModal(true);
          }
        }}
      />
      <Loader visible={loading} />
      <PostUpdateModal
        data={selectedItem}
        visible={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false);
        }}
        onClick={x => {
          setOpenUpdateModal(false);
          updatePost(x);
        }}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//     // Define extracted styles here
// });

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
    backgroundColor: '#5536ba',
  },
  coverContainer: {
    zIndex: 1,
    backgroundColor: '#3f6e4b',
    borderBottomColor: 'green',
    borderWidth: 4,
    borderRadius: 15,
    width: '100%',
  },
  coverImage: {
    height: 140,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 4,
    zIndex: 1,
  },
  coverPlaceholder: {
    height: 140,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 4,
    zIndex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: -80,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 30,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 20,
    borderColor: 'green',
    borderWidth: 4,
    marginBottom: 20,
    backgroundColor: 'gray',
  },
  profilePlaceholder: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 20,
    borderColor: 'green',
    borderWidth: 4,
    marginBottom: 20,
    backgroundColor: 'gray',
  },
  profileTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginLeft: 10,
    marginBottom: 20,
  },
  profileText: {
    padding: 5,
  },
  profileName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  profileUsername: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '500',
  },
  followerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  followerBox: {
    width: 110,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  followerCount: {
    color: 'black',
    fontSize: 18,
  },
  followerLabel: {
    color: 'black',
    fontSize: 16,
  },
  bio: {
    fontWeight: '300',
    marginTop: 10,
    marginHorizontal: 18,
  },
  profileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 0,
    // backgroundColor: '#303030',
    padding: 20,
    borderRadius: 15,
    margin: 15,
  },
  editProfileButton: {
    backgroundColor: '#E1E1e1',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 5,
    textAlign: 'center',
    color: 'black',
  },
  earningButton: {
    flexDirection: 'row',
    backgroundColor: '#E1E1e1',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  earningIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  earningText: {
    color: 'black',
  },
  shareProfileButton: {
    backgroundColor: '#E1E1e1',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 5,
    textAlign: 'center',
    color: 'black',
  },
  postListContainer: {
    marginBottom: 60,
    paddingTop: 35,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
});

export default ProfileDetails;
