import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const img =
  'https://emojiisland.com/cdn/shop/products/Sad_Face_Emoji_large.png?v=1571606037';

const Explore = () => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#94e3a9', flex: 1}}>
      <View style={{marginTop: 100}}>
        <TouchableOpacity
          onPress={() => pickImage()}
          style={{alignSelf: 'center'}}>
          <Image
            source={{uri: img}}
            style={{
              width: 150,
              height: 150,
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 25,
            color: 'gray',
            textAlign: 'center',
            margin: 10,
            fontWeight: 'bold',
          }}>
          I Dont't khow why you logout
        </Text>

        <TouchableOpacity
          onPress={() => navigation.push('BottomTab')}
          style={{
            backgroundColor: 'green',
            margin: 20,
            padding: 10,
            borderRadius: 30,
            borderColor: 'gray',
            borderWidth: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Go to Home Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Loginform')}
          style={{
            backgroundColor: 'green',
            margin: 20,
            padding: 10,
            borderRadius: 30,
            borderColor: 'gray',
            borderWidth: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              borderRadius: 30,
            }}>
            Go to Login Page
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('VideoCategoryPage')}
          style={{
            backgroundColor: 'green',
            margin: 20,
            padding: 10,
            borderRadius: 30,
            borderColor: 'gray',
            borderWidth: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Go to Explore Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({});
