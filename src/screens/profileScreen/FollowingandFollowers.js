// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import React, {useState} from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {friendsProfileData} from '../../data/friendsProfileData';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';

// function Followers () {
//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       style={{
//         height: '100%',
//         width: '95%',
//         marginTop: 15,
//         margin: 10,
//       }}>
//       <View>
//         {friendsProfileData.slice(0, 15).map((data, index) => {
//           const [follow, setFollow] = useState(data.follow);
//           return (
//             <View key={index} style={{width: '100%'}}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   paddingVertical: 20,
//                   width: '100%',
//                 }}>
//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     maxWidth: '64%',
//                   }}
//                   onPress={() =>
//                     navigation.push('FriendProfile', {
//                       name: data.name,
//                       profileImage: data.profileImage,
//                       follow: follow,
//                       post: data.posts,
//                       followers: data.followers,
//                       following: data.following,
//                     })
//                   }>
//                   <Image
//                     source={{uri: data.profileImage}}
//                     style={{
//                       width: 45,
//                       height: 45,
//                       borderRadius: 50,
//                       marginRight: 10,
//                       borderColor: 'black',
//                       borderWidth: 2,
//                     }}
//                   />
//                   <Text style={{fontSize: 15, color: 'black'}}>
//                     <Text style={{color: 'black', fontWeight: 'bold'}}>
//                       {data.name}
//                     </Text>
//                     , Who you might know,is on instagram
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{width: follow ? 82 : 72}}
//                   onPress={() => setFollow(!follow)}>
//                   <View
//                     style={{
//                       width: '100%',
//                       height: 30,
//                       borderRadius: 5,
//                       backgroundColor: follow ? '#fff' : '#3493D9',
//                       borderWidth: follow ? 1 : 0,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         color: follow ? 'black' : 'black',
//                         fontWeight: 'bold',
//                       }}>
//                       {follow ? 'Following' : 'Follow'}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         })}
//       </View>
//     </ScrollView>
//   );
// };

// function Following () {
//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       style={{
//         height: '100%',
//         width: '90%',
//         marginTop: 15,
//         margin: 20,
//       }}>
//       <View>
//         {friendsProfileData.slice(0, 8).map((data, index) => {
//           const [follow, setFollow] = useState(data.follow);
//           return (
//             <View key={index} style={{width: '100%'}}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   paddingVertical: 20,
//                   width: '100%',
//                 }}>
//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     maxWidth: '64%',
//                   }}
//                   onPress={() =>
//                     navigation.push('FriendProfile', {
//                       name: data.name,
//                       profileImage: data.profileImage,
//                       follow: follow,
//                       post: data.posts,
//                       followers: data.followers,
//                       following: data.following,
//                     })
//                   }>
//                   <Image
//                     source={{uri: data.profileImage}}
//                     style={{
//                       width: 45,
//                       height: 45,
//                       borderRadius: 50,
//                       marginRight: 10,
//                       borderColor: 'black',
//                       borderWidth: 2,
//                     }}
//                   />
//                   <Text style={{fontSize: 15, color: 'black'}}>
//                     <Text style={{color: 'black', fontWeight: 'bold'}}>
//                       {data.name}
//                     </Text>
//                     , Who you might know,is on instagram
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{width: follow ? 78 : 85}}
//                   onPress={() => setFollow(!follow)}>
//                   <View
//                     style={{
//                       width: '100%',
//                       height: 30,
//                       borderRadius: 5,
//                       backgroundColor: follow ? '#3493D9' : '#fff',
//                       borderWidth: follow ? 1 : 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       borderColor: 'black',
//                       borderColor: 'black',
//                       // paddingLeft:4,
//                       // paddingRight:4,
//                     }}>
//                     <Text
//                       style={{
//                         color: follow ? 'black' : 'black',
//                         fontWeight: 'bold',
//                       }}>
//                       {follow ? 'Follow' : 'Following'}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         })}
//       </View>
//     </ScrollView>
//   );
// };

