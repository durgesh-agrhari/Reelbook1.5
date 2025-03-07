import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import backendURL, {SEND_REQUEST} from '../../../utils/Strings';
import { useInstaContext } from '../../../context/InstaContext';

const RequestChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const {userToken} = useInstaContext();
  // const {toaken,setToken, setUserid, userId} = useContext(AuthContext);
  const {userData} = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const route = useRoute();
  console.log(' Hello bhai id => ', userData);
  console.log(' Hello bhai id => ', userData?._id);

  const sendMessage = async () => {
    try {
      const userData = {
        senderId: userData?._id,
        reciverId: route?.params?.reciverId,
        message: message,
      };
      //   const response = await fetch(backendURL + SEND_REQUEST, userData);
      console.log("senderId", senderId)
      const response = await axios.post(
        `https://socialapp-backend-cli.vercel.app/sendrequest`,
        userData,
      );
      if (response.status == 200) {
        setMessage('');
        Alert.alert(
          'Your request has been send',
          'wait for user accept your request',
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: 'gray',
          padding: 10,
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back-sharp" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{color: 'white'}}> Name : {route?.params?.name}</Text>
      </View>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView></ScrollView>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            backgroundColor: 'white',
            alignItems: 'center',
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: 'gray',
            marginBottom: 20,
          }}>
          <Entypo name="emoji-happy" size={30} color="black" />
          <TextInput
            placeholder="type your message..."
            value={message}
            onChangeText={setMessage}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 10,
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginHorizontal: 8,
            }}>
            <Entypo name="camera" size={30} color="gray" />
            <Feather name="mic" size={30} color="gray" />
          </View>
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: '#0066b2',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
            }}>
            <Text style={{color: 'white', alignSelf: 'center'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RequestChatRoom;

const styles = StyleSheet.create({});
