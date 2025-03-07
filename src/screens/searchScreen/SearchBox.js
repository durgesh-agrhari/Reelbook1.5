import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';
// import {TextInput} from 'react-native-gesture-handler';

const searchImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/800px-Vector_search_icon.svg.png';

const SearchBox = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'relative',
        padding: 0,
        marginTop: 10,
      }}>
      <Image
        source={{uri: searchImg}}
        style={{
          fontSize: 18,
          opacity: 0.7,
          position: 'absolute',
          zIndex: 1,
          left: 35,
          width: 25,
          height: 25,
        }}
      />

      <TextInput
        placeholder="Search"
        placeholderTextColor="#909090"
        style={{
          width: '94%',
          backgroundColor: '#EBEBEB',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          padding: 10,
          paddingLeft: 65,
          borderColor: 'gray',
          borderWidth: 0.5,
        }}
      />
    </View>
  );
};

export default SearchBox;
