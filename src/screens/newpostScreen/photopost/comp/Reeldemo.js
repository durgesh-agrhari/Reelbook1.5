import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

const {height, width} = Dimensions.get('window');

// Mock Video Data - Replace with API data if needed
const videoData = [
  {
    id: '1',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    username: 'user1',
    caption: 'Amazing view!',
  },
  {
    id: '2',
    uri: 'https://www.w3schools.com/html/movie.mp4',
    username: 'user2',
    caption: 'Fun times!',
  },
  {
    id: '3',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    username: 'user3',
    caption: 'Check this out!',
  },
];

const Reeldemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // Handles video playback when the index changes
  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
    }
  };

  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80};

  return (
    <View style={styles.container}>
      {/* Video Reel Scroll */}
      <FlatList
        data={videoData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.videoContainer}>
            {/* Video Player */}
            <Video
              ref={ref => (videoRefs.current[index] = ref)}
              source={{uri: item.uri}}
              style={styles.video}
              resizeMode="cover"
              repeat
              paused={currentIndex !== index} // Pause when out of view
            />

            {/* Video Overlay UI */}
            <View style={styles.overlay}>
              <Text style={styles.username}>@{item.username}</Text>
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          </View>
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default Reeldemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    height,
    width,
    justifyContent: 'flex-end',
  },
  video: {
    height,
    width,
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  username: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  caption: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 5,
  },
});
