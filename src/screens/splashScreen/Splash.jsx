import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import {Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
// import {useSelector} from 'react-redux';

const Splash = () => {
  const navigation = useNavigation();
 const THEME = useSelector(state=> state.theme)
  // const authData = useSelector(state => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('BottomTab');
    }, 1500);
  }, []);

  return (
    <View style={[styles.home, {backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'}]}>
      <Text
        style={{
          color: THEME.data == 'LIGHT' ? 'black' : 'white',
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        ReelBook
      </Text>
      <Image
        source={require('../../assets/logo/reelbook.jpeg')}
        style={[styles.logo,{borderColor: THEME.data == 'LIGHT' ? 'gray': 'blue'}]}
      />
      <Text
        style={{
          color: 'green',
          fontSize: 20,
          fontWeight: '800',
          marginTop: 20,
        }}>
        Be Motivated
      </Text>
      <Text
        style={{
          color: 'green',
          fontSize: 12,
          fontWeight: '800',
          marginTop: 10,
        }}>
        India
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: 'blue',
    borderWidth: 4,
  },
});

export default Splash;
