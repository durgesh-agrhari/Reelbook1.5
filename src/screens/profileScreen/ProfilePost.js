// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import React, {useState} from 'react';
// import {users} from '../../data/users';
// // import { Divider, colors } from 'react-native-elements'
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// import {trendingReelsData} from '../../data/trendingReelsData';
// import {motivationalReelsData} from '../../data/motivationalReelsData';
// import {useNavigation} from '@react-navigation/native';
// import PhotoShow from './ReelPostandSaveDataShowInProfile/PhotoShow';
// import ReelShow from './ReelPostandSaveDataShowInProfile/ReelShow';
// import SavedShow from './ReelPostandSaveDataShowInProfile/SavedShow';

// const ProfilePost = () => {
//   const Tab = createMaterialTopTabNavigator();
//   const navigation = useNavigation();

//   // let squares = [];
//   // let numberOfSquare = 15;
//   // for (let index = 0; index < numberOfSquare; index++) {
//   //     squares.push(
//   //         <View key={index}>
//   //             <View style={{
//   //                 // width: 156,
//   //                 // height: 150,
//   //                 marginVertical: 0.5,
//   //                 backgroundColor: "black",
//   //                 opacity: 0.1,
//   //             }}>

//   //             </View>
//   //         </View>
//   //     )
//   // }

//   const Posts = () => {
//     return <View>{/* <PhotoShow /> */}</View>;
//   };
//   const Video = () => {
//     return <View>{/* <ReelShow /> */}</View>;
//   };
//   const Saved = () => {
//     return <View>{/* <SavedShow /> */}</View>;
//   };

//   return (
//     <View style={styles.container}>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarShowLabel: true,
//           tabBarIndicatorStyle: {
//             backgroundColor: 'green',
//             height: 5,
//             borderRadius: 10,
//           },
//           tabBarIcon: ({focused, colour}) => {
//             let iconname;
//             if (route.name === 'Posts') {
//               iconname = focused ? 'grid' : 'grid-outline';
//               colors: focused ? 'black' : 'grey';
//             } else if (route.name === 'Videos') {
//               iconname = focused ? 'play-circle' : 'play-circle-outline';
//               colors: focused ? 'black' : 'grey';
//             } else if (route.name === 'Saved Video') {
//               iconname = focused ? 'save' : 'save-outline';
//               colors: focused ? 'black' : 'grey';
//             }
//             return <Ionicons name={iconname} color="black" size={20} />;
//           },
//         })}>
//         <Tab.Screen name="Posts" component={Posts} />
//         <Tab.Screen name="Videos" component={Video} />
//         <Tab.Screen name="Saved Video" component={Saved} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 10,
//   },
// });

// export default ProfilePost;
