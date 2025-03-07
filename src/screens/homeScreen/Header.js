import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';
import Fontosm from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const searchImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN8Fu-uIYHPWv7-Q3mAH8IK4ua7IVrXTcD-_stvgWJAA&s';

const Header = () => {
  const THEME = useSelector(state=> state.theme)
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.push('MusicHome')}>
        <MaterialCommunityIcons
          name="music-circle-outline"
          style={styles.iconmusic}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('SearchScreen')}>
        <Icons name="search" style={styles.iconSearch} />
      </TouchableOpacity> */}
      <TouchableOpacity>
        {
          THEME.data == 'LIGHT' ? ( <Image
            style={styles.logo}
            source={require('../../assets/logo/logo.png')}
          />):(
            <Image
            style={styles.logo}
            source={require('../../assets/logo/1.png')}
          />
          )
        }
       
      </TouchableOpacity>

      <View style={styles.iconConatiner}>
        <TouchableOpacity onPress={() => navigation.push('SearchScreen')}>
          <Icons name="search" style={styles.iconSearch} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('ActivityScreen')}>
          <Icons
            name="notifications-circle-outline"
            style={styles.iconNotification}
          />
        </TouchableOpacity>
        <TouchableOpacity
          //  onPress={() => navigation.push('ActivityScreen')}
          onPress={() => navigation.push('ChatScreen')}>
          <Icons
            name="chatbubble-ellipses-outline"
            style={styles.iconNotification}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },

  iconConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 150,
    height: 50,
    marginTop: 4,
  },
  iconMessage: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  iconNotification: {
    fontSize: 25,
    resizeMode: 'contain',
    color: '#5536ba',
  },
  iconSearch: {
    fontSize: 25,
    resizeMode: 'contain',
    color: '#5536ba',
    // marginLeft: -40,
  },
  iconmusic: {
    fontSize: 25,
    resizeMode: 'contain',
    color: '#5536ba',
    // marginLeft: -40,
  },
  iconProfile: {
    fontSize: 30,
    resizeMode: 'contain',
    color: '#5536ba',
  },
  unreadBage: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    right: -5,
    width: 25,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBageText: {
    color: '#5536ba',
    fontWeight: '600',
  },
});

export default Header;
