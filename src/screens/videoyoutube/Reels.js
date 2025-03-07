import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const Reels = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const videoData = [
    'https://videos.pexels.com/video-files/8516369/8516369-sd_360_640_30fps.mp4',
    'https://videos.pexels.com/video-files/29820085/12808735_360_640_60fps.mp4',
    'https://videos.pexels.com/video-files/26791723/12007066_360_640_60fps.mp4',
    'https://videos.pexels.com/video-files/8516369/8516369-sd_360_640_30fps.mp4',
    'https://videos.pexels.com/video-files/29820085/12808735_360_640_60fps.mp4',
    'https://videos.pexels.com/video-files/26791723/12007066_360_640_60fps.mp4',
    'https://videos.pexels.com/video-files/8516369/8516369-sd_360_640_30fps.mp4',
    'https://videos.pexels.com/video-files/29820085/12808735_360_640_60fps.mp4',
    'https://videos.pexels.com/video-files/26791723/12007066_360_640_60fps.mp4',
    'https://videos.pexels.com/video-files/8516369/8516369-sd_360_640_30fps.mp4',
    'https://videos.pexels.com/video-files/29820085/12808735_360_640_60fps.mp4',
    'https://videos.pexels.com/video-files/26791723/12007066_360_640_60fps.mp4',
  ];

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={videoData}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={{width: windowWidth, height: windowHeight}}>
              <Video
                // style={styles.video}
                style={{width: windowWidth, height: windowHeight}}
                source={{uri: item}}
                paused={false} // Automatically play the video
                repeat={true} // Loop the video
                resizeMode="cover" // Scale video to cover the entire screen
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
