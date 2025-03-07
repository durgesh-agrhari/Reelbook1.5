import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useNavigation} from '@react-navigation/native';

const ReelPost = () => {
  const navigation = useNavigation();

  const publishHandeler = () => {};
  
  return (
    <View
      style={{
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#b0b5bf',
        borderRadius: 20,
      }}>
      <Image
        source={{
          uri: 'https://icons.veryicon.com/png/o/business/general-office-icon/general-upload-file.png',
        }}
        style={{width: 100, height: 100}}
      />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Start Uploading Sort Video
      </Text>
      <Text style={{textAlign: 'center'}}>
        Let's upload sort video and start sharing your creativity withe
        community
      </Text>

      <TouchableOpacity
        // onPress={SelectVideoFile}
        onPress={() => navigation.push('DocumentPicker')}
        style={{
          backgroundColor: 'black',
          paddingHorizontal: 25,
          padding: 10,
          borderRadius: 30,
          marginTop: 20,
        }}>
        <Text style={{color: 'white'}}>Select Video file</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReelPost;
