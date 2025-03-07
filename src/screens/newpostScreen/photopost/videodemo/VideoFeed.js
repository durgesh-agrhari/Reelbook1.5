import React, { useState, useRef } from 'react';
import { 
  View, 
  FlatList, 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity, 
  Text
} from 'react-native';
import Video from 'react-native-video';
// import { Heart, MessageCircle, Send } from 'lucide-react-native';

const { height, width } = Dimensions.get('window');

const VideoFeed = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef([]);

  const renderReelItem = ({ item, index }) => (
    <View style={styles.reelContainer}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={{ uri: item.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={currentVideo !== index}
      />
      <View style={styles.overlayActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={{color:"red"}}>Heart</Text>
          {/* <Heart color="white" size={30} /> */}
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
        <Text style={{color:"red"}}>Heart</Text>
          {/* <MessageCircle color="white" size={30} /> */}
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
        <Text style={{color:"red"}}>Heart</Text>
          {/* <Send color="white" size={30} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderReelItem}
      keyExtractor={(item) => item.id}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={height}
      vertical
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setCurrentVideo(viewableItems[0].index);
        }
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50
      }}
    />
  );
};

const styles = StyleSheet.create({
  reelContainer: {
    height,
    width,
    position: 'relative',
    backgroundColor:'red'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor:'pink',
  },
  overlayActions: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    alignItems: 'center'
  },
  actionButton: {
    marginVertical: 10,
    alignItems: 'center'
  },
  actionText: {
    color: 'white',
    marginTop: 5
  }
});

export default VideoFeed;














// import React, { useState, useRef, useEffect } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import Video from 'react-native-video';
// import AWS from 'aws-sdk';

// // AWS S3 Configuration
// AWS.config.update({
//   region: 'YOUR_AWS_REGION',
//   accessKeyId: 'YOUR_ACCESS_KEY',
//   secretAccessKey: 'YOUR_SECRET_KEY'
// });

// const s3 = new AWS.S3();

// const VideoFeed = () => {
//   const [videoChunks, setVideoChunks] = useState([]);
//   const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
//   const videoRef = useRef(null);

//   // Fetch video chunks from S3
//   const fetchVideoChunks = async (bucketName, videoPrefix) => {
//     try {
//       const params = {
//         Bucket: bucketName,
//         Prefix: videoPrefix
//       };

//       const data = await s3.listObjectsV2(params).promise();
      
//       // Sort chunks to ensure correct order
//       const sortedChunks = data.Contents
//         .filter(item => item.Key.endsWith('.mp4'))
//         .sort((a, b) => a.Key.localeCompare(b.Key));

//       // Fetch pre-signed URLs for each chunk
//       const chunkUrls = await Promise.all(
//         sortedChunks.map(async (chunk) => {
//           const urlParams = {
//             Bucket: bucketName,
//             Key: chunk.Key,
//             Expires: 3600 // URL valid for 1 hour
//           };
//           return await s3.getSignedUrl('getObject', urlParams);
//         })
//       );

//       setVideoChunks(chunkUrls);
//     } catch (error) {
//       console.error('Error fetching video chunks:', error);
//     }
//   };

//   // Handle video end and transition to next chunk
//   const handleVideoEnd = () => {
//     if (currentChunkIndex < videoChunks.length - 1) {
//       setCurrentChunkIndex(currentChunkIndex + 1);
//     }
//   };

//   useEffect(() => {
//     // Example: Fetch video chunks when component mounts
//     fetchVideoChunks('your-bucket-name', 'video-reels/');
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Video
//         ref={videoRef}
//         source={{ uri: videoChunks[currentChunkIndex] }}
//         style={styles.video}
//         resizeMode="cover"
//         onEnd={handleVideoEnd}
//         repeat={currentChunkIndex === videoChunks.length - 1}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black'
//   },
//   video: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height
//   }
// });

// export default VideoFeed;


// import React, { useState, useEffect } from 'react';
// import { View, FlatList, ActivityIndicator, Dimensions, Text } from 'react-native';
// import Video from 'react-native-video';

// const VIDEO_API = 'http://172.20.10.4:3000/s3/videosChunks'; // Replace with your API endpoint
// const { height } = Dimensions.get('window');

// const VideoItem = ({ source }) => {
//   return (
//     <View style={{ width: '100%', height, backgroundColor: '#000' }}>
//       <Text style={{color:'red'}}>Hiii</Text>
//       <Video
//         source={{ uri: source }}
//         style={{ width: '100%', height: height * 0.9 }}
//         resizeMode="cover"
//         repeat
//         controls={false}
//         muted={false}
//         playInBackground={false}
//         playWhenInactive={false}
//       />
//     </View>
//   );
// };

// const VideoFeed = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   const fetchVideos = async () => {
//     if (loading) return;
//     setLoading(true);
//     try {
//       const response = await fetch(`${VIDEO_API}?page=${page}`);
//       const data = await response.json();
//       setVideos((prev) => [...prev, ...data.videos]);
//       setPage(page + 1);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const handleEndReached = () => {
//     fetchVideos();
//   };

//   return (
//     <FlatList
//       data={videos}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={({ item }) => <VideoItem source={item.url} />}
//       pagingEnabled
//       onEndReached={handleEndReached}
//       onEndReachedThreshold={0.5}
//       ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
//     />
//   );
// };

// export default VideoFeed;










// import React, { useState, useEffect } from 'react';
// import { View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
// import Video from 'react-native-video';

// const VIDEO_API = 'http://172.20.10.4:3000/s3/videosChunks'; // Replace with your API endpoint
// const { height } = Dimensions.get('window');

// const VideoItem = ({ source }) => {
//   return (
//     <Video
//       source={{ uri: source }}
//       style={{ width: '100%', height }}
//       resizeMode="cover"
//       repeat
//       controls={false}
//       muted={false}
//       playInBackground={false}
//       playWhenInactive={false}
//     />
//   );
// };

// const VideoFeed = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   const fetchVideos = async () => {
//     if (loading) return;
//     setLoading(true);
//     try {
//       const response = await fetch(`${VIDEO_API}?page=${page}`);
//       const data = await response.json();
//       setVideos((prev) => [...prev, ...data.videos]);
//       setPage(page + 1);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const handleEndReached = () => {
//     fetchVideos();
//   };

//   return (
//     <FlatList
//       data={videos}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={({ item }) => <VideoItem source={item.url} />}
//       pagingEnabled
//       onEndReached={handleEndReached}
//       onEndReachedThreshold={0.5}
//       ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
//     />
//   );
// };

// export default VideoFeed;
