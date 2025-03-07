import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useInstaContext } from '../../context/InstaContext';
import backendURL, {
  DELETE_POST,
  FEEDS,
  GET_USERDATA,
  LIKE_POST,
  UPDATE_POST,
  USER_POST_DATA,
} from '../../utils/Strings';
import ProfilePostTabData from '../profileScreen/ProfilePostTabData';
import PostOptionModal from '../../components/PostOptionModal';
import Loader from '../../components/Loader';
import PostUpdateModal from '../../components/PostUpdateModal';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/AuthSlice';

const UserProfile = ({ route, navigation }) => {
  const { uname, id } = route.params;
  // const [userData, setUserData] = useState({});
  const { userToken } = useInstaContext();
  const [feeds, setFeeds] = useState([]);
  const [openOption, setopenOption] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // async function getData() {
    // axios.post(`${backendURL}/userdata`, { token: userToken }).then(res => {
    //   setUserData(res.data.data);
    //   getUserPostData(route.params.id);
    //   getUserProfile();
    // });
  // }
  const {userData} = useSelector(s=>s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // getData();
    getUserPostData(id)
    getUserProfile()
  }, []);


  // get userprofile data
  const [userprofile, setUserprofile] = useState(null)
  const getUserProfile = () => {
    fetch(backendURL + GET_USERDATA + '/' + route.params.id)
      .then(res => res.json())
      .then(json => {
        json.data.reverse();
        setUserprofile(json.data);
      });
  };


  // get use all post api
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
    fetch(backendURL + DELETE_POST + '/' + selectedItem._id, { method: 'DELETE' })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        // alert('Delete Post successfuly');
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
        // alert('Update Post successfuly');
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

  const checkFollow = id => {
    let isFollowed = false;
    if (userData != null) {
      userData.following?.map(item => {
        if (item == id) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1, 1, 1]}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.fullWidth}>
              {index == 0 && (
                <View>
                  <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('BottomTab'); }}>
                      <Ionicons
                        name="chevron-back"
                        size={30}
                        color="white"
                        style={styles.backIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.usernameText}>{uname}</Text>
                    <View style={styles.optionIconContainer}>
                      <TouchableOpacity>
                        <Entypo name="dots-three-vertical" style={styles.optionIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.coverContainer}>
                    {userprofile != null && userprofile.coverPic != '' ? (
                      <Image
                        source={{ uri: userprofile?.coverPic }}
                        style={styles.coverImage}
                      />
                    ) : (
                      <View style={styles.coverPlaceholder} />
                    )}
                  </View>

                  <View style={styles.profilePicContainer}>
                    <View>
                      {userprofile != null && userprofile.profilePic != '' ? (
                        <Image
                          source={{ uri: userprofile?.profilePic }}
                          style={styles.profilePic}
                        />
                      ) : (
                        <View style={styles.profilePicPlaceholder} />
                      )}
                    </View>
                    <View style={styles.profileInfo}>
                      <Text style={styles.profileName}>{uname}</Text>
                      <Text style={styles.profileHandle}>@{uname}</Text>
                    </View>
                  </View>

                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{userData ? feeds.length : 0}</Text>
                      <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <TouchableOpacity style={styles.statItem}>
                      <Text style={styles.statValue}>{userData ? userData.followers?.length : 0}</Text>
                      <Text style={styles.statLabel}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem}>
                      <Text style={styles.statValue}>{userData ? userData.following?.length : 0}</Text>
                      <Text style={styles.statLabel}>Following</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.bioText}>
                    {/* {userData.bio} */}
                  </Text>

                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {index == 1 && (
                <View style={styles.feedsContainer}>
                  <FlatList
                    data={feeds}
                    renderItem={({ item, index }) => {
                      return (
                        <ProfilePostTabData
                          data={item}
                          key={index}
                          isFollowed={checkFollow(userData._id)}
                          onClickOptions={() => {
                            setSelectedItem(item);
                            setopenOption(true);
                          }}
                          onClickLike={() => {
                            likePost(item);
                          }}
                        />
                      );
                    }}
                  />
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
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  fullWidth: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  backIcon: {
    marginLeft: 10,
    marginTop: 8,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  optionIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    color: 'white',
    marginLeft: 18,
    resizeMode: 'contain',
    fontSize: 22,
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
  profilePicContainer: {
    flexDirection: 'row',
    marginTop: -60,
    zIndex: 1,
    marginLeft: 30,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 20,
    borderColor: 'green',
    borderWidth: 4,
    marginBottom: 20,
    backgroundColor: 'gray',
  },
  profilePicPlaceholder: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 20,
    borderColor: 'green',
    borderWidth: 4,
    marginBottom: 20,
    backgroundColor: 'gray',
  },
  profileInfo: {
    flexDirection: 'row',
    marginTop: 65,
    marginLeft: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  profileHandle: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    width: 110,
    alignItems: 'center',
    backgroundColor: '#1d2620',
    borderRadius: 10,
    padding: 10,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
  },
  statLabel: {
    color: 'white',
    fontSize: 16,
  },
  bioText: {
    color: 'white',
    fontWeight: '300',
    marginTop: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginHorizontal: 0,
    backgroundColor: '#303030',
    padding: 20,
    borderRadius: 15,
    margin: 15,
  },
  actionButton: {
    width: '30%',
  },
  actionButtonText: {
    backgroundColor: '#E1E1e1',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 5,
    textAlign: 'center',
    color: 'black',
  },
  feedsContainer: {
    marginBottom: 60,
  },
});




