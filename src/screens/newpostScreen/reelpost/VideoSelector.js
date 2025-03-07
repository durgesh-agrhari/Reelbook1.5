import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';

const VideoSelector = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [thumbnailUri, setThumbnailUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const selectVideo = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      alert('Storage permission is required.');
      return;
    }

    launchImageLibrary({mediaType: 'video'}, response => {
      if (response.assets) {
        const video = response.assets[0];
        setVideoUri(video.uri);
        generateThumbnail(video.uri);
      }
    });
  };

  const generateThumbnail = async uri => {
    setIsLoading(true);
    const outputPath = `${uri.split('.').slice(0, -1).join('.')}_thumbnail.jpg`;

    try {
      await FFmpegKit.execute(
        `-i "${uri}" -ss 00:00:01 -vframes 1 "${outputPath}"`,
      );
      const probeResult = await FFprobeKit.getMediaInformation(outputPath);

      if (probeResult.getReturnCode() === 0) {
        setThumbnailUri(outputPath);
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Selector & Thumbnail Generator</Text>

      <TouchableOpacity style={styles.button} onPress={selectVideo}>
        <Text style={styles.buttonText}>Select Video</Text>
      </TouchableOpacity>

      {videoUri && (
        <Video
          source={{uri: videoUri}}
          style={styles.video}
          controls
          resizeMode="contain"
        />
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        thumbnailUri && (
          <Image source={{uri: thumbnailUri}} style={styles.thumbnail} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20,
  },
});

export default VideoSelector;
