import React, {useState, useCallback, useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const VideoHomeItem = React.memo(({data}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [muted, setMuted] = useState(true); // New state to handle mute/unmute

  // Optimized calculation of the file name
  const fileName = useMemo(() => {
    return data.fileName.length > 10
      ? data.fileName.slice(0, 10).toLowerCase() + '...'
      : data.fileName.toUpperCase();
  }, [data.fileName]);

  // Handle video buffering to display loader
  const handleBuffer = useCallback(meta => {
    setIsLoading(meta.isBuffering);
  }, []);

  // Handle video error
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false); // Stop loading if an error occurs
  }, []);

  // Toggle the mute state
  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() =>
        navigation.navigate('PlayVideoListItem', {
          selectedVideo: data,
        })
      }>
      <>
        <View style={styles.overlay}>
          <View style={styles.infoContainer}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/63/f7/e9/63f7e99d2bdb21c005ce2debca4c3a9e.jpg',
              }}
              style={styles.avatar}
            />
            <Text style={{color:'white'}} >{fileName}</Text>
          </View>
          <View style={styles.iconContainer}>
            <AntDesign name="heart" style={styles.heartIcon} />
            <Text style={{color:'white'}}>36</Text>
          </View>
        </View>

        <View style={styles.videoContainer}>
          {isLoading && !hasError && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loader}
            />
          )}
          {hasError ? (
            <Text style={styles.errorText}>Error loading video</Text>
          ) : (
            <>
              {/* <Video
                source={{uri: data.url}}
                style={styles.video}
                resizeMode="cover"
                muted={muted} // Controlled by the muted state
                paused={false} // Autoplay the video
                repeat={true} // Loop video
                playInBackground={false}
                onBuffer={handleBuffer} // Handle buffering state
                onError={handleError} // Handle error
                onLoad={() => setIsLoading(false)} // Stop loader once video loads
              /> */}
              <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTvosznaWMxW8iZFYisYz-fnIxkUc1vO_NGhhF_ypHTZVj192CC7Cs_7qUmjqzbHzflzA&usqp=CAU'}} style={styles.video} />
              {/* Mute/Unmute button */}
              {/* <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
                <Octicons
                  name={muted ? 'mute' : 'unmute'} // Change icon if you want different icons for mute/unmute
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity> */}
            </>
          )}
        </View>
      </>
    </TouchableHighlight>
  );
});

export default VideoHomeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    zIndex: 10,
    bottom: 0,
    padding: 10,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderBottomRightRadius:18,
    borderBottomLeftRadius:18,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heartIcon: {
    fontSize: 25,
    color: 'red',
  },
  videoContainer: {
    borderColor: '#5536ba',
    borderWidth: 3,
    borderRadius: 20, // Increased to make it more rounded
    height: 410,
    position: 'relative',
    overflow: 'hidden', // Ensures rounded corners are visible
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 20, // Match the same borderRadius as the container
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18, // Half the size of the loader to center it
    marginTop: -18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
  muteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
});

// import React, {useState, useCallback, useMemo} from 'react';
// import {Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
// import Video from 'react-native-video';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Octicons from 'react-native-vector-icons/Octicons';

// const VideoHomeItem = React.memo(({data}) => {
//   // const [videoLoading, setVideoLoading] = useState()
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const [muted, setMuted] = useState(true); // New state to handle mute/unmute

//   // Optimized calculation of the file name
//   const fileName = useMemo(() => {
//     return data.fileName.length > 10
//       ? data.fileName.slice(0, 10).toLowerCase() + '...'
//       : data.fileName.toUpperCase();
//   }, [data.fileName]);

//   // Handle video buffering to display loader
//   const handleBuffer = useCallback(meta => {
//     setIsLoading(meta.isBuffering);
//   }, []);

//   // Handle video error
//   const handleError = useCallback(() => {
//     setHasError(true);
//     setIsLoading(false); // Stop loading if an error occurs
//   }, []);

//   // Toggle the mute state
//   const toggleMute = () => {
//     setMuted(!muted);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.overlay}>
//         <View style={styles.infoContainer}>
//           <Image
//             source={{
//               uri: 'https://i.pinimg.com/564x/63/f7/e9/63f7e99d2bdb21c005ce2debca4c3a9e.jpg',
//             }}
//             style={styles.avatar}
//           />
//           <Text>{fileName}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <AntDesign name="heart" style={styles.heartIcon} />
//           <Text>36</Text>
//         </View>
//       </View>

//       <View style={styles.videoContainer}>
//         {isLoading && !hasError && (
//           <ActivityIndicator
//             size="large"
//             color="#0000ff"
//             style={styles.loader}
//           />
//         )}
//         {hasError ? (
//           <Text style={styles.errorText}>Error loading video</Text>
//         ) : (
//           <>
//             <Video
//               source={{uri: data.url}}
//               style={styles.video}
//               resizeMode="cover"
//               muted={muted} // Controlled by the muted state
//               paused={false} // Autoplay the video
//               repeat={true} // Loop video
//               playInBackground={false}
//               onBuffer={handleBuffer} // Handle buffering state
//               onError={handleError} // Handle error
//               onLoad={() => setIsLoading(false)} // Stop loader once video loads
//             />
//             {/* Mute/Unmute button */}
//             <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
//               <Octicons
//                 name={muted ? 'mute' : 'unmute'} // Change icon if you want different icons for mute/unmute
//                 size={25}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//     </View>
//   );
// });

// export default VideoHomeItem;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 5,
//   },
//   overlay: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     justifyContent: 'space-between',
//     zIndex: 10,
//     bottom: 0,
//     padding: 10,
//     width: '100%',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius:10,
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   avatar: {
//     width: 35,
//     height: 35,
//     borderRadius: 100,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   heartIcon: {
//     fontSize: 25,
//     color: 'red',
//   },
//   videoContainer: {
//     borderColor: 'gray',
//     borderWidth: 3,
//     borderRadius: 4,
//     height: 410,
//     position: 'relative',
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   loader: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginLeft: -18, // Half the size of the loader to center it
//     marginTop: -18,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     padding: 20,
//   },
//   muteButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 20,
//     padding: 5,
//   },
// });
