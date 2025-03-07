import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useInstaContext} from '../../context/InstaContext';
import backendURL from '../../utils/Strings';
import axios from 'axios';
import {useSelector} from 'react-redux';
const ProfileHeader = ({navigation}) => {
  const THEME = useSelector(state=> state.theme);
  const {userData} = useSelector(s => s.auth);

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

  return (
    <View
      style={{
        backgroundColor: THEME.data == 'LIGHT'? 'white' : 'black',
        paddingHorizontal: 15,
        paddingTop: 10,
        height: 55,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 24, fontWeight: '500', color:THEME.data == 'LIGHT'? 'black' : 'white'}}>
          { userData ?  userData?.username : 'Loading...'}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
            <Feather name="plus-circle" style={[styles.icon,{color: THEME.data == 'LIGHT'? 'black' : 'white'}]} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileDestboard')}>
            <MaterialIcons name="menu" style={[styles.icon,{color: THEME.data == 'LIGHT'? 'black' : 'white'}]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },

  icon: {
    color: 'black',
    marginLeft: 18,
    resizeMode: 'contain',
    fontSize: 25,
  },
});

export default ProfileHeader;
