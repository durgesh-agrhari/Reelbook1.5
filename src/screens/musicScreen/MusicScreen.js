import {View, Text} from 'react-native';
import React from 'react';
import MusicPlayer from './MusicPlayer';
import MusicHome from './MusicHome';
const MusicScreen = () => {
  return (
    <View>
      <MusicPlayer />
      {/* <MusicHome /> */}
      <MusicPlayer />
    </View>
  );
};

export default MusicScreen;