// import {View, Text, Image, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import {useInstaContext} from '../../context/InstaContext';
// import backendURL, {
//   DELETE_POST,
//   FEEDS,
//   GET_USERDATA,
//   LIKE_POST,
//   UPDATE_POST,
//   USER_POST_DATA,
// } from '../../utils/Strings';
// import ProfilePostTabData from '../profileScreen/ProfilePostTabData';
// import PostOptionModal from '../../components/PostOptionModal';
// import Loader from '../../components/Loader';
// import PostUpdateModal from '../../components/PostUpdateModal';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// const UserProfile = ({route,navigation}) => {
//   const {uname, id} = route.params;
//   const [userData, setUserData] = useState({});
//   const {userToken} = useInstaContext();
//   const [feeds, setFeeds] = useState([]);
//   const [openOption, setopenOption] = useState(false);
//   const [openUpdateModal, setOpenUpdateModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function getData() {
//     axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
//       setUserData(res.data.data);
//       getUserPostData(route.params.id);
//       getUserProfile();
//     });
//   }
//   useEffect(() => {
//     getData();
//   }, []);


//   // get userprofile data
//   const [userprofile, setUserprofile] = useState()
//   const getUserProfile = () => {
//     fetch(backendURL + GET_USERDATA + '/' + route.params.id)
//       .then(res => res.json())
//       .then(json => {
//         json.data.reverse();
//         setUserprofile(json.data);
//       });
//   };

//   // get use all post api
//   const getUserPostData = id => {
//     fetch(backendURL + USER_POST_DATA + '/' + id)
//       .then(res => res.json())
//       .then(json => {
//         json.data.reverse();
//         setFeeds(json.data);
//       });
//   };

//   const deletePost = () => {
//     setLoading(true);
//     const myHeders = new Headers();
//     myHeders.append('Content-Type', 'application/json');
//     fetch(backendURL + DELETE_POST + '/' + selectedItem._id, {method: 'DELETE'})
//       .then(res => res.json())
//       .then(json => {
//         setLoading(false);
//         // alert('Delete Post successfuly');
//         getData();
//       })
//       .catch(error => {
//         setLoading(false);
//         console.log(error);
//       });
//   };

//   const updatePost = caption => {
//     setLoading(true);
//     const myHeders = new Headers();
//     const body = JSON.stringify({
//       userId: userData._id,
//       caption: caption,
//       username: userData.username,
//     });
//     myHeders.append('Content-Type', 'application/json');
//     fetch(backendURL + UPDATE_POST + '/' + selectedItem._id, {
//       method: 'PUT',
//       body,
//       headers: myHeders,
//     })
//       .then(res => res.json())
//       .then(json => {
//         setLoading(false);
//         // alert('Update Post successfuly');
//         getData();
//       })
//       .catch(error => {
//         setLoading(false);
//         console.log(error);
//       });
//   };

