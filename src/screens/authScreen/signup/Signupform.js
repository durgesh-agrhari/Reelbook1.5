import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import backendURL from '../../../utils/Strings';
import axios from 'axios';
import Loader from '../../../components/Loader';

// import {useDispatch} from 'react-redux';
// import {setAuthData} from '../../../redux/AuthSlice';
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
const email =
  'https://cdn-icons-png.freepik.com/256/46/46951.png?semt=ais_hybrid';

const Signupform = () => {
  const [passwordIsVisibal, setPasswordIsVisival] = useState(false);
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);

  let textInput = useRef(null);
  const [password, setPassword] = useState();
  const [focusInput, setFocusInput] = useState(true);

  // const dispatch = useDispatch();

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };
  useEffect(() => {
    textInput.focus();
  }, []);

  //backend bata sending

  const [fdata, setFdata] = useState({
    name: '',
    username:'',
    email: '',
    password: '',
    cpassword: '',
  });

  const [errormsg, setErrormsg] = useState(null);

  const SendtoBackend = () => {
    setloader(true);
    if (
      fdata.name == '' ||
      fdata.username == '' ||
      fdata.email == '' ||
      fdata.password == '' ||
      fdata.cpassword == ''
    ) {
      setloader(false);
      setErrormsg('All fields are required');
      return;
    } else {
      if (fdata.password != fdata.cpassword) {
        setloader(false);
        setErrormsg('Password and Conform must be same');
        return;
      } else {
        axios
          .post(`${backendURL}/signup`, fdata)
          .then(res => {
            if (res.data.error) {
              setloader(false);
              setErrormsg(res.data.error);
            } else {
              setloader(false);
              alert('Account created successfuly');
      
              // if (fdata) {
              //   dispatch(setAuthData(fdata));
              // }
              
              navigation.navigate('Loginform');
              // navigation.navigate('BottomTab');
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex:1}}>

      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.otpbox}>
        <Image
          source={{uri: login}}
          style={{
            borderRadius: 25,
            height: '20%',
            width: '60%',
            marginTop: 50,
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
          Signup withe mail
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginTop: 30,
            marginBottom: 16,
            marginLeft: 5,
            color: '#2C3132',
            alignSelf: 'center',
          }}>
          Enter your fullname, email and Password
        </Text>

        <View style={{marginBottom: 10, alignSelf: 'center'}}>
          {errormsg ? <Text style={{color: 'red'}}>{errormsg}</Text> : null}
        </View>
        <View
          style={[
            styles.inputView,
            {
              borderBottomColor: password ? '#415BE8' : 'gray',
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
              ref={input => (textInput = input)}
              placeholder="Enter your fullname"
              placeholderTextColor="black"
              value={password}
              onChangeText={text => setFdata({...fdata, name: text})}
              onPress={() => setErrormsg(null)}
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
              borderBottomColor: password ? '#415BE8' : 'gray',
            },
          ]}>
          <View style={styles.openDialogView}>
            <TouchableOpacity>
              <View style={{justifyContent: 'center'}}>
                <Text  style={{color:'black', fontSize:22, fontWeight:'bold'}} >@</Text>
                {/* <Image
                  source={{uri: phone}}
                  resizeMode="contain"
                  style={styles.downIcons}
                /> */}
              </View>
            </TouchableOpacity>

            <TextInput
              ref={input => (textInput = input)}
              placeholder="Enter your username"
              placeholderTextColor="black"
              value={password}
              onChangeText={text => setFdata({...fdata, username: text})}
              onPress={() => setErrormsg(null)}
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
              borderBottomColor: password ? '#415BE8' : 'gray',
            },
          ]}>
          <View style={styles.openDialogView}>
            <TouchableOpacity>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={{uri: email}}
                  resizeMode="contain"
                  style={styles.downIcons}
                />
              </View>
            </TouchableOpacity>

            <TextInput
              ref={input => (textInput = input)}
              placeholder="Enter your email"
              placeholderTextColor="black"
              value={password}
              onChangeText={text => setFdata({...fdata, email: text})}
              onPress={() => setErrormsg(null)}
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
              borderBottomColor: password ? '#415BE8' : 'gray',
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
              placeholder="Password"
              placeholderTextColor="black"
              value={password}
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

        <View
          style={[
            styles.inputView,
            {
              borderBottomColor: password ? '#415BE8' : 'gray',
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
              placeholder="Conform Password"
              placeholderTextColor="black"
              value={password}
              onChangeText={text => setFdata({...fdata, cpassword: text})}
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

        <View style={styles.ViewButton}>
          <TouchableOpacity
            onPress={() => {
              SendtoBackend();
            }}>
            <View
              style={[
                styles.buttonbox,
                {
                  backgroundColor: password ? '#415BE8' : '#415BE8',
                  opacity: 0.9,
                },
              ]}>
              <Text style={{alignItems: 'center', color: 'white'}}>Signup</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text style={{alignItems: 'center', fontSize: 16, color: 'black'}}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.push('Loginform')}>
              <Text
                style={{alignItems: 'center', color: '#25BEE7', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.ViewButtonGoogle}>
            <TouchableOpacity>
              <View style={styles.buttonboxGoogle}>
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA',
                  }}
                  style={{width: 25, height: 25}}
                />
                <Text
                  style={{
                    alignItems: 'center',
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                  Login with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.ViewButtonGoogle}>
            <TouchableOpacity onPress={() => navigation.navigate('InputOtp')}>
              <View style={styles.buttonboxPhone}>
                <Image
                  source={{
                    uri: 'https://static.vecteezy.com/system/resources/thumbnails/027/179/401/small/telephone-phone-call-icon-symbol-free-png.png',
                  }}
                  style={{width: 25, height: 25}}
                />
                <Text
                  style={{
                    alignItems: 'center',
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                  Login with Mobile{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 65,
            toFixed: 30,
          }}>
          <Text style={{color: 'black'}}>
            By continuing you agree withe Mearjosh
          </Text>
          <Text
            style={{
              fontWeight: '700',
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              color: 'black',
            }}>
            {' '}
            terma of uses and Privacy Policy{' '}
          </Text>
        </View>
      </KeyboardAvoidingView>
      </ScrollView> 
      <Loader visible={loader} />
    </SafeAreaView>
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
    width: '95%',
  },
  phoneInputStyle: {
    flex: 1,
    height: 50,
    marginHorizontal: 15,
    color: 'black',
  },
  ViewButton: {
    // flex: 1,
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
    marginRight: 12,
  },
  buttonboxGoogle: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DED3D3',
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center',
  },
  buttonboxPhone: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DED3D3',
    flexDirection: 'row',
    marginTop: -10,
    padding: 10,
    alignSelf: 'center',
  },
});

export default Signupform;
