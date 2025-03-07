import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {timeDifference} from '../screens/homeScreen/FeedItem';
import Feather from 'react-native-vector-icons/Feather';

import axios from 'axios';
import {useInstaContext} from '../context/InstaContext';
import backendURL from '../utils/Strings';
import { useSelector } from 'react-redux';

const PostCommentItem = ({data, onClickCommentOption}) => {
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
  const {userData}=useSelector(s=>s.auth)

  return (
    <View
      style={{
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <View style={{width: '12%'}}>
            <Image
              source={{
                uri: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
              }}
            />
          </View>

          <View style={{width: '75%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {data.username}
              </Text>
              <Text style={{color: 'gray', marginLeft: 10}}>
                {timeDifference(new Date(data.createdAt))}
              </Text>
            </View>
            <Text
              style={{
                color: 'black',
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '500',
                marginTop: 4,
                width: '95%',
              }}>
              {data.comment}
            </Text>
          </View>
        </View>
        {userData._id == data.userId && (
          <TouchableOpacity
            onPress={() => {
              onClickCommentOption();
            }}>
            <Feather
              name="more-vertical"
              style={{
                fontSize: 25,
                color: 'black',
                paddingLeft: 10,
                marginVertical: 4,
                marginLeft: -50,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PostCommentItem;

const styles = StyleSheet.create({});
