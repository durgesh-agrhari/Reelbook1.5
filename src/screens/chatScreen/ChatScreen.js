import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stories from '../homeScreen/Stories';
import ChatsScreen from './chatpage/ChatsScreen';
import ChatTabs from './ChatTabs';
import Internet from '../splashScreen/Internet';
import HomeBannerAds from '../adsManager/HomeBannerAds';

const ChatScreen = () => {
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: THEME.data === 'LIGHT' ? 'white' : 'black'},
      ]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
            style={{
              marginLeft: 10,
              color: THEME.data === 'LIGHT' ? 'black' : 'white',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[
              styles.headerText,
              {color: THEME.data === 'LIGHT' ? 'black' : 'white'},
            ]}>
            Chat Now
          </Text>
        </TouchableOpacity>
      </View>
      <Divider style={{backgroundColor: 'gray', height: 2, opacity: 0.2}} />

      <View style={{marginTop: 10, marginBottom: 10}}>
        <Stories />
      </View>
      <HomeBannerAds/>
      <ChatsScreen />
      {/* <ChatTabs /> */}
      <Internet/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 18,
    marginRight: 30,
  },
});

export default ChatScreen;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
// } from 'react-native';

// import backendURL, {GET_All_Users} from '../../utils/Strings';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import Stories from '../homeScreen/Stories';
// import {Divider} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';
// import ChatTabs from './ChatTabs';
// import { useSelector } from 'react-redux';
// import ChatsScreen from './chatpage/ChatsScreen';

// type User = {
//   id: string;
//   name: string | null; // Handle cases where name might be null
//   username: string | null; // Handle cases where username might be null
//   profilePicture: string;
// };

// const ChatScreen = () => {
//   const THEME = useSelector(state=> state.theme)
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={[styles.container, {backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'}]}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons
//             name="chevron-back"
//             size={30}
//             style={{marginLeft: 10, color: THEME.data == 'LIGHT' ? 'black' : 'white'}}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//         // onPress={()=> {navigation.navigate('ChatTabs')}}
//         // onPress={() => navigation.navigate('ChatTabs')}
//         >
//         <Text style={[styles.hederText,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Chat Now</Text>
//         </TouchableOpacity>
//       </View>
//       <Divider />

//       <View style={{marginTop: 10, marginBottom: 10}}>
//         <Stories />
//       </View>
//       <ChatsScreen/>
//       {/* <ChatTabs/> */}

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000', // Black background
//   },
//   searchContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     paddingVertical: 10,
//     marginTop: 10,
//     position: 'relative',
//     marginBottom:10
//   },
//   searchIcon: {
//     fontSize: 30,
//     opacity: 0.7,
//     position: 'absolute',
//     left: 20,
//     zIndex: 1,
//   },
//   searchBar: {
//     width: '100%',
//     backgroundColor: '#EBEBEB',
//     borderRadius: 10,
//     fontSize: 15,
//     padding: 10,
//     paddingLeft: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     color: 'gray',
//     fontWeight: '500',
//   },
//   userItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     backgroundColor: '#1c1c1e', // Dark background for the user item
//     borderRadius: 8,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//     backgroundColor: 'black',
//     borderWidth: 1,
//     borderColor: 'gray',
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     color: '#fff', // White text for the name
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   userHandle: {
//     color: '#aaa', // Gray text for the username and additional info
//     fontSize: 14,
//   },
//   followButton: {
//     backgroundColor: '#0d6efd', // Blue background for follow button
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginLeft: 8,
//   },
//   messageButton: {
//     backgroundColor: 'gray', // Blue background for follow button
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//   },
//   followText: {
//     color: '#fff', // White text for follow button
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   messageText: {
//     color: '#fff', // White text for follow button
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//   },
//   hederText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 18,
//     marginRight: 30,
//   },
// });

// export default ChatScreen;