//   const likePost = item => {
//     setLoading(true);
//     const myHeders = new Headers();
//     const body = JSON.stringify({
//       userId: userData._id,
//     });
//     myHeders.append('Content-Type', 'application/json');
//     fetch(backendURL + LIKE_POST + '/' + item._id, {
//       method: 'PUT',
//       body,
//       headers: myHeders,
//     })
//       .then(res => res.json())
//       .then(json => {
//         setLoading(false);
//         getData();
//       })
//       .catch(error => {
//         setLoading(false);
//         console.log(error);
//       });
//   };

//   const checkFollow = id => {
//     let isFollowed = false;
//     if (userData != null) {
//       userData.following?.map(item => {
//         if (item == id) {
//           isFollowed = true;
//         }
//       });
//     }
//     return isFollowed;
//   };

//   return (
//     <SafeAreaView style={{backgroundColor:'black'}}>
//       <FlatList
//         data={[1, 1, 1]}
//         renderItem={({item, index}) => {
//           return (
//             <View style={{width: '100%'}}>
//               {index == 0 && (
//                 <View>
//                   <View>
//                     <View>
//                     <View
//                         style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         padding:10
//                         }}>
//                           <TouchableOpacity
//                           onPress={() => {
//                             navigation.navigate('BottomTab');
//                           }}>
//                           <Ionicons
//                             name="chevron-back"
//                             size={30}
//                             color="white"
//                             style={{marginLeft: 10, marginTop:8}}
//                           />
//                         </TouchableOpacity>
//                         <Text style={{fontSize: 24, fontWeight: '500', color: 'white'}}>
//                         {uname}
//                         </Text>

//                         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                         <TouchableOpacity>
//                             <Entypo name="dots-three-vertical" style={{color: 'white',
//                                 marginLeft: 18,
//                                 resizeMode: 'contain',
//                                 fontSize: 22,}} />
//                         </TouchableOpacity>
//                         </View>
//                         </View>
//                     </View>
//                     <View
//                       style={{
//                         zIndex: 1,
//                         backgroundColor: '#3f6e4b',
//                         borderBottomColor: 'green',
//                         borderWidth: 4,
//                         borderRadius: 15,
//                         width: '100%',
//                       }}>
//                       {userData != null && userData.coverPic != '' ? (
//                         <Image
//                           source={{uri: userData.coverPic}}
//                           style={{
//                             height: 140,
//                             width: '100%',
//                             borderRadius: 10,
//                             borderColor: 'gray',
//                             borderWidth: 4,
//                             zIndex: 1,
//                           }}
//                         />
//                       ) : (
//                         <View
//                           style={{
//                             height: 140,
//                             width: '100%',
//                             borderRadius: 10,
//                             borderColor: 'gray',
//                             borderWidth: 4,
//                             zIndex: 1,
//                           }}></View>
//                       )}
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         marginTop: -60,
//                         zIndex: 1,
//                         marginLeft: 30,
//                       }}>
//                       <View>
//                         {userData != null && userData.profilePic != '' ? (
//                           <Image
//                             source={{uri: userData.profilePic}}
//                             style={{
//                               height: 100,
//                               width: 100,
//                               borderRadius: 50,
//                               marginTop: 20,
//                               borderColor: 'green',
//                               borderWidth: 4,
//                               marginBottom: 20,
//                               backgroundColor: 'gray',
//                             }}
//                           />
//                         ) : (
//                           <View
//                             style={{
//                               height: 100,
//                               width: 100,
//                               borderRadius: 50,
//                               marginTop: 20,
//                               borderColor: 'green',
//                               borderWidth: 4,
//                               marginBottom: 20,
//                               backgroundColor: 'gray',
//                             }}></View>
//                         )}
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           marginTop: 65,
//                           marginLeft: 10,
//                         }}>
//                         <View style={{padding: 5}}>
//                           <Text
//                             style={{
//                               color: 'white',
//                               fontSize: 18,
//                               fontWeight: '500',
//                             }}>
//                             {uname}
                            
//                           </Text>
//                           <Text
//                             style={{
//                               color: 'gray',
//                               fontSize: 18,
//                               fontWeight: '500',
//                             }}>
//                             @{uname}
//                           </Text>
//                         </View>
//                       </View>
//                     </View>
//                   </View>

//                   {/* follower ana following */}
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-around',
//                       alignItems: 'center',
//                     }}>
//                     <View
//                       style={{
//                         width: 110,
//                         alignItems: 'center',
//                         backgroundColor: '#1d2620',
//                         borderRadius: 10,
//                         padding: 10,
//                       }}>
//                       <Text style={{color: 'white', fontSize: 18}}>
//                         {userData ? feeds.length : 0}
//                         {/* //data.imageurl */}
//                       </Text>
//                       <Text style={{color: 'white', fontSize: 16}}>Posts</Text>
//                     </View>

