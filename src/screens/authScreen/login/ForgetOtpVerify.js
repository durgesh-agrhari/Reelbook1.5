import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import OTPTextView from 'react-native-otp-textinput';
// import { number } from 'yup'
// import {OtpInput} from 'react-native-otp-entry';

const login =
  'https://static.vecteezy.com/system/resources/thumbnails/001/991/652/small/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg';

const ForgetOtpVerify = ({navigation}) => {
  clearText = () => {
    this.otpInput.clear();
  };

  setText = () => {
    this.otpInput.setValue('1234');
  };
  return (
    <View style={styles.container}>
      <View style={styles.otpbox}>
        <StatusBar hidden />
        <Image
          source={{uri: login}}
          style={{borderRadius: 25, height: 300, width: 300, marginTop: 100}}
        />
        <Text
          style={{
            color: 'green',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: -45,
          }}>
          On the of reset password
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'black',
          }}>
          Enter verification code
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'gray',
          }}>
          we are automatically detecting sms
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 0,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'gray',
          }}>
          send to your mobile phone number
        </Text>
        <View style={{marginVertical: 22, width: 300}}>
          <OTPTextView ref={e => (this.otpInput = e)} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}>
            <View style={styles.ViewButton}>
              <TouchableOpacity
                // onClick={this.setText}
                onPress={() => navigation.push('ChangePassword')}>
                <View style={styles.buttonbox}>
                  <Text style={{alignItems: 'center', color: 'white'}}>
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 80}}>
          <Text style={{fontSize: 16}}>Don't recived the code</Text>
          <TouchableOpacity>
            <Text
              style={{
                color: '#2592E7',
                fontWeight: '500',
                marginLeft: 10,
                fontSize: 16,
              }}>
              {' '}
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.btnChangeNumber}>
            <Text style={styles.nochange}>Change number</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    marginTop: 50,
  },
  ViewButton: {
    // flex: 1,
    justifyContent: 'flex-end',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonbox: {
    width: 280,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  btnChangeNumber: {
    width: 150,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'gray',
    marginTop: 10,
  },
  nochange: {
    color: '#2592E7',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgetOtpVerify;
