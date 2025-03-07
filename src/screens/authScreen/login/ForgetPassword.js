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
// const down = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDedovnlWUPFOn1C7ryewmpG_XIZsRTL5vIQ&s'
const down =
  'https://png.pngtree.com/png-clipart/20210216/ourmid/pngtree-phone-icon-in-circle-black-png-image_5994540.png';
const indiaflag =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPivccfkRnQZQQ2yzM93siohK1n4SWqtQaTA&s';

const ForgetPassword = () => {
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
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          Forget your password
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'black',
          }}>
          Enter your phone number or email
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: '500',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: 30,
          }}>
          we will send you verification code !
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
                  source={{uri: down}}
                  resizeMode="contain"
                  style={styles.downIcons}
                />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity >
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: indiaflag }}
                                    resizeMode='contain'
                                    style={styles.flagIcons}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18 }}> +91 |</Text>
                            </View>
                        </TouchableOpacity> */}
            <TextInput
              ref={input => (textInput = input)}
              placeholder="Enter your phone number or email"
              placeholderTextColor="black"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={onChangePhone}
              secureTextEntry={false}
              style={[styles.phoneInputStyle, {color: 'black'}]}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
            />
          </View>
        </View>

        <View style={styles.ViewButton}>
          <TouchableOpacity onPress={() => navigation.push('ForgetOtpVerify')}>
            <View
              style={[
                styles.buttonbox,
                {
                  backgroundColor: phoneNumber ? '#415BE8' : 'gray',
                },
              ]}>
              <Text style={{alignItems: 'center', color: 'white'}}>Verify</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 350,
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
    justifyContent: 'flex-end',
    marginTop: 30,
    alignItems: 'center',
  },
  ViewButtonGoogle: {
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
  buttonboxGoogle: {
    width: 410,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DED3D3',
    flexDirection: 'row',
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
});

export default ForgetPassword;
