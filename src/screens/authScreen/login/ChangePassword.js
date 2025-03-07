import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const login =
  'https://static.vecteezy.com/system/resources/thumbnails/001/991/652/small/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg';
const lock =
  'https://icons.veryicon.com/png/o/miscellaneous/conventional-use/password-lock-12.png';

const ChangePassword = () => {
  const navigation = useNavigation();

  let textInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);

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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.otpbox}>
        <Image
          source={{uri: login}}
          style={{borderRadius: 25, height: 300, width: 300, marginTop: 50}}
        />

        {/* <Text style={styles.textTitle}>Please Input your mobile number</Text> */}
        <Text
          style={{
            color: 'green',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: -45,
          }}>
          Change Your Password
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginTop: 30,
            marginBottom: 16,
            marginLeft: 5,
            color: '#2C3132',
          }}>
          Enter new password and Conform Password
        </Text>
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
              placeholder="Password"
              // keyboardType='numeric'
              // value={phoneNumber}
              // onChangeText={onChangePhone}
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
              placeholder="Conform password"
              // value={phoneNumber}
              // onChangeText={onChangePhone}
              secureTextEntry={false}
              style={styles.phoneInputStyle}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
            />
          </View>
        </View>

        <View style={styles.ViewButton}>
          <TouchableOpacity onPress={() => navigation.push('ProfileScreen')}>
            <View
              style={[
                styles.buttonbox,
                {
                  backgroundColor: phoneNumber ? '#415BE8' : 'gray',
                },
              ]}>
              <Text style={{alignItems: 'center', color: 'white'}}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 325,
            toFixed: 30,
          }}>
          <Text> By continuing you agree withe Mearjosh </Text>
          <Text
            style={{
              fontWeight: '700',
              borderBottomWidth: 1,
              borderBottomColor: 'black',
            }}>
            {' '}
            terma of uses and Privacy Policy{' '}
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* {renderAreasCodeModal} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpbox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    marginBottom: 50,
    // marginTop: 0,
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
    marginLeft: 15,
    flex: 1,
    height: 50,
    marginHorizontal: 15,
  },
  ViewButton: {
    // flex: 1,
    justifyContent: 'flex-end',
    marginTop: 30,
    alignItems: 'center',
  },
  buttonbox: {
    width: 410,
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
    width: 410,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DED3D3',
    flexDirection: 'row',
  },
});

export default ChangePassword;
