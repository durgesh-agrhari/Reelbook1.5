import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';

const GetVideoChunks = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{
          //   uri: 'http://your-server-url.com/video', // Backend API that serves video chunks
          uri: 'https://socialapp-backend-cli-git-master-durgesh-agrharis-projects.vercel.app/s3/videoChunks', // Backend API that serves video chunks
        }}
        // controls={true} // Show video controls (Play, Pause, etc.)
        resizeMode="contain" // Video resize mode
        style={styles.video}
        // repeat
        // onLoad={()=>{console.log("Dwefw")}}
        // onBuffer={() => <ActivityIndicator />} // Show loader while buffering
        // onError={error => console.log('Video Error:', error)} // Handle errors
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300, // Adjust height as per your need
    backgroundColor: 'gray',
  },
});

export default GetVideoChunks;
