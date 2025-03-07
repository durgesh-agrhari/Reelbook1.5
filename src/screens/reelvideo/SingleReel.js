import {
  Dimensions,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Video from 'react-native-video';

const SingleReel = ({item, index, currentIndex}) => {
  const windowwidth = Dimensions.get('window').width;
  const windowheight = Dimensions.get('window').height;

  const videoRef = useRef(null);

  const onBuffer = buffer => {
    console.log('buffering...');
  };

  const onError = error => {
    console.log('buffering...');
  };

  return (
    <View
      style={{width: windowwidth, height: windowheight, position: 'relative'}}>
      <TouchableOpacity
        style={{width: '100%', height: '100%', position: 'absolute '}}>
        <Video
          videoRef={videoRef}
          onError={onError}
          onBuffer={onBuffer}
          repeat={true}
          resizeMode="cover"
          paused={false}
          source={{url: item.Video}}
          style={{width: '100%', height: '100%', position: 'absolute '}}
        />
        <Text style={{color: 'yellow'}}>Hii</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleReel;

const styles = StyleSheet.create({});
