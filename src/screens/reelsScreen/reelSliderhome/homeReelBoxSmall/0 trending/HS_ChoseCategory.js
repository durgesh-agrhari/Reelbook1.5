import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const HS_ChoseCategory = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          backgroundColor: 'gray',
          borderRadius: 20,
          margin: 10,
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: 0.6,
        }}>
        <TouchableOpacity>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Trending feed
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'gray',
            padding: 5,
            borderRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VideoCategoryPage')}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 10,
              }}>
              Choose Video Category
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('VideoCategoryPage')}>
            <Feather name="chevron-down" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HS_ChoseCategory;

const styles = StyleSheet.create({});