// function Suggestion () {
//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       style={{
//         height: '100%',
//         width: '90%',
//         marginTop: 15,
//         margin: 20,
//       }}>
//       <View>
//         {friendsProfileData.slice(0, 25).map((data, index) => {
//           const [follow, setFollow] = useState(data.follow);
//           const [close, setClose] = useState(false);
//           return (
//             <View key={index}>
//               {close ? null : (
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     paddingVertical: 10,
//                     width: '100%',
//                     justifyContent: 'space-between',
//                   }}>
//                   <View>
//                     <TouchableOpacity
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         maxWidth: '64%',
//                       }}
//                       onPress={() =>
//                         navigation.push('FriendProfile', {
//                           name: data.name,
//                           profileImage: data.profileImage,
//                           follow: follow,
//                           post: data.posts,
//                           followers: data.followers,
//                           following: data.following,
//                         })
//                       }>
//                       <Image
//                         source={{uri: data.profileImage}}
//                         style={{
//                           width: 45,
//                           height: 45,
//                           borderRadius: 50,
//                           marginRight: 10,
//                           borderColor: 'green',
//                           borderWidth: 2,
//                         }}
//                       />
//                       <View style={{width: '100%'}}>
//                         <Text
//                           style={{
//                             color: 'black',
//                             fontSize: 14,
//                             fontWeight: 'bold',
//                           }}>
//                           {data.name}
//                         </Text>
//                         <Text
//                           style={{
//                             color: 'black',
//                             fontSize: 12,
//                             opacity: 0.5,
//                           }}>
//                           {data.accountName}
//                         </Text>
//                         <Text
//                           style={{
//                             color: 'black',
//                             fontSize: 12,
//                             opacity: 0.5,
//                           }}>
//                           Suggested for you
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     {follow ? (
//                       <TouchableOpacity
//                         style={{width: follow ? 90 : 68}}
//                         onPress={() => setFollow(!follow)}>
//                         <View
//                           style={{
//                             width: '100%',
//                             height: 30,
//                             borderRadius: 5,
//                             backgroundColor: follow ? null : '#3493D5',
//                             borderWidth: follow ? 1 : 0,
//                             borderColor: '#DEDEDE',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}>
//                           <Text style={{color: follow ? '#3493D9' : 'black'}}>
//                             {follow ? 'following' : 'follow'}
//                           </Text>
//                         </View>
//                       </TouchableOpacity>
//                     ) : (
//                       <>
//                         <TouchableOpacity
//                           style={{width: follow ? 90 : 68}}
//                           onPress={() => setFollow(!follow)}>
//                           <View
//                             style={{
//                               width: '100%',
//                               height: 30,
//                               borderRadius: 5,
//                               backgroundColor: follow ? null : '#3493D5',
//                               borderWidth: follow ? 1 : 0,
//                               borderColor: '#DEDEDE',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                             }}>
//                             <Text
//                               style={{color: follow ? '#3493D9' : 'black'}}>
//                               {follow ? 'following' : 'follow'}
//                             </Text>
//                           </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           style={{
//                             paddingHorizontal: 15,
//                             backgroundColor: 'gray',
//                             marginLeft: 8,
//                             padding: 6,
//                             paddingLeft: 25,
//                             paddingRight: 25,
//                             borderRadius: 5,
//                             borderColor: 'black',
//                             borderWidth: 1,
//                           }}
//                           onPress={() => setClose(true)}>
//                           <AntDesign
//                             name="close"
//                             style={{
//                               fontSize: 14,
//                               color: 'black',
//                               opacity: 0.8,
//                             }}
//                           />
//                         </TouchableOpacity>
//                       </>
//                     )}
//                   </View>
//                 </View>
//               )}
//             </View>
//           );
//         })}
//       </View>
//     </ScrollView>
//   );
// };


// const FollowingandFollowers = () => {
//   const navigation = useNavigation();
//   const Tab = createMaterialTopTabNavigator();

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons
//             name="chevron-back"
//             size={30}
//             color="black"
//             style={{marginLeft: 10}}
//           />
//         </TouchableOpacity>
//         <Text style={styles.hederText}>MeraJosh</Text>
//       </View>
//       <Tab.Navigator>
//         <Tab.Screen name="Followers" component={Followers} />
//         <Tab.Screen name="Following" component={Following} />
//         <Tab.Screen name="Suggestion" component={Suggestion} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 15,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   backbtn: {
//     width: 40,
//     height: 40,
//     marginLeft: 20,
//   },
//   hederText: {
//     fontWeight: '700',
//     fontSize: 20,
//     marginRight: 30,
//     color: 'black',
//   },
// });

// export default FollowingandFollowers;
