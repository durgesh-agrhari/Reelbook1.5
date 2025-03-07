import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useInstaContext} from '../../../context/InstaContext';
import Loader from '../../../components/Loader';
// import {useDispatch} from 'react-redux';

const login =
  'https://static.vecteezy.com/system/resources/thumbnails/001/991/652/small/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg';
const down =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDedovnlWUPFOn1C7ryewmpG_XIZsRTL5vIQ&s';
const indiaflag =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPivccfkRnQZQQ2yzM93siohK1n4SWqtQaTA&s';
const lock =
  'https://icons.veryicon.com/png/o/miscellaneous/conventional-use/password-lock-12.png';
const phone =
  'https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid';

const Loginform = () => {
  const [passwordIsVisibal, setPasswordIsVisival] = useState(false);
  const navigation = useNavigation();
  const {userLogin} = useInstaContext();
  let textInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);
  const [loader, setloader] = useState(false);

  const onChangePhone = number => {
    setPhoneNumber(number);
  };

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };
  useEffect(() => {
    textInput.focus();
  }, []);

  //backend part login part
  const [fdata, setFdata] = useState({
    email: '',
    password: '',
  });
  const [errormsg, setErrormsg] = useState(null);

  const SendtoBackend = () => {
    setloader(true);
    if (fdata.email == '' || fdata.password == '') {
      setloader(false);
      setErrormsg('All fields are required');
      return;
    } else {
      userLogin(fdata, setloader, setErrormsg, navigation);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.otpbox}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('VideoCategoryPage')}>
            <Text style={{color: 'black'}}>Explore</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: login}}
          style={{
            borderRadius: 25,
            marginTop: 5,
            height: '30%',
            width: '75%',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            color: 'green',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: -20,
            marginTop: 10,
            alignSelf: 'center',
          }}>
          Login
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginTop: 30,
            marginBottom: 16,
            color: '#2C3132',
            alignSelf: 'center',
          }}>
          Enter your phone number and Password
        </Text>

        <View style={{marginBottom: 10}}>
          {errormsg ? <Text style={{color: 'red'}}>{errormsg}</Text> : null}
        </View>
        <View
          style={[
            styles.inputView,
            {
              borderBottomColor: phoneNumber ? '#415BE8' : 'gray',
            },
          ]}>
          <View style={styles.openDialogView}>
            <TouchableOpacity>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={{uri: phone}}
                  resizeMode="contain"
                  style={styles.downIcons}
                />
              </View>
            </TouchableOpacity>

            <TextInput
              onPress={() => setErrormsg(null)}
              ref={input => (textInput = input)}
              placeholder="Enter your phone number or email"
              placeholderTextColor="black"
              onChangeText={text => setFdata({...fdata, email: text})}
              secureTextEntry={false}
              style={styles.phoneInputStyle}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
            />
          </View>
        </View>

        <View
          style={[
            styles.inputView,
            {
              borderBottomColor: phoneNumber ? '#415BE8' : 'gray',
            },
          ]}>
          <View style={styles.openDialogView}>
            <TouchableOpacity>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={{uri: lock}}
                  resizeMode="contain"
                  style={styles.downIcons}
                />
              </View>
            </TouchableOpacity>

            <TextInput
              ref={input => (textInput = input)}
              placeholder="Enter your password"
              placeholderTextColor="black"
              onChangeText={text => setFdata({...fdata, password: text})}
              secureTextEntry={!passwordIsVisibal}
              style={styles.phoneInputStyle}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
            />
            <TouchableOpacity
              onPress={() => setPasswordIsVisival(!passwordIsVisibal)}>
              <Feather
                name={passwordIsVisibal ? 'eye' : 'eye-off'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 4, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.push('ForgetPassword')}>
            <Text
              style={{alignItems: 'center', color: '#25BEE7', fontSize: 16}}>
              forget password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ViewButton}>
          <TouchableOpacity
            onPress={() => {
              SendtoBackend();
            }}>
            <View
              style={[
                styles.buttonbox,
                {
                  backgroundColor: phoneNumber ? '#415BE8' : 'gray',
                },
              ]}>
              <Text style={{alignItems: 'center', color: 'white'}}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text style={{alignItems: 'center', fontSize: 16, color: 'black'}}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.push('Signupform')}>
              <Text
                style={{alignItems: 'center', color: '#25BEE7', fontSize: 16}}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ViewButtonGoogle}>
          <TouchableOpacity
          //  onPress={() => console.log('Login')}
            >
            <View style={styles.buttonboxGoogle}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA',
                }}
                style={{width: 30, height: 30}}
              />
              <Text
                style={{
                  alignItems: 'center',
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 165,
            toFixed: 30,
          }}>
          <Text style={{color: 'black'}}>
            {' '}
            By continuing you agree withe Mearjosh{' '}
          </Text>
          <Text
            style={{
              fontWeight: '700',
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              color: 'black',
            }}>
            terma of uses and Privacy Policy{' '}
          </Text>
        </View>
      </KeyboardAvoidingView>
      <Loader visible={loader} />

      {/* {renderAreasCodeModal} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpbox: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
  },
  textTitle: {
    marginBottom: 50,
    fontSize: 15,
  },
  inputView: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 2.5,
    marginBottom: 10,
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  phoneInputStyle: {
    flex: 1,
    height: 50,
    marginHorizontal: 15,
    color: 'black',
  },
  ViewButton: {
    justifyContent: 'flex-end',
    marginTop: 30,
    alignItems: 'center',
  },
  buttonbox: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downIcons: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  flagIcons: {
    width: 50,
    height: 30,
  },

  ViewButtonGoogle: {
    justifyContent: 'flex-end',
    marginTop: 30,
    alignItems: 'center',
  },
  buttonboxGoogle: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DED3D3',
    flexDirection: 'row',
  },
});

export default Loginform;