//                     <TouchableOpacity
//                       // onPress={() => navigation.navigate('FollowingandFollowers')}
//                       style={{
//                         width: 110,
//                         alignItems: 'center',
//                         backgroundColor: '#1d2620',
//                         borderRadius: 10,
//                         padding: 10,
//                       }}>
//                       <Text style={{color: 'white', fontSize: 18}}>
//                         {userData ? userData.followers?.length : 0}
//                       </Text>
//                       <Text style={{color: 'white', fontSize: 16}}>
//                         Followers
//                       </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       // onPress={() => navigation.navigate('FollowingandFollowers')}
//                       style={{
//                         width: 110,
//                         alignItems: 'center',
//                         backgroundColor: '#1d2620',
//                         borderRadius: 10,
//                         padding: 10,
//                       }}>
//                       <Text style={{color: 'white', fontSize: 18}}>
//                         {userData ? userData.following?.length : 0}
//                       </Text>
//                       <Text style={{color: 'white', fontSize: 16}}>
//                         Following
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   <Text
//                     style={{color: 'white', fontWeight: '300', marginTop: 10}}>
//                     {/* {userData.bio} */}
//                   </Text>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent:'space-around',
//                       marginTop: 15,
//                       marginHorizontal: 0,
//                       backgroundColor: '#303030',
//                       padding: 20,
//                       borderRadius: 15,
//                       margin: 15,
//                     }}>
                   

//                     <TouchableOpacity 
//                     // onPress={() => myCustomShare()}
//                      style={{width:'30%'}}>
//                       <Text
//                         style={{
//                           backgroundColor: '#E1E1e1',
//                           paddingHorizontal: 15,
//                           paddingVertical: 9,
//                           borderRadius: 5,
//                           textAlign: 'center',
//                           color: 'black',
//                         }}>
//                         Follow
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                     // onPress={() => myCustomShare()}
//                      style={{width:'30%'}}>
//                       <Text
//                         style={{
//                           backgroundColor: '#E1E1e1',
//                           paddingHorizontal: 15,
//                           paddingVertical: 9,
//                           borderRadius: 5,
//                           textAlign: 'center',
//                           color: 'black',
//                         }}>
//                         Message
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                     // onPress={() => myCustomShare()}
//                      style={{width:'30%'}}>
//                       <Text
//                         style={{
//                           backgroundColor: '#E1E1e1',
//                           paddingHorizontal: 15,
//                           paddingVertical: 9,
//                           borderRadius: 5,
//                           textAlign: 'center',
//                           color: 'black',
//                         }}>
//                         Share
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               )}
//               {index == 1 && (
//                 <View style={{marginBottom: 60}}>
//                   <FlatList
//                     data={feeds}
//                     renderItem={({item, index}) => {
//                       return (
//                         <ProfilePostTabData
//                           // list={feeds}
//                           data={item}
//                           key={index}
//                         //   isFollowed={false}
//                         //   isFollowed={checkFollow(item.userId)}
//                           isFollowed={checkFollow(userData._id)}
//                           onClickOptions={() => {
//                             setSelectedItem(item);
//                             setopenOption(true);
//                           }}
//                           onClickLike={() => {
//                             likePost(item);
//                           }}
//                           onFollow={() => {
//                             // followUser(item.userId);
//                           }}
//                         />
//                       );
//                     }}
//                   />
//                 </View>
//               )}
//             </View>
//           );
//         }}
//       />

//       <PostOptionModal
//         visible={openOption}
//         onClose={() => {
//           setopenOption(false);
//         }}
//         onClick={x => {
//           setopenOption(false);
//           if (x == 2) {
//             deletePost();
//           } else if (x == 1) {
//             setOpenUpdateModal(true);
//           }
//         }}
//       />
//       <Loader visible={loading} />
//       <PostUpdateModal
//         data={selectedItem}
//         visible={openUpdateModal}
//         onClose={() => {
//           setOpenUpdateModal(false);
//         }}
//         onClick={x => {
//           setOpenUpdateModal(false);
//           updatePost(x);
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default UserProfile;
