import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-elements';
import {useInstaContext} from '../../context/InstaContext';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../../redux/ThemeSlice';

const ProfileDestboard = ({navigation}) => {
  // const THEME = useSelector(state => state.theme);
  const THEME = useSelector(state => state.theme);
  const {userToken, removeToken} = useInstaContext();

  async function signout() {
    removeToken();
    navigation.navigate('Explore');
  }

  const {userData} = useSelector(s => s.auth);
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'},
      ]}>
      <View style={styles.editBox}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>
              <Icon
                name="close-outline"
                style={[
                  styles.icon,
                  {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
                ]}
              />
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.headerText,
              {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
            ]}>
            Profile Dashboard
          </Text>
        </View>
        <Divider width={1} />

        <View style={styles.profileSection}>
          <Image
            source={{uri: userData.profilePic}}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData?.name}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.push('Aboutus')}>
          <View style={styles.optionBox}>
            <Text style={styles.optionText}>About MeraJosh</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.push('PrivacyAndPolicy')}>
          <View style={styles.optionBox}>
            <Text style={styles.optionText}>Privacy and Policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.push('EarningDestboard')}>
          <View style={[styles.optionBox, styles.earningBox]}>
            <Text style={styles.optionText}>Earning Option</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.push('YourActivity')}>
          <View style={styles.optionBox}>
            <Text style={styles.optionText}>Your Activity</Text>
          </View>
        </TouchableOpacity>

        <Text
          style={[
            styles.optionText,
            {marginLeft: 15, marginTop: 20},
            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
          ]}>
          {' '}
          Theme Settings{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(changeTheme('DARK'));
          }}>
          <View
            style={[
              styles.optionBox,
              styles.earningBox,
              {backgroundColor: THEME.data == 'LIGHT' ? 'green' : 'gray'},
            ]}>
            <Text style={styles.optionText}>
              {' '}
              Dark Theme{' '}
              <Text style={{color: 'black', backgroundColor: 'white'}}>
                {THEME.data == 'LIGHT' ? null : '  Active  '}
              </Text>{' '}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(changeTheme('LIGHT'));
          }}>
          <View
            style={[
              styles.optionBox,
              styles.earningBox,
              {backgroundColor: THEME.data == 'LIGHT' ? 'gray' : 'green'},
            ]}>
            <Text style={styles.optionText}>
              Light Theme{' '}
              <Text style={{color: 'black', backgroundColor: 'white'}}>
                {THEME.data == 'LIGHT' ? '  Active  ' : null}
              </Text>{' '}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => await signout()}>
          <View style={styles.logoutBox}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black',
  },
  editBox: {
    marginTop: 5,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 35,
  },
  headerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderColor: 'green',
    borderWidth: 4,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  profileName: {
    color: '#3493D9',
    fontSize: 18,
    marginTop: 10,
  },
  optionBox: {
    paddingVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#2b303b',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    paddingLeft: 10,
    marginTop: 15,
    opacity: 0.8,
  },
  earningBox: {
    backgroundColor: '#227023',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    // marginLeft:20,
  },
  logoutBox: {
    paddingVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    paddingLeft: 10,
    marginTop: 55,
    opacity: 0.8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileDestboard;

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ToastAndroid,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {Divider} from 'react-native-elements';
// import {useInstaContext} from '../../context/InstaContext';
// import axios from 'axios';
// import backendURL from '../../utils/Strings';
// import { useDispatch, useSelector } from 'react-redux';

// const img =
//   'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg';

// const ProfileDestboard = ({navigation}) => {
//   const {userToken, removeToken} = useInstaContext();
//   async function signout() {
//     removeToken();
//     navigation.navigate('Explore');
//   }

//   // const [userData, setUserData] = useState({});
//   // async function getData() {
//   //   axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
//   //     setUserData(res.data.data);
//   //   });
//   // }
//   // useEffect(() => {
//   //   getData();
//   // }, []);

//   const {userData} = useSelector(s=>s.auth);
//   const dispatch = useDispatch();

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.editBox}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: 10,
//           }}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text>
//               <Icon
//                 name="close-outline"
//                 style={{fontSize: 35, color: 'white'}}
//               />
//             </Text>
//           </TouchableOpacity>
//           <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
//             Profile destboard
//           </Text>
//         </View>
//         <Divider width={1} />

//         <View style={{alignItems: 'center', marginTop: 20}}>
//           <Image
//             // source={{uri: img}}
//             source={{uri: userData.profilePic}}
//             style={{
//               width: 150,
//               height: 150,
//               borderColor: 'white',
//               borderWidth: 2,
//               borderRadius: 100,
//             }}
//           />
//           <Text style={{color: '#3493D9', fontSize: 18, marginTop: 10}}>
//           {userData.name}
//           </Text>
//         </View>

//         <TouchableOpacity onPress={() => navigation.push('Aboutus')}>
//           <View
//             style={{
//               paddingVertical: 10,
//               marginHorizontal: 15,
//               backgroundColor: '#2b303b',
//               borderRadius: 10,
//               borderWidth: 2,
//               borderColor: 'white',
//               paddingLeft: 10,
//               marginTop: 30,
//               opacity: 0.8,
//             }}>
//             <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
//               About MeraJosh
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.push('PrivacyAndPolicy')}>
//           <View
//             style={{
//               paddingVertical: 10,
//               marginHorizontal: 15,
//               backgroundColor: '#2b303b',
//               borderRadius: 10,
//               borderWidth: 2,
//               borderColor: 'white',
//               paddingLeft: 10,
//               marginTop: 15,
//               opacity: 0.8,
//             }}>
//             <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
//               Privacy and Policy
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.push('EarningDestboard')}>
//           <View
//             style={{
//               paddingVertical: 10,
//               marginHorizontal: 15,
//               backgroundColor: '#227023',
//               borderRadius: 10,
//               borderWidth: 2,
//               borderColor: 'white',
//               paddingLeft: 10,
//               marginTop: 15,
//               opacity: 0.8,
//             }}>
//             <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
//               Earning Option
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.push('YourActivity')}>
//           <View
//             style={{
//               paddingVertical: 10,
//               marginHorizontal: 15,
//               backgroundColor: '#2b303b',
//               borderRadius: 10,
//               borderWidth: 2,
//               borderColor: 'white',
//               paddingLeft: 10,
//               marginTop: 15,
//               opacity: 0.8,
//             }}>
//             <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
//               Your Activity
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={async () => await signout()}>
//           <View
//             style={{
//               paddingVertical: 10,
//               marginHorizontal: 15,
//               backgroundColor: 'red',
//               borderRadius: 10,
//               borderWidth: 2,
//               borderColor: 'white',
//               paddingLeft: 10,
//               marginTop: 55,
//               opacity: 0.8,
//             }}>
//             <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf:'center'}}>
//               Logout
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   editBox: {
//     marginTop: 5,
//     width: '100%',
//     height: '100%',
//   },
// });

// export default ProfileDestboard;
