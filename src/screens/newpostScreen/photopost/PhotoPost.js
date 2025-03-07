import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const PhotoPost = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#7b98d4',
        borderRadius: 20,
      }}>
      <Image
        source={{
          uri: 'https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png',
        }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'white',
          borderRadius: 20,
        }}
      />
      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
        Start Uploading Osm Photo
      </Text>
      <Text style={{textAlign: 'center'}}>
        Let's upload sort video and start sharing your creativity withe
        community   ``
      </Text>

      <TouchableOpacity
        onPress={() => navigation.push('CameraRool')}
        style={{
          backgroundColor: 'black',
          paddingHorizontal: 25,
          padding: 10,
          borderRadius: 30,
          marginTop: 20,
        }}>
        <Text style={{color: 'white'}}>Select Image file</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoPost;
