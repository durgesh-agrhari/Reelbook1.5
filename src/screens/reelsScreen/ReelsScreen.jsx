
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { data as initialData } from './Database';
import styles from './reelsStyle';
const likeGif = require('../../assets/likeGif/like.png'); // Your GIF path

// import {data as initialData} from '../../Database';
// import styles from '../../reelsStyle';
// const likeGif = require('../../../../assets/likeGif/like.png'); // Your GIF path
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const {height, width} = Dimensions.get('window');
const exp =
  'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
const music =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

const ReelsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Track video loading state
  const [follow, setFollow] = useState(false);
  const [data, setData] = useState(
    initialData.map(item => ({...item, showLikeAnimation: false})), // Add showLikeAnimation state to each item
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showMuteIcon, setShowMuteIcon] = useState(false);
  const [videoDuration, setVideoDuration] = useState(5000); // Default video duration if unknown

  const flatListRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null); // Reference for auto-scroll timeout

  // Handle auto-scroll with video duration or 10 seconds
  useEffect(() => {
    if (autoScroll || tenSecondAutoScroll) {
      const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
      if (scrollTime > 0) {
        autoScrollTimeoutRef.current = setTimeout(() => {
          if (flatListRef.current && currentIndex < data.length - 1) {
            flatListRef.current.scrollToIndex({index: currentIndex + 1});
          }
        }, scrollTime);
      }
    }

    // Clear timeout when component is unmounted or settings change
    return () => clearTimeout(autoScrollTimeoutRef.current);
  }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

  const handleLike = index => {
    const updatedData = [...data];
    updatedData[index].like = !updatedData[index].like; // Toggle like state for the specific item
    updatedData[index].showLikeAnimation = true; // Show GIF animation for the specific item
    setData(updatedData); // Update the data state with the new like state

    setTimeout(() => {
      const updatedDataWithHiddenAnimation = [...updatedData];
      updatedDataWithHiddenAnimation[index].showLikeAnimation = false; // Hide the GIF after 500ms
      setData(updatedDataWithHiddenAnimation);
    }, 600);
  };

  const flipAnim = useRef(new Animated.Value(0)).current; // Animated value for flip
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(!flipped);
      startFlipAnimation();
    }, 350); // auto-flip every second

    return () => clearInterval(interval); // Clean up on component unmount
  }, [flipped]);

  const startFlipAnimation = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 500, // Animation duration
      useNativeDriver: true,
    }).start();
  };

  const flipRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotate between 0 and 180 degrees
  });

  const handleMute = () => {
    setMuted(!muted);
    setShowMuteIcon(true);
    setTimeout(() => setShowMuteIcon(false), 1000);
  };

  const handleLoad = meta => {
    setVideoDuration(meta.duration * 1000); // Set video duration in milliseconds
    setLoading(false); // Video is loaded, stop activity indicator
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsPlaying(null); // Stop playing videos when unfocused
      };
    }, []),
  );

  const handleViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
      setIsPlaying(viewableItems[0].item.id); // Only play the visible video
    }
  }, []);

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const renderItem = useCallback(
    ({item, index}) => (
      <View
        style={{
          height: height,
          width: width,
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <TouchableOpacity activeOpacity={1} onPress={handleMute} style={{flex: 1}}>
          <Video
            source={{uri: item.url}}
            style={{
              width: '100%',
              height: '100%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              overflow: 'hidden',
            }}
            muted={muted}
            paused={isPlaying !== item.id} // Play only the current video
            resizeMode="cover"
            repeat
            onLoadStart={() => setLoading(true)} // Start loading indicator
            onLoad={handleLoad} // Stop loading indicator when video is loaded
            onBuffer={({isBuffering}) => setLoading(isBuffering)} // Show activity indicator when buffering
            onError={e => console.error('Video error: ', e)}
            bufferConfig={{
              minBufferMs: 7000,
              maxBufferMs: 15000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            progressUpdateInterval={1000}
          />
           {showMuteIcon && (
            <View style={styles.muteIconContainer}>
              <Icon
                name={muted ? 'volume-off' : 'volume-up'}
                size={50}
                color="#fff"
              />
            </View>
          )}
          {loading && (
            <ActivityIndicator
              size="large"
              color="white"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{translateX: -20}, {translateY: -20}],
              }}
            />
          )}
        </TouchableOpacity>

        {/* Rest of your renderItem content */}
        
        <View style={styles.camerabtn}>
           <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')}>
             <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
           </TouchableOpacity>
           {/* Auto-scroll toggles */}
           <TouchableOpacity onPress={() => setAutoScroll(!autoScroll)}>
             <FontAwesome6
              name={autoScroll ? 'toggle-on' : 'toggle-off'}
              style={{
                fontSize: 35,
                color: autoScroll ? 'gray' : 'white',
                marginTop: 10,
              }}
            />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
            Auto Scroll
          </Text>

          {/* <TouchableOpacity
            onPress={() => setTenSecondAutoScroll(!tenSecondAutoScroll)}>
            <FontAwesome6
              name={tenSecondAutoScroll ? 'toggle-on' : 'toggle-off'}
              style={{
                fontSize: 35,
                color: tenSecondAutoScroll ? 'gray' : 'white',
                marginTop: 10,
              }}
            />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
            10s Auto
          </Text> */}
        </View>

        {/* video category */}
        <View style={styles.videocategory}>
          <Text style={styles.categoryText}>Category : Feeds</Text>
        </View>

        {/* Profile Image and Description */}
        <View style={styles.profileContainer}>
          {/* <Image source={{uri: item.profilePic}} style={styles.profilePic} /> */}
          <Text style={styles.description}>ReelBook</Text>

          <TouchableOpacity
            style={{width: follow ? 82 : 72}}
            onPress={() => setFollow(!follow)}>
            <View
              style={{
                width: '100%',
                height: 30,
                borderWidth: follow ? 1 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: follow ? 'gray' : 'white',
                borderRadius: 8,
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: follow ? 'white' : 'white',
                  fontWeight: 'bold',
                  opacity: 0.8,
                }}>
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Image and Description */}
        <View style={styles.discription}>
          <Text style={styles.description}>
            {/* {item.description} */}
            {item.description.length > 105
              ? item.description.slice(0, 105).toLowerCase() + '...'
              : item.description.toUpperCase()}
          </Text>
        </View>
        <View style={styles.craditbox}>
          <Text>
            {' '}
            <Text style={{color: 'green', fontWeight: 'bold'}}>
              Cradit
            </Text> :{' '}
            <Text style={{color: '#1668db', fontWeight: 'bold'}}>@</Text>
            {'elvish_yadav'}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => handleLike(index)}
            style={styles.iconbackground}>
            <AntDesign
              name={item.like ? 'heart' : 'hearto'}
              style={{
                fontSize: 25,
                color: item.like ? 'red' : 'white',
                marginTop: 0,
              }}
            />
          </TouchableOpacity>

          {/* Like Animation (GIF shown when liked) */}
          {item.showLikeAnimation && (
            <View style={styles.containerLike}>
              <Animated.Image
                source={likeGif}
                style={[
                  styles.giflike,
                  {transform: [{rotateY: flipRotation}]}, // Flip animation using rotateY
                ]}
              />
            </View>
          )}
          <Text style={styles.actionCount}>325k</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="comment-text-outline"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.actionCount}>22k</Text>

          <TouchableOpacity>
            <FontAwesome name="share" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.actionCount}>86k</Text>

          <TouchableOpacity>
            <Feather name="more-vertical" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
            <Image source={{uri: music}} style={styles.musicImage} />
          </TouchableOpacity>
          <Text style={styles.musicText}>🎶</Text>
        </View>
      </View>
    ),
    [isPlaying, muted, loading],
  );


  const {userData} = useSelector(s => s.auth);
  const dispatch = useDispatch();

  const checkLiked = () => {
    let isLiked = false;
    data.likes.map((item, index) => {
      if (item == userData?._id) {
        isLiked = true;
      }
    });
    return isLiked;
  };


  return (
    <View style={{flex: 1, borderTopRightRadius: 20}}>
      <StatusBar
        hidden={false}
        backgroundColor="#0b1321"
        barStyle="light-content"
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        ref={flatListRef}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={2}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </View>
  );
};

export default ReelsScreen;








// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { View, FlatList, Dimensions, TouchableOpacity, Text, Image, StatusBar, Animated, ActivityIndicator } from 'react-native';
// import Video from 'react-native-video';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { data as initialData } from './Database';
// import styles from './reelsStyle';
// const likeGif = require('../../assets/likeGif/like.png'); // Your GIF path
// import { useNavigation, useFocusEffect } from '@react-navigation/native';

// const { height, width } = Dimensions.get('window');
// const exp = 'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// const music = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// const ReelsScreen = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false); // Track video loading state
//   const [follow, setFollow] = useState(false);
//   const [data, setData] = useState(
//     initialData.map(item => ({ ...item, showLikeAnimation: false })) // Add showLikeAnimation state to each item
//   );
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(null);
//   const [autoScroll, setAutoScroll] = useState(false);
//   const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [showMuteIcon, setShowMuteIcon] = useState(false);
//   const [videoDuration, setVideoDuration] = useState(5000); // Default video duration if unknown

//   const flatListRef = useRef(null);
//   const autoScrollTimeoutRef = useRef(null); // Reference for auto-scroll timeout

//   const flipAnim = useRef(new Animated.Value(0)).current; // Animated value for flip
//   const [flipped, setFlipped] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFlipped(!flipped);
//       startFlipAnimation();
//     }, 350); // auto-flip every second

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, [flipped]);

//   const startFlipAnimation = () => {
//     Animated.timing(flipAnim, {
//       toValue: flipped ? 0 : 1,
//       duration: 500, // Animation duration
//       useNativeDriver: true,
//     }).start();
//   };

//   const flipRotation = flipAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '180deg'], // Rotate between 0 and 180 degrees
//   });

//   const handleMute = () => {
//     setMuted(!muted);
//     setShowMuteIcon(true);
//     setTimeout(() => setShowMuteIcon(false), 1000);
//   };

//   const handleLoad = meta => {
//     setVideoDuration(meta.duration * 1000); // Set video duration in milliseconds
//     setLoading(false); // Video is loaded, stop activity indicator
//   };

//   useFocusEffect(
//     useCallback(() => {
//       return () => {
//         setIsPlaying(null); // Stop playing videos when unfocused
//       };
//     }, [])
//   );

//   const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       const index = viewableItems[0].index;
//       setCurrentIndex(index);
//       setIsPlaying(viewableItems[0].item.id); // Only play the visible video
//     }
//   }, []);

//   const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

//   const renderItem = useCallback(
//     ({ item, index }) => (
//       <View
//         style={{
//           height: height-60,
//           width: width,
//           justifyContent: 'center',
//           position: 'relative',
//           backgroundColor: '#0b1321',
//         }}
//       >
//         <TouchableOpacity activeOpacity={1} onPress={handleMute} style={{ width:width, height:height-60, marginTop:0 }}>
//           <Video
//             source={{ uri: item.url }}
//             style={{
//               // width: '100%',
//               // height: '100%',
//               width:width,
//               height:height-60,
//               borderTopRightRadius: 25,
//               borderTopLeftRadius: 25,
//               overflow: 'hidden',
//               backgroundColor: 'black',
//             }}
//             muted={muted}
//             paused={isPlaying !== item.id} // Play only the current video
//             resizeMode="cover"
//             repeat
//             onLoadStart={() => setLoading(true)} // Start loading indicator
//             onLoad={handleLoad} // Stop loading indicator when video is loaded
//             onBuffer={({ isBuffering }) => setLoading(isBuffering)} // Show activity indicator when buffering
//             onError={e => console.error('Video error: ', e)}
//             bufferConfig={{
//               minBufferMs: 7000,
//               maxBufferMs: 15000,
//               bufferForPlaybackMs: 2500,
//               bufferForPlaybackAfterRebufferMs: 5000,
//             }}
//             progressUpdateInterval={1000}
//           />
//           {showMuteIcon && (
//             <View style={styles.muteIconContainer}>
//               <Icon name={muted ? 'volume-off' : 'volume-up'} size={50} color="#fff" />
//             </View>
//           )}
//           {loading && (
//             <ActivityIndicator
//               size="large"
//               color="white"
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: [{ translateX: -20 }, { translateY: -20 }],
//               }}
//             />
//           )}
//         </TouchableOpacity>

//         {/* Rest of your renderItem content */}
//         <View style={styles.camerabtn}>
//           <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')}>
//             <Feather name="camera" style={{ fontSize: 35, color: 'white' }} />
//           </TouchableOpacity>
//           {/* Auto-scroll toggles */}
//           <TouchableOpacity onPress={() => setAutoScroll(!autoScroll)}>
//             <FontAwesome6
//               name={autoScroll ? 'toggle-on' : 'toggle-off'}
//               style={{
//                 fontSize: 35,
//                 color: autoScroll ? 'gray' : 'white',
//                 marginTop: 10,
//               }}
//             />
//           </TouchableOpacity>
//           <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
//             Auto Scroll
//           </Text>

//           <TouchableOpacity onPress={() => setTenSecondAutoScroll(!tenSecondAutoScroll)}>
//             <FontAwesome6
//               name={tenSecondAutoScroll ? 'toggle-on' : 'toggle-off'}
//               style={{
//                 fontSize: 35,
//                 color: tenSecondAutoScroll ? 'gray' : 'white',
//                 marginTop: 10,
//               }}
//             />
//           </TouchableOpacity>
//           <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
//             10s Auto
//           </Text>
//         </View>

//         {/* video category */}
//         <View style={styles.videocategory}>
//           <Text style={styles.categoryText}>Category : Feeds</Text>
//         </View>

//         {/* Profile Image and Description */}
//         <View style={styles.profileContainer}>
//           <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
//           <Text style={styles.description}>ReelBook</Text>
//           <TouchableOpacity
//             style={{ width: follow ? 82 : 72 }}
//             onPress={() => setFollow(!follow)}
//           >
//             <View
//               style={{
               
//                 width: '100%',
//                 height: 30,
//                 borderWidth: follow ? 1 : 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderColor: follow ? 'gray' : 'white',
//                 borderRadius: 8,
//                 marginLeft: 5,
//               }}
//             >
//               <Text
//                 style={{
//                   color: follow ? 'white' : 'white',
//                   fontWeight: 'bold',
//                   opacity: 0.8,
//                 }}
//               >
//                 {follow ? 'Following' : 'Follow'}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Description Text */}
//         <View style={styles.discription}>
//           <Text style={styles.description}>
//             {item.description.length > 105
//               ? item.description.slice(0, 105).toLowerCase() + '...'
//               : item.description.toUpperCase()}
//           </Text>
//         </View>

//         {/* Credit Box */}
//         <View style={styles.craditbox}>
//           <Text>
//             <Text style={{ color: 'green', fontWeight: 'bold' }}>Credit</Text>:{' '}
//             <Text style={{ color: '#1668db', fontWeight: 'bold' }}>@</Text>
//             {'elvish_yadav'}
//           </Text>
//         </View>

//         {/* Actions (Like, Comment, Share) */}
//         <View style={styles.iconContainer}>
//           <TouchableOpacity
//             onPress={() => handleLike(index)}
//             style={styles.iconbackground}
//           >
//             <AntDesign
//               name={item.like ? 'heart' : 'hearto'}
//               style={{
//                 fontSize: 25,
//                 color: item.like ? 'red' : 'white',
//                 marginTop: 0,
//               }}
//             />
//           </TouchableOpacity>

//           {/* Like Animation (GIF shown when liked) */}
//           {item.showLikeAnimation && (
//             <View style={styles.containerLike}>
//               <Animated.Image
//                 source={likeGif}
//                 style={[
//                   styles.giflike,
//                   { transform: [{ rotateY: flipRotation }] }, // Flip animation using rotateY
//                 ]}
//               />
//             </View>
//           )}
//           <Text style={styles.actionCount}>325k</Text>

//           <TouchableOpacity>
//             <MaterialCommunityIcons
//               name="comment-text-outline"
//               style={styles.icon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.actionCount}>22k</Text>

//           <TouchableOpacity>
//             <FontAwesome name="share" style={styles.icon} />
//           </TouchableOpacity>
//           <Text style={styles.actionCount}>86k</Text>

//           <TouchableOpacity>
//             <Feather name="more-vertical" style={styles.icon} />
//           </TouchableOpacity>

//           {/* Music Section */}
//           <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
//             <Image source={{ uri: music }} style={styles.musicImage} />
//           </TouchableOpacity>
//           <Text style={styles.musicText}>🎶</Text>
//         </View>
//       </View>
//     ),
//     [isPlaying, muted, loading, flipped] // Re-render on these state changes
//   );

//   return (
//     <View style={{ flex: 1, borderTopRightRadius: 20 }}>
//       <StatusBar hidden={false} backgroundColor="#0b1321" barStyle="light-content" />
//       <FlatList
//         data={data}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         pagingEnabled
//         ref={flatListRef}
//         initialNumToRender={1}
//         maxToRenderPerBatch={2}
//         windowSize={2}
//         onViewableItemsChanged={handleViewableItemsChanged}
//         viewabilityConfig={viewConfigRef.current}
//         showsVerticalScrollIndicator={false}
//         getItemLayout={(data, index) => ({
//           length: height,
//           offset: height * index,
//           index,
//         })}
//       />
//     </View>
//   );
// };

// export default ReelsScreen;




// // import React, {useState, useRef, useEffect, useCallback} from 'react';
// // import {
// //   View,
// //   FlatList,
// //   Dimensions,
// //   TouchableOpacity,
// //   Text,
// //   Image,
// //   StatusBar,
// //   Animated,
// //   ActivityIndicator,
// // } from 'react-native';
// // import Video from 'react-native-video';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import Feather from 'react-native-vector-icons/Feather';
// // import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // import {data as initialData} from './Database';
// // import styles from './reelsStyle';
// // const likeGif = require('../../assets/likeGif/like.png'); // Your GIF path
// // import {useNavigation, useFocusEffect} from '@react-navigation/native';

// // const {height, width} = Dimensions.get('window');
// // const exp =
// //   'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// // const music =
// //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// // const ReelsScreen = () => {
// //   const navigation = useNavigation();
// //   const [loading, setLoading] = useState(false); // Track video loading state
// //   const [follow, setFollow] = useState(false);
// //   const [data, setData] = useState(
// //     initialData.map(item => ({...item, showLikeAnimation: false})), // Add showLikeAnimation state to each item
// //   );
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isPlaying, setIsPlaying] = useState(null);
// //   const [autoScroll, setAutoScroll] = useState(false);
// //   const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
// //   const [muted, setMuted] = useState(false);
// //   const [showMuteIcon, setShowMuteIcon] = useState(false);
// //   const [videoDuration, setVideoDuration] = useState(5000); // Default video duration if unknown

// //   const flatListRef = useRef(null);
// //   const autoScrollTimeoutRef = useRef(null); // Reference for auto-scroll timeout

// //   // Handle auto-scroll with video duration or 10 seconds
// //   useEffect(() => {
// //     if (autoScroll || tenSecondAutoScroll) {
// //       const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
// //       if (scrollTime > 0) {
// //         autoScrollTimeoutRef.current = setTimeout(() => {
// //           if (flatListRef.current && currentIndex < data.length - 1) {
// //             flatListRef.current.scrollToIndex({index: currentIndex + 1});
// //           }
// //         }, scrollTime);
// //       }
// //     }

// //     // Clear timeout when component is unmounted or settings change
// //     return () => clearTimeout(autoScrollTimeoutRef.current);
// //   }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

// //   const handleLike = index => {
// //     const updatedData = [...data];
// //     updatedData[index].like = !updatedData[index].like; // Toggle like state for the specific item
// //     updatedData[index].showLikeAnimation = true; // Show GIF animation for the specific item
// //     setData(updatedData); // Update the data state with the new like state

// //     setTimeout(() => {
// //       const updatedDataWithHiddenAnimation = [...updatedData];
// //       updatedDataWithHiddenAnimation[index].showLikeAnimation = false; // Hide the GIF after 500ms
// //       setData(updatedDataWithHiddenAnimation);
// //     }, 600);
// //   };

// //   const flipAnim = useRef(new Animated.Value(0)).current; // Animated value for flip
// //   const [flipped, setFlipped] = useState(false);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setFlipped(!flipped);
// //       startFlipAnimation();
// //     }, 350); // auto-flip every second

// //     return () => clearInterval(interval); // Clean up on component unmount
// //   }, [flipped]);

// //   const startFlipAnimation = () => {
// //     Animated.timing(flipAnim, {
// //       toValue: flipped ? 0 : 1,
// //       duration: 500, // Animation duration
// //       useNativeDriver: true,
// //     }).start();
// //   };

// //   const flipRotation = flipAnim.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0deg', '180deg'], // Rotate between 0 and 180 degrees
// //   });

// //   const handleMute = () => {
// //     setMuted(!muted);
// //     setShowMuteIcon(true);
// //     setTimeout(() => setShowMuteIcon(false), 1000);
// //   };

// //   const handleLoad = meta => {
// //     setVideoDuration(meta.duration * 1000); // Set video duration in milliseconds
// //     setLoading(false); // Video is loaded, stop activity indicator
// //   };

// //   useFocusEffect(
// //     useCallback(() => {
// //       return () => {
// //         setIsPlaying(null); // Stop playing videos when unfocused
// //       };
// //     }, []),
// //   );

// //   const handleViewableItemsChanged = useCallback(({viewableItems}) => {
// //     if (viewableItems.length > 0) {
// //       const index = viewableItems[0].index;
// //       setCurrentIndex(index);
// //       setIsPlaying(viewableItems[0].item.id); // Only play the visible video
// //     }
// //   }, []);

// //   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

// //   const renderItem = useCallback(
// //     ({item, index}) => (
// //       <View
// //         style={{
// //           height: height,
// //           width: width,
// //           justifyContent: 'center',
// //           position: 'relative',
// //           backgroundColor: '#0b1321',
// //         }}>
// //         <TouchableOpacity activeOpacity={1} onPress={handleMute} style={{flex: 1}}>
// //           <Video
// //             source={{uri: item.url}}
// //             style={{
// //               width: '100%',
// //               height: '100%',
// //               borderTopRightRadius: 25,
// //               borderTopLeftRadius: 25,
// //               overflow: 'hidden',
// //               backgroundColor:'black',
// //             }}
// //             muted={muted}
// //             paused={isPlaying !== item.id} // Play only the current video
// //             resizeMode="cover"
// //             repeat
// //             onLoadStart={() => setLoading(true)} // Start loading indicator
// //             onLoad={handleLoad} // Stop loading indicator when video is loaded
// //             onBuffer={({isBuffering}) => setLoading(isBuffering)} // Show activity indicator when buffering
// //             onError={e => console.error('Video error: ', e)}
// //             bufferConfig={{
// //               minBufferMs: 7000,
// //               maxBufferMs: 15000,
// //               bufferForPlaybackMs: 2500,
// //               bufferForPlaybackAfterRebufferMs: 5000,
// //             }}
// //             progressUpdateInterval={1000}
// //           />
// //            {showMuteIcon && (
// //             <View style={styles.muteIconContainer}>
// //               <Icon
// //                 name={muted ? 'volume-off' : 'volume-up'}
// //                 size={50}
// //                 color="#fff"
// //               />
// //             </View>
// //           )}
// //           {loading && (
// //             <ActivityIndicator
// //               size="large"
// //               color="white"
// //               style={{
// //                 position: 'absolute',
// //                 top: '50%',
// //                 left: '50%',
// //                 transform: [{translateX: -20}, {translateY: -20}],
// //               }}
// //             />
// //           )}
// //         </TouchableOpacity>

// //         {/* Rest of your renderItem content */}
        
// //         <View style={styles.camerabtn}>
// //            <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')}>
// //              <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
// //            </TouchableOpacity>
// //            {/* Auto-scroll toggles */}
// //            <TouchableOpacity onPress={() => setAutoScroll(!autoScroll)}>
// //              <FontAwesome6
// //               name={autoScroll ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: autoScroll ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             Auto Scroll
// //           </Text>

// //           <TouchableOpacity
// //             onPress={() => setTenSecondAutoScroll(!tenSecondAutoScroll)}>
// //             <FontAwesome6
// //               name={tenSecondAutoScroll ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: tenSecondAutoScroll ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             10s Auto
// //           </Text>
// //         </View>

// //         {/* video category */}
// //         <View style={styles.videocategory}>
// //           <Text style={styles.categoryText}>Category : Feeds</Text>
// //         </View>

// //         {/* Profile Image and Description */}
// //         <View style={styles.profileContainer}>
// //           <Image source={{uri: item.profilePic}} style={styles.profilePic} />
// //           <Text style={styles.description}>ReelBook</Text>

// //           <TouchableOpacity
// //             style={{width: follow ? 82 : 72}}
// //             onPress={() => setFollow(!follow)}>
// //             <View
// //               style={{
// //                 width: '100%',
// //                 height: 30,
// //                 borderWidth: follow ? 1 : 1,
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 borderColor: follow ? 'gray' : 'white',
// //                 borderRadius: 8,
// //                 marginLeft: 5,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: follow ? 'white' : 'white',
// //                   fontWeight: 'bold',
// //                   opacity: 0.8,
// //                 }}>
// //                 {follow ? 'Following' : 'Follow'}
// //               </Text>
// //             </View>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Profile Image and Description */}
// //         <View style={styles.discription}>
// //           <Text style={styles.description}>
// //             {/* {item.description} */}
// //             {item.description.length > 105
// //               ? item.description.slice(0, 105).toLowerCase() + '...'
// //               : item.description.toUpperCase()}
// //           </Text>
// //         </View>
// //         <View style={styles.craditbox}>
// //           <Text>
// //             {' '}
// //             <Text style={{color: 'green', fontWeight: 'bold'}}>
// //               Cradit
// //             </Text> :{' '}
// //             <Text style={{color: '#1668db', fontWeight: 'bold'}}>@</Text>
// //             {'elvish_yadav'}
// //           </Text>
// //         </View>

// //         <View style={styles.iconContainer}>
// //           <TouchableOpacity
// //             onPress={() => handleLike(index)}
// //             style={styles.iconbackground}>
// //             <AntDesign
// //               name={item.like ? 'heart' : 'hearto'}
// //               style={{
// //                 fontSize: 25,
// //                 color: item.like ? 'red' : 'white',
// //                 marginTop: 0,
// //               }}
// //             />
// //           </TouchableOpacity>

// //           {/* Like Animation (GIF shown when liked) */}
// //           {item.showLikeAnimation && (
// //             <View style={styles.containerLike}>
// //               <Animated.Image
// //                 source={require('../../assets/likeGif/like.png')}
// //                 style={[
// //                   styles.giflike,
// //                   {transform: [{rotateY: flipRotation}]}, // Flip animation using rotateY
// //                 ]}
// //               />
// //             </View>
// //           )}
// //           <Text style={styles.actionCount}>325k</Text>
// //           <TouchableOpacity>
// //             <MaterialCommunityIcons
// //               name="comment-text-outline"
// //               style={styles.icon}
// //             />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>22k</Text>

// //           <TouchableOpacity>
// //             <FontAwesome name="share" style={styles.icon} />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>86k</Text>

// //           <TouchableOpacity>
// //             <Feather name="more-vertical" style={styles.icon} />
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
// //             <Image source={{uri: music}} style={styles.musicImage} />
// //           </TouchableOpacity>
// //           <Text style={styles.musicText}>🎶</Text>
// //         </View>
// //       </View>
// //     ),
// //     [isPlaying, muted, loading],
// //   );

// //   return (
// //     <View style={{flex: 1, borderTopRightRadius: 20}}>
// //       <StatusBar
// //         hidden={false}
// //         backgroundColor="#0b1321"
// //         barStyle="light-content"
// //       />
// //       <FlatList
// //         data={data}
// //         keyExtractor={item => item.id}
// //         renderItem={renderItem}
// //         pagingEnabled
// //         ref={flatListRef}
// //         initialNumToRender={1}
// //         maxToRenderPerBatch={2}
// //         windowSize={2}
// //         onViewableItemsChanged={handleViewableItemsChanged}
// //         viewabilityConfig={viewConfigRef.current}
// //         showsVerticalScrollIndicator={false}
// //         getItemLayout={(data, index) => ({
// //           length: height,
// //           offset: height * index,
// //           index,
// //         })}
// //       />
// //     </View>
// //   );
// // };

// // export default ReelsScreen;


// // import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
// // import {
// //   View,
// //   FlatList,
// //   Dimensions,
// //   TouchableOpacity,
// //   Text,
// //   Image,
// //   StatusBar,
// //   ActivityIndicator,
// //   Animated,
// // } from 'react-native';
// // import Video from 'react-native-video';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import Feather from 'react-native-vector-icons/Feather';
// // import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // import {data as initialData} from './Database';
// // import styles from './reelsStyle';
// // const likeGif = require('../../assets/likeGif/like.png'); // Your GIF path
// // import {useNavigation, useFocusEffect} from '@react-navigation/native';

// // const {height, width} = Dimensions.get('window');
// // const exp =
// //   'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// // const music =
// //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// // const ReelsScreen = () => {
// //   const navigation = useNavigation();
// //   const [follow, setFollow] = useState(false);
// //   const [data, setData] = useState(
// //     initialData.map(item => ({...item, showLikeAnimation: false})),
// //   );
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isPlaying, setIsPlaying] = useState(null);
// //   const [autoScroll, setAutoScroll] = useState(false);
// //   const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
// //   const [muted, setMuted] = useState(false);
// //   const [showMuteIcon, setShowMuteIcon] = useState(false);
// //   const [videoDuration, setVideoDuration] = useState(5000);
// //   const [loading, setLoading] = useState(true); // Add loading state

// //   const flatListRef = useRef(null);
// //   const autoScrollTimeoutRef = useRef(null);

// //   // Handle auto-scroll with video duration or 10 seconds
// //   useEffect(() => {
// //     if (autoScroll || tenSecondAutoScroll) {
// //       const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
// //       if (scrollTime > 0) {
// //         autoScrollTimeoutRef.current = setTimeout(() => {
// //           if (flatListRef.current && currentIndex < data.length - 1) {
// //             flatListRef.current.scrollToIndex({index: currentIndex + 1});
// //           }
// //         }, scrollTime);
// //       }
// //     }
// //     return () => clearTimeout(autoScrollTimeoutRef.current);
// //   }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

// //   const handleLike = index => {
// //     const updatedData = [...data];
// //     updatedData[index].like = !updatedData[index].like;
// //     updatedData[index].showLikeAnimation = true;
// //     setData(updatedData);

// //     setTimeout(() => {
// //       const updatedDataWithHiddenAnimation = [...updatedData];
// //       updatedDataWithHiddenAnimation[index].showLikeAnimation = false;
// //       setData(updatedDataWithHiddenAnimation);
// //     }, 600);
// //   };

// //   const flipAnim = useRef(new Animated.Value(0)).current;
// //   const [flipped, setFlipped] = useState(false);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setFlipped(!flipped);
// //       startFlipAnimation();
// //     }, 350);

// //     return () => clearInterval(interval);
// //   }, [flipped]);

// //   const startFlipAnimation = () => {
// //     Animated.timing(flipAnim, {
// //       toValue: flipped ? 0 : 1,
// //       duration: 500,
// //       useNativeDriver: true,
// //     }).start();
// //   };

// //   const flipRotation = flipAnim.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0deg', '180deg'],
// //   });

// //   const handleMute = () => {
// //     setMuted(!muted);
// //     setShowMuteIcon(true);
// //     setTimeout(() => setShowMuteIcon(false), 1000);
// //   };

// //   const handleLoad = meta => {
// //     setVideoDuration(meta.duration * 1000);
// //     setLoading(false); // Hide loading indicator after video loads
// //   };

// //   const handleLoadStart = () => {
// //     setLoading(true); // Show loading indicator when video starts loading
// //   };

// //   // Handle video pause when navigating away
// //   useFocusEffect(
// //     useCallback(() => {
// //       return () => {
// //         setIsPlaying(null);
// //       };
// //     }, []),
// //   );

// //   const handleViewableItemsChanged = useCallback(({viewableItems}) => {
// //     if (viewableItems.length > 0) {
// //       const index = viewableItems[0].index;
// //       setCurrentIndex(index);
// //       setIsPlaying(viewableItems[0].item.id);
// //     }
// //   }, []);

// //   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

// //   const renderItem = useCallback(
// //     ({item, index}) => (
// //       <View
// //         style={{
// //           height: height,
// //           width: width,
// //           justifyContent: 'center',
// //           position: 'relative',
// //           borderTopRightRadius: 30,
// //           borderTopLeftRadius: 30,
// //           backgroundColor: '#0b1321',
// //         }}>
// //         <TouchableOpacity
// //           activeOpacity={1}
// //           onPress={handleMute}
// //           style={{flex: 1, backgroundColor: '#0b1321'}}>
// //           <Video
// //             source={{uri: item.url}}
// //             style={{
// //               width: '100%',
// //               height: '100%',
// //               borderTopRightRadius: 25,
// //               borderTopLeftRadius: 25,
// //               overflow: 'hidden',
// //               backgroundColor: '#0b1321',
// //             }}
// //             muted={muted}
// //             paused={isPlaying !== item.id}
// //             resizeMode="cover"
// //             repeat
// //             onLoad={handleLoad}
// //             onLoadStart={handleLoadStart}
// //             bufferConfig={{
// //               minBufferMs: 7000,
// //               maxBufferMs: 15000,
// //               bufferForPlaybackMs: 2500,
// //               bufferForPlaybackAfterRebufferMs: 5000,
// //             }}
// //             // onLoadStart={() => console.log('Loading video...')}
// //             onBuffer={() => console.log('Buffering video...')}
// //             onError={e => console.error('Video error: ', e)}
// //             automaticallyWaitsToMinimizeStalling
// //             progressUpdateInterval={1000}
// //           />
// //           {showMuteIcon && (
// //             <View style={styles.muteIconContainer}>
// //               <Icon
// //                 name={muted ? 'volume-off' : 'volume-up'}
// //                 size={50}
// //                 color="#fff"
// //               />
// //             </View>
// //           )}
// //           {loading && ( // Show loading indicator when loading is true
// //             <ActivityIndicator
// //               size="large"
// //               color="green"
// //               style={styles.loadingIndicator}
// //             />
// //           )}
// //         </TouchableOpacity>

// //         <View style={styles.camerabtn}>
// //           <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')}>
// //             <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.videocategory}>
// //           <Text style={styles.categoryText}>Category : Feeds</Text>
// //         </View>

// //         <View style={styles.iconContainer}>
// //           <TouchableOpacity
// //             onPress={() => handleLike(index)}
// //             style={styles.iconbackground}>
// //             <AntDesign
// //               name={item.like ? 'heart' : 'hearto'}
// //               style={{
// //                 fontSize: 30,
// //                 color: item.like ? 'red' : 'white',
// //                 marginTop: 0,
// //               }}
// //             />
// //           </TouchableOpacity>

// //           {item.showLikeAnimation && (
// //             <View style={styles.containerLike}>
// //               <Animated.Image
// //                 source={require('../../assets/likeGif/like.png')}
// //                 style={[
// //                   styles.giflike,
// //                   {transform: [{rotateY: flipRotation}]},
// //                 ]}
// //               />
// //             </View>
// //           )}
// //           <Text style={styles.actionCount}>325k</Text>
// //         </View>
// //       </View>
// //     ),
// //     [isPlaying, muted, showMuteIcon, loading, autoScroll, tenSecondAutoScroll, data],
// //   );

// //   return (
// //     <View style={{flex: 1, borderTopRightRadius: 20}}>
// //       <StatusBar
// //         hidden={false}
// //         backgroundColor="#0b1321"
// //         barStyle="light-content"
// //       />
// //       <FlatList
// //         data={data}
// //         keyExtractor={item => item.id}
// //         renderItem={renderItem}
// //         pagingEnabled
// //         ref={flatListRef}
// //         initialNumToRender={1}
// //         maxToRenderPerBatch={2}
// //         windowSize={2}
// //         onViewableItemsChanged={handleViewableItemsChanged}
// //         viewabilityConfig={viewConfigRef.current}
// //         showsVerticalScrollIndicator={false}
// //         getItemLayout={(data, index) => ({
// //           length: height,
// //           offset: height * index,
// //           index,
// //         })}
// //       />
// //     </View>
// //   );
// // };

// // export default ReelsScreen;


// // import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
// // import {
// //   View,
// //   FlatList,
// //   Dimensions,
// //   TouchableOpacity,
// //   Text,
// //   Image,
// //   StatusBar,
// //   ActivityIndicator,
// //   Animated,
// // } from 'react-native';
// // import Video from 'react-native-video';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import Feather from 'react-native-vector-icons/Feather';
// // import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // import {data as initialData} from './Database';
// // import styles from './reelsStyle';
// // const likeGif = require('../../assets/likeGif/like.png'); // Your GIF path
// // import {useNavigation, useFocusEffect} from '@react-navigation/native';

// // const {height, width} = Dimensions.get('window');
// // const exp =
// //   'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// // const music =
// //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// // const ReelsScreen = () => {
// //   const navigation = useNavigation();
// //   const [follow, setFollow] = useState(false);
// //   const [data, setData] = useState(
// //     initialData.map(item => ({...item, showLikeAnimation: false})), // Add showLikeAnimation state to each item
// //   );
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isPlaying, setIsPlaying] = useState(null);
// //   const [autoScroll, setAutoScroll] = useState(false);
// //   const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
// //   const [muted, setMuted] = useState(false);
// //   const [showMuteIcon, setShowMuteIcon] = useState(false);
// //   const [videoDuration, setVideoDuration] = useState(5000); // Default video duration if unknown

// //   const flatListRef = useRef(null);
// //   const autoScrollTimeoutRef = useRef(null); // Reference for auto-scroll timeout

// //   // Handle auto-scroll with video duration or 10 seconds
// //   useEffect(() => {
// //     if (autoScroll || tenSecondAutoScroll) {
// //       const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
// //       if (scrollTime > 0) {
// //         autoScrollTimeoutRef.current = setTimeout(() => {
// //           if (flatListRef.current && currentIndex < data.length - 1) {
// //             flatListRef.current.scrollToIndex({index: currentIndex + 1});
// //           }
// //         }, scrollTime);
// //       }
// //     }

// //     // Clear timeout when component is unmounted or settings change
// //     return () => clearTimeout(autoScrollTimeoutRef.current);
// //   }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

// //   const handleLike = index => {
// //     const updatedData = [...data];
// //     updatedData[index].like = !updatedData[index].like; // Toggle like state for the specific item
// //     updatedData[index].showLikeAnimation = true; // Show GIF animation for the specific item
// //     setData(updatedData); // Update the data state with the new like state

// //     setTimeout(() => {
// //       const updatedDataWithHiddenAnimation = [...updatedData];
// //       updatedDataWithHiddenAnimation[index].showLikeAnimation = false; // Hide the GIF after 500ms
// //       setData(updatedDataWithHiddenAnimation);
// //     }, 600);
// //   };
// //   //flip like img
// //   const flipAnim = useRef(new Animated.Value(0)).current; // Animated value for flip
// //   const [flipped, setFlipped] = useState(false);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setFlipped(!flipped);
// //       startFlipAnimation();
// //     }, 350); // auto-flip every second

// //     return () => clearInterval(interval); // Clean up on component unmount
// //   }, [flipped]);

// //   const startFlipAnimation = () => {
// //     Animated.timing(flipAnim, {
// //       toValue: flipped ? 0 : 1,
// //       duration: 500, // Animation duration
// //       useNativeDriver: true,
// //     }).start();
// //   };

// //   const flipRotation = flipAnim.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0deg', '180deg'], // Rotate between 0 and 180 degrees
// //   });

// //   const handleMute = () => {
// //     setMuted(!muted);
// //     setShowMuteIcon(true);
// //     setTimeout(() => setShowMuteIcon(false), 1000);
// //   };

// //   const handleLoad = meta => {
// //     setVideoDuration(meta.duration * 1000); // Set video duration in milliseconds
// //   };

// //   // Handle video pause when navigating away
// //   useFocusEffect(
// //     useCallback(() => {
// //       return () => {
// //         setIsPlaying(null); // Stop playing videos when unfocused
// //       };
// //     }, []),
// //   );

// //   const handleViewableItemsChanged = useCallback(({viewableItems}) => {
// //     if (viewableItems.length > 0) {
// //       const index = viewableItems[0].index;
// //       setCurrentIndex(index);
// //       setIsPlaying(viewableItems[0].item.id); // Only play the visible video
// //     }
// //   }, []);

// //   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

// //   const renderItem = useCallback(
// //     ({item, index}) => (
// //       <View
// //         style={{
// //           height: height,
// //           width: width,
// //           justifyContent: 'center',
// //           position: 'relative',
// //           borderTopRightRadius: 30,
// //           borderTopLeftRadius: 30,
// //           backgroundColor: '#0b1321',
// //         }}>
// //         <TouchableOpacity
// //           activeOpacity={1}
// //           onPress={handleMute}
// //           style={{flex: 1, backgroundColor: '#0b1321'}}>
// //           <Video
// //             source={{uri: item.url}}
// //             style={{
// //               width: '100%',
// //               height: '100%',
// //               borderTopRightRadius: 25,
// //               borderTopLeftRadius: 25,
// //               overflow: 'hidden',
// //               backgroundColor: '#0b1321',
// //             }}
// //             muted={muted}
// //             paused={isPlaying !== item.id} // Play only the current video
// //             resizeMode="cover"
// //             repeat
// //             onLoad={handleLoad} // Set video duration when loaded
// //             bufferConfig={{
// //               minBufferMs: 7000,
// //               maxBufferMs: 15000,
// //               bufferForPlaybackMs: 2500,
// //               bufferForPlaybackAfterRebufferMs: 5000,
// //             }}
// //             onLoadStart={() => console.log('Loading video...')}
// //             onBuffer={() => console.log('Buffering video...')}
// //             onError={e => console.error('Video error: ', e)}
// //             automaticallyWaitsToMinimizeStalling
// //             progressUpdateInterval={1000} // Increase interval to avoid overloading with progress updates
// //           />
// //           {showMuteIcon && (
// //             <View style={styles.muteIconContainer}>
// //               <Icon
// //                 name={muted ? 'volume-off' : 'volume-up'}
// //                 size={50}
// //                 color="#fff"
// //               />
// //             </View>
// //           )}
// //         </TouchableOpacity>

// //         <View style={styles.camerabtn}>
// //           <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')}>
// //             <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
// //           </TouchableOpacity>
// //         </View>

// //         {/* video category */}
// //         <View style={styles.videocategory}>
// //           <Text style={styles.categoryText}>Category : Feeds</Text>
// //         </View>

// //         <View style={styles.iconContainer}>
// //           <TouchableOpacity
// //             onPress={() => handleLike(index)}
// //             style={styles.iconbackground}>
// //             <AntDesign
// //               name={item.like ? 'heart' : 'hearto'}
// //               style={{
// //                 fontSize: 30,
// //                 color: item.like ? 'red' : 'white',
// //                 marginTop: 0,
// //               }}
// //             />
// //           </TouchableOpacity>

// //           {/* Like Animation (GIF shown when liked) */}
// //           {item.showLikeAnimation && (
// //             <View style={styles.containerLike}>
// //               <Animated.Image
// //                 source={require('../../assets/likeGif/like.png')}
// //                 style={[
// //                   styles.giflike,
// //                   {transform: [{rotateY: flipRotation}]}, // Flip animation using rotateY
// //                 ]}
// //               />
// //             </View>
// //           )}
// //           <Text style={styles.actionCount}>325k</Text>
// //         </View>
// //       </View>
// //     ),
// //     [isPlaying, muted, showMuteIcon, autoScroll, tenSecondAutoScroll, data],
// //   );

// //   return (
// //     <View style={{flex: 1, borderTopRightRadius: 20}}>
// //       <StatusBar
// //         hidden={false}
// //         backgroundColor="#0b1321"
// //         barStyle="light-content"
// //       />
// //       <FlatList
// //         data={data}
// //         keyExtractor={item => item.id}
// //         renderItem={renderItem}
// //         pagingEnabled
// //         ref={flatListRef}
// //         initialNumToRender={1} // Render only 1 item initially to save memory
// //         maxToRenderPerBatch={2} // Render 2 items at a time
// //         windowSize={2} // Increase flatlist performance by rendering fewer items offscreen
// //         onViewableItemsChanged={handleViewableItemsChanged}
// //         viewabilityConfig={viewConfigRef.current}
// //         showsVerticalScrollIndicator={false}
// //         getItemLayout={(data, index) => ({
// //           length: height,
// //           offset: height * index,
// //           index,
// //         })} // Optimize list layout
// //       />
// //     </View>
// //   );
// // };

// // export default ReelsScreen;

// // const ReelsScreen = () => {
// //   const navigation = useNavigation();
// //   const [follow, setFollow] = useState(false);
// //   const [data, setData] = useState(initialData); // Store the updated data with like states
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isPlaying, setIsPlaying] = useState(null);
// //   const [autoScroll, setAutoScroll] = useState(false);
// //   const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
// //   const [muted, setMuted] = useState(false);
// //   const [showMuteIcon, setShowMuteIcon] = useState(false);
// //   const [videoDuration, setVideoDuration] = useState(5000); // Default video duration if unknown
// //   const [showLikeAnimation, setShowLikeAnimation] = useState(false);

// //   const flatListRef = useRef(null);
// //   const autoScrollTimeoutRef = useRef(null); // Reference for auto-scroll timeout

// //   // Handle auto-scroll with video duration or 10 seconds
// //   useEffect(() => {
// //     if (autoScroll || tenSecondAutoScroll) {
// //       const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
// //       if (scrollTime > 0) {
// //         autoScrollTimeoutRef.current = setTimeout(() => {
// //           if (flatListRef.current && currentIndex < data.length - 1) {
// //             flatListRef.current.scrollToIndex({index: currentIndex + 1});
// //           }
// //         }, scrollTime);
// //       }
// //     }

// //     // Clear timeout when component is unmounted or settings change
// //     return () => clearTimeout(autoScrollTimeoutRef.current);
// //   }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

// //   const handleLike = index => {
// //     const updatedData = [...data];
// //     updatedData[index].like = !updatedData[index].like; // Toggle like state for the specific item
// //     setData(updatedData); // Update the data state with the new like state

// //     setShowLikeAnimation(true); // Show GIF
// //     setTimeout(() => setShowLikeAnimation(false), 500); // Hide GIF after 2 seconds
// //   };

// //   const handleMute = () => {
// //     setMuted(!muted);
// //     setShowMuteIcon(true);
// //     setTimeout(() => setShowMuteIcon(false), 1000);
// //   };

// //   const handleLoad = meta => {
// //     setVideoDuration(meta.duration * 1000); // Set video duration in milliseconds
// //   };

// //   // Handle video pause when navigating away
// //   useFocusEffect(
// //     useCallback(() => {
// //       // On focus, play the video
// //       return () => {
// //         setIsPlaying(null); // On unfocus, stop playing videos
// //       };
// //     }, []),
// //   );

// //   const handleViewableItemsChanged = useCallback(({viewableItems}) => {
// //     if (viewableItems.length > 0) {
// //       const index = viewableItems[0].index;
// //       setCurrentIndex(index);
// //       setIsPlaying(viewableItems[0].item.id); // Only play the visible video
// //     }
// //   }, []);

// //   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

// //   const renderItem = useCallback(
// //     ({item, index}) => (
// //       <View
// //         style={{
// //           height: height,
// //           width: width,
// //           justifyContent: 'center',
// //           position: 'relative',
// //         }}>
// //         <TouchableOpacity
// //           activeOpacity={1}
// //           onPress={handleMute}
// //           style={{flex: 1}}>
// //           <Video
// //             source={{uri: item.video}}
// //             style={{width: '100%', height: '100%'}}
// //             muted={muted}
// //             paused={isPlaying !== item.id} // Play only the current video
// //             resizeMode="cover"
// //             repeat
// //             onLoad={handleLoad} // Set video duration when loaded
// //             bufferConfig={{
// //               minBufferMs: 7000,
// //               maxBufferMs: 15000,
// //               bufferForPlaybackMs: 2500,
// //               bufferForPlaybackAfterRebufferMs: 5000,
// //             }}
// //             onLoadStart={() => console.log('Loading video...')}
// //             onBuffer={() => console.log('Buffering video...')}
// //             onError={e => console.error('Video error: ', e)}
// //             automaticallyWaitsToMinimizeStalling
// //             progressUpdateInterval={1000} // Increase interval to avoid overloading with progress updates
// //           />
// //           {showMuteIcon && (
// //             <View style={styles.muteIconContainer}>
// //               <Icon
// //                 name={muted ? 'volume-off' : 'volume-up'}
// //                 size={50}
// //                 color="#fff"
// //               />
// //             </View>
// //           )}
// //         </TouchableOpacity>

// //         <View style={styles.camerabtn}>
// //           <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
// //           {/* Auto-scroll toggles */}
// //           <TouchableOpacity onPress={() => setAutoScroll(!autoScroll)}>
// //             <FontAwesome6
// //               name={autoScroll ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: autoScroll ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             Auto Scroll
// //           </Text>

// //           <TouchableOpacity
// //             onPress={() => setTenSecondAutoScroll(!tenSecondAutoScroll)}>
// //             <FontAwesome6
// //               name={tenSecondAutoScroll ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: tenSecondAutoScroll ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             10s Auto
// //           </Text>
// //         </View>

// //         {/* video category */}
// //         <View style={styles.videocategory}>
// //           <Text style={styles.categoryText}>Category : Motivation</Text>

// //           {/* Nature Profile */}
// //           <View style={styles.profileRow}>
// //             <TouchableOpacity>
// //               <Image
// //                 source={{uri: item.profilePic}}
// //                 style={styles.profileImage}
// //               />
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //               <Text style={styles.profileText}>Sports</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* Animal Profile */}
// //           <View style={styles.profileRow}>
// //             <TouchableOpacity>
// //               <Image
// //                 source={{uri: item.profilePic}}
// //                 style={styles.profileImage}
// //               />
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //               <Text style={styles.profileText}>Cute girls</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* More Option */}
// //           <View style={styles.moreRow}>
// //             <TouchableOpacity>
// //               <Image source={{uri: exp}} style={styles.moreIcon} />
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //             // onPress={() => navigation.navigate('VideoCategoryPage')}
// //             >
// //               <Text style={styles.moreText}>More</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Profile Image and Description */}
// //         <View style={styles.profileContainer}>
// //           <Image source={{uri: item.profilePic}} style={styles.profilePic} />
// //           <Text style={styles.description}>ReelBook</Text>

// //           <TouchableOpacity
// //             style={{width: follow ? 82 : 72}}
// //             onPress={() => setFollow(!follow)}>
// //             <View
// //               style={{
// //                 width: '100%',
// //                 height: 30,
// //                 borderWidth: follow ? 1 : 1,
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 borderColor: follow ? 'gray' : 'white',
// //                 borderRadius: 8,
// //                 marginLeft: 5,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: follow ? 'white' : 'white',
// //                   fontWeight: 'bold',
// //                   opacity: 0.8,
// //                 }}>
// //                 {follow ? 'Following' : 'Follow'}
// //               </Text>
// //             </View>
// //           </TouchableOpacity>
// //         </View>
// //         {/* Profile Image and Description */}
// //         <View style={styles.discription}>
// //           <Text style={styles.description}>{item.description}</Text>
// //         </View>

// //         <View style={styles.iconContainer}>
// //           {/* Like Button */}
// //           <TouchableOpacity onPress={() => handleLike(index)}>
// //             <AntDesign
// //               name={item.like ? 'heart' : 'hearto'}
// //               style={{
// //                 fontSize: 30,
// //                 color: item.like ? 'red' : 'white',
// //                 marginTop: 15,
// //               }}
// //             />
// //           </TouchableOpacity>

// //           {/* Like Animation (GIF shown when liked) */}
// //           {showLikeAnimation && (
// //             <Image
// //               source={likeGif}
// //               style={{
// //                 position: 'absolute',
// //                 bottom: 265,
// //                 right: 10,
// //                 width: 100,
// //                 height: 100,
// //               }}
// //             />
// //           )}
// //           <Text style={styles.actionCount}>325k</Text>

// //           <TouchableOpacity>
// //             <MaterialCommunityIcons
// //               name="comment-text-outline"
// //               style={styles.icon}
// //             />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>22k</Text>

// //           <TouchableOpacity>
// //             <FontAwesome name="share" style={styles.icon} />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>86k</Text>

// //           <TouchableOpacity onPress={() => setLoader(true)}>
// //             <Feather name="more-vertical" style={styles.icon} />
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
// //             <Image source={{uri: music}} style={styles.musicImage} />
// //           </TouchableOpacity>
// //           <Text style={styles.musicText}>🎶</Text>
// //         </View>
// //       </View>
// //     ),
// //     [isPlaying, muted, showMuteIcon, autoScroll, tenSecondAutoScroll, data],
// //   );

// //   return (
// //     <View style={{flex: 1}}>
// //       <FlatList
// //         data={data}
// //         keyExtractor={item => item.id}
// //         renderItem={renderItem}
// //         pagingEnabled
// //         ref={flatListRef}
// //         initialNumToRender={1} // Render only 1 item initially to save memory
// //         maxToRenderPerBatch={2} // Render 2 items at a time
// //         windowSize={2} // Increase flatlist performance by rendering fewer items offscreen
// //         onViewableItemsChanged={handleViewableItemsChanged}
// //         viewabilityConfig={viewConfigRef.current}
// //         showsVerticalScrollIndicator={false}
// //         getItemLayout={(data, index) => ({
// //           length: height,
// //           offset: height * index,
// //           index,
// //         })} // Optimize list layout
// //       />
// //     </View>
// //   );
// // };

// // export default ReelsScreen;

// // import React, {useState, useRef, useEffect, useCallback} from 'react';
// // import {
// //   View,
// //   FlatList,
// //   Dimensions,
// //   TouchableOpacity,
// //   Text,
// //   Image,
// // } from 'react-native';
// // import Video from 'react-native-video';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import Feather from 'react-native-vector-icons/Feather';
// // import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // import {data} from './Database';
// // import styles from './reelsStyle';
// // import {useNavigation, useFocusEffect} from '@react-navigation/native';

// // const {height, width} = Dimensions.get('window');
// // const exp =
// //   'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// // const music =
// //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// // const likeGif = require('../../assets/likeGif/like.gif'); // Your GIF path

// // const ReelsScreen = () => {
// //   const navigation = useNavigation();
// //   const [follow, setFollow] = useState(false);
// //   const [like, setLike] = useState(false);
// //   // const [like, setLike] = useState(false);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isPlaying, setIsPlaying] = useState(null);
// //   const [autoScroll, setAutoScroll] = useState(false);
// //   const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
// //   const [muted, setMuted] = useState(false);
// //   const [showMuteIcon, setShowMuteIcon] = useState(false);
// //   const [videoDuration, setVideoDuration] = useState(5000); // Default video duration if unknown
// //   const [showLikeAnimation, setShowLikeAnimation] = useState(false);

// //   const flatListRef = useRef(null);
// //   const autoScrollTimeoutRef = useRef(null); // Reference for auto-scroll timeout

// //   // Handle auto-scroll with video duration or 10 seconds
// //   useEffect(() => {
// //     if (autoScroll || tenSecondAutoScroll) {
// //       const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
// //       if (scrollTime > 0) {
// //         autoScrollTimeoutRef.current = setTimeout(() => {
// //           if (flatListRef.current && currentIndex < data.length - 1) {
// //             flatListRef.current.scrollToIndex({index: currentIndex + 1});
// //           }
// //         }, scrollTime);
// //       }
// //     }

// //     // Clear timeout when component is unmounted or settings change
// //     return () => clearTimeout(autoScrollTimeoutRef.current);
// //   }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

// //   const handleLike = () => {
// //     setLike(!like); // Toggle like state
// //     setShowLikeAnimation(true); // Show GIF
// //     setTimeout(() => setShowLikeAnimation(false), 2000); // Hide GIF after 2 seconds
// //   };

// //   const handleMute = () => {
// //     setMuted(!muted);
// //     setShowMuteIcon(true);
// //     setTimeout(() => setShowMuteIcon(false), 1000);
// //   };

// //   const handleLoad = meta => {
// //     setVideoDuration(meta.duration * 1000); // Set video duration in milliseconds
// //   };

// //   // Handle video pause when navigating away
// //   useFocusEffect(
// //     useCallback(() => {
// //       // On focus, play the video
// //       return () => {
// //         setIsPlaying(null); // On unfocus, stop playing videos
// //       };
// //     }, []),
// //   );

// //   const handleViewableItemsChanged = useCallback(({viewableItems}) => {
// //     if (viewableItems.length > 0) {
// //       const index = viewableItems[0].index;
// //       setCurrentIndex(index);
// //       setIsPlaying(viewableItems[0].item.id); // Only play the visible video
// //     }
// //   }, []);

// //   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

// //   const renderItem = useCallback(
// //     ({item, index}) => (
// //       <View
// //         style={{
// //           height: height,
// //           width: width,
// //           justifyContent: 'center',
// //           position: 'relative',
// //         }}>
// //         <TouchableOpacity
// //           activeOpacity={1}
// //           onPress={handleMute}
// //           style={{flex: 1}}>
// //           <Video
// //             source={{uri: item.video}}
// //             style={{width: '100%', height: '100%'}}
// //             muted={muted}
// //             paused={isPlaying !== item.id} // Play only the current video
// //             resizeMode="cover"
// //             repeat
// //             onLoad={handleLoad} // Set video duration when loaded
// //             bufferConfig={{
// //               minBufferMs: 7000,
// //               maxBufferMs: 15000,
// //               bufferForPlaybackMs: 2500,
// //               bufferForPlaybackAfterRebufferMs: 5000,
// //             }}
// //             onLoadStart={() => console.log('Loading video...')}
// //             onBuffer={() => console.log('Buffering video...')}
// //             onError={e => console.error('Video error: ', e)}
// //             automaticallyWaitsToMinimizeStalling
// //             progressUpdateInterval={1000} // Increase interval to avoid overloading with progress updates
// //           />
// //           {showMuteIcon && (
// //             <View style={styles.muteIconContainer}>
// //               <Icon
// //                 name={muted ? 'volume-off' : 'volume-up'}
// //                 size={50}
// //                 color="#fff"
// //               />
// //             </View>
// //           )}
// //         </TouchableOpacity>
// //         {/* Camera option */}
// //         <View style={styles.camerabtn}>
// //           <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
// //           <TouchableOpacity onPress={() => setAutoScroll(!autoScroll)}>
// //             <FontAwesome6
// //               name={autoScroll ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: autoScroll ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>

// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             Auto
// //           </Text>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             Scroll
// //           </Text>

// //           <TouchableOpacity
// //             onPress={() => setTenSecondAutoScroll(!tenSecondAutoScroll)}>
// //             <FontAwesome6
// //               name={tenSecondAutoScroll ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: tenSecondAutoScroll ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             10s Auto
// //           </Text>
// //         </View>
// //         {/* Other UI elements like profiles, descriptions, and action icons */}
// //         {/* ... */}
// //         {/* video category */}
// //         <View style={styles.videocategory}>
// //           <Text style={styles.categoryText}>Category : Feed</Text>
// //           {/* Nature Profile */}
// //           <View style={styles.profileRow}>
// //             <TouchableOpacity>
// //               <Image
// //                 source={{uri: item.profilePic}}
// //                 style={styles.profileImage}
// //               />
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //               <Text style={styles.profileText}>Nature</Text>
// //             </TouchableOpacity>
// //           </View>
// //           {/* Animal Profile */}
// //           <View style={styles.profileRow}>
// //             <TouchableOpacity>
// //               <Image
// //                 source={{uri: item.profilePic}}
// //                 style={styles.profileImage}
// //               />
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //               <Text style={styles.profileText}>Animal</Text>
// //             </TouchableOpacity>
// //           </View>
// //           {/* More Option */}
// //           <View style={styles.moreRow}>
// //             <TouchableOpacity>
// //               <Image source={{uri: exp}} style={styles.moreIcon} />
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //             // onPress={() => navigation.navigate('VideoCategoryPage')}
// //             >
// //               <Text style={styles.moreText}>More</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //         {/* Profile Image and Description */}
// //         <View style={styles.profileContainer}>
// //           <Image source={{uri: item.profilePic}} style={styles.profilePic} />
// //           <Text style={styles.description}>ReelBook</Text>

// //           <TouchableOpacity
// //             style={{width: follow ? 82 : 72}}
// //             onPress={() => setFollow(!follow)}>
// //             <View
// //               style={{
// //                 width: '100%',
// //                 height: 30,
// //                 borderWidth: follow ? 1 : 1,
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 borderColor: follow ? 'gray' : 'white',
// //                 borderRadius: 8,
// //                 marginLeft: 5,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: follow ? 'white' : 'white',
// //                   fontWeight: 'bold',
// //                   opacity: 0.8,
// //                 }}>
// //                 {follow ? 'Following' : 'Follow'}
// //               </Text>
// //             </View>
// //           </TouchableOpacity>
// //         </View>
// //         {/* Profile Image and Description */}
// //         <View style={styles.discription}>
// //           <Text style={styles.description}>{item.description}</Text>
// //         </View>
// //         {/* Like, Comment, and Share Icons */}
// //         <View style={styles.iconContainer}>
// //           {/* Like Button */}
// //           <TouchableOpacity onPress={handleLike}>
// //             <AntDesign
// //               name={like ? 'heart' : 'hearto'}
// //               style={{
// //                 fontSize: 30,
// //                 color: like ? 'red' : 'white',
// //                 marginTop: 15,
// //               }}
// //             />
// //           </TouchableOpacity>

// //           {/* Like Animation (GIF shown when liked) */}
// //           {showLikeAnimation && (
// //             <Image
// //               source={likeGif}
// //               style={{
// //                 position: 'absolute',
// //                 bottom: 80,
// //                 right: 20,
// //                 width: 100,
// //                 height: 100,
// //               }}
// //             />
// //           )}
// //           {/* <TouchableOpacity onPress={() => setLike(!like)}>
// //             <AntDesign
// //               name={like ? 'heart' : 'hearto'}
// //               style={{
// //                 fontSize: 30,
// //                 color: like ? 'red' : 'white',
// //                 marginTop: 15,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           */}
// //           <Text style={styles.actionCount}>325k</Text>

// //           <TouchableOpacity>
// //             <MaterialCommunityIcons
// //               name="comment-text-outline"
// //               style={styles.icon}
// //             />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>22k</Text>

// //           <TouchableOpacity>
// //             <FontAwesome name="share" style={styles.icon} />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>86k</Text>

// //           <TouchableOpacity onPress={() => setLoader(true)}>
// //             <Feather name="more-vertical" style={styles.icon} />
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
// //             <Image source={{uri: music}} style={styles.musicImage} />
// //           </TouchableOpacity>
// //           <Text style={styles.musicText}>🎶</Text>
// //         </View>
// //       </View>
// //     ),
// //     [isPlaying, muted, showMuteIcon, autoScroll, tenSecondAutoScroll],
// //   );

// //   return (
// //     <View style={{flex: 1}}>
// //       <FlatList
// //         data={data}
// //         keyExtractor={item => item.id}
// //         renderItem={renderItem}
// //         pagingEnabled
// //         ref={flatListRef}
// //         initialNumToRender={1} // Render only 1 item initially to save memory
// //         maxToRenderPerBatch={2} // Render 2 items at a time
// //         windowSize={2} // Increase flatlist performance by rendering fewer items offscreen
// //         onViewableItemsChanged={handleViewableItemsChanged}
// //         viewabilityConfig={viewConfigRef.current}
// //         showsVerticalScrollIndicator={false}
// //         getItemLayout={(data, index) => ({
// //           length: height,
// //           offset: height * index,
// //           index,
// //         })} // Optimize list layout
// //       />
// //     </View>
// //   );
// // };

// // export default ReelsScreen;

// // import React, {useState, useRef, useEffect, useCallback} from 'react';
// // import {
// //   View,
// //   FlatList,
// //   Dimensions,
// //   TouchableOpacity,
// //   Text,
// //   Image,
// // } from 'react-native';
// // import Video from 'react-native-video';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import Feather from 'react-native-vector-icons/Feather';
// // import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // import {data} from './Database';
// // import styles from './reelsStyle';
// // import {useNavigation} from '@react-navigation/native';

// // const {height, width} = Dimensions.get('window');
// // const exp =
// //   'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// // const music =
// //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// // const ReelsScreen = () => {

// //   const navigation = useNavigation();
// //   const [follow, setFollow] = useState(false);
// //   const [like, setLike] = useState(false);
// //   const [showLikeAnimation, setShowLikeAnimation] = useState(false);

// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isPlaying, setIsPlaying] = useState(null);
// //   const [autoScroll, setAutoScroll] = useState(false);
// //   const [muted, setMuted] = useState(false);
// //   const [showMuteIcon, setShowMuteIcon] = useState(false);
// //   const [videoDuration, setVideoDuration] = useState(5000); // Default video duration if unknown

// //   const flatListRef = useRef(null);
// //   const autoScrollTimeoutRef = useRef(null); // Reference for auto-scroll timeout

// //   const [autoScroll10Sec, setAutoScroll10Sec] = useState(false); // Auto-scroll toggle
// //   const autoScroll10SecTimeoutRef = useRef(null);

// //   // Auto-scroll after 10 seconds
// //   useEffect(() => {
// //     if (autoScroll10Sec) {
// //       autoScroll10SecTimeoutRef.current = setTimeout(() => {
// //         if (flatListRef.current && currentIndex < data.length - 1) {
// //           flatListRef.current.scrollToIndex({index: currentIndex + 1});
// //         }
// //       }, 10000); // 10 seconds delay
// //     }
// //     return () => clearTimeout(autoScroll10SecTimeoutRef.current); // Cleanup
// //   }, [currentIndex, autoScroll10Sec]);

// //   const handleViewableItemsChanged = useCallback(({viewableItems}) => {
// //     if (viewableItems.length > 0) {
// //       const index = viewableItems[0].index;
// //       setCurrentIndex(index);
// //       setIsPlaying(viewableItems[0].item.id); // Only play the visible video
// //     }
// //   }, []);

// //   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

// //   // Auto-scroll based on video duration
// //   useEffect(() => {
// //     if (autoScroll && videoDuration > 0) {
// //       autoScrollTimeoutRef.current = setTimeout(() => {
// //         if (flatListRef.current && currentIndex < data.length - 1) {
// //           flatListRef.current.scrollToIndex({index: currentIndex + 1});
// //         }
// //       }, videoDuration);
// //     }
// //     // Clear timeout if the user navigates or scrolls
// //     return () => clearTimeout(autoScrollTimeoutRef.current);
// //   }, [currentIndex, videoDuration, autoScroll]);

// //   const handleMute = () => {
// //     setMuted(!muted);
// //     setShowMuteIcon(true);
// //     setTimeout(() => setShowMuteIcon(false), 1000);
// //   };

// //   const handleLoad = meta => {
// //     setVideoDuration(meta.duration * 1000); // Get video duration in milliseconds
// //   };

// //   const handleLike = () => {
// //     setLike(!like); // Toggle like state
// //     setShowLikeAnimation(true); // Show GIF
// //     setTimeout(() => setShowLikeAnimation(false), 2000); // Hide GIF after 2 seconds
// //   };

// //   const renderItem = useCallback(
// //     ({item, index}) => (
// //       <View
// //         style={{
// //           height: height,
// //           width: width,
// //           justifyContent: 'center',
// //           position: 'relative',
// //         }}>
// //         <TouchableOpacity
// //           activeOpacity={1}
// //           onPress={handleMute}
// //           style={{flex: 1}}>
// //           <Video
// //             source={{uri: item.video}}
// //             style={{width: '100%', height: '100%'}}
// //             muted={muted}
// //             paused={isPlaying !== item.id} // Play only the current video
// //             resizeMode="cover"
// //             repeat
// //             onLoad={handleLoad} // Set video duration when loaded
// //             bufferConfig={{
// //               minBufferMs: 7000, // Increase the minimum buffer to prevent stalling
// //               maxBufferMs: 15000, // Allow up to 15 seconds of buffering
// //               bufferForPlaybackMs: 2500, // Start playing after 2.5 seconds of buffer
// //               bufferForPlaybackAfterRebufferMs: 5000, // Buffer again if we drop below 5 seconds
// //             }}
// //             onLoadStart={() => console.log('Loading video...')}
// //             onBuffer={() => console.log('Buffering video...')}
// //             onError={e => console.error('Video error: ', e)}
// //             automaticallyWaitsToMinimizeStalling
// //             progressUpdateInterval={1000} // Increase interval to avoid overloading with progress updates
// //           />
// //           {showMuteIcon && (
// //             <View style={styles.muteIconContainer}>
// //               <Icon
// //                 name={muted ? 'volume-off' : 'volume-up'}
// //                 size={50}
// //                 color="#fff"
// //               />
// //             </View>
// //           )}
// //         </TouchableOpacity>

// //         {/* camera option */}
// //         <View style={styles.camerabtn}>
// //           <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
// //           <TouchableOpacity onPress={() => setAutoScroll(!autoScroll)}>
// //             <FontAwesome6
// //               name={autoScroll ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: autoScroll ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>

// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             Auto
// //           </Text>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             Scroll
// //           </Text>

// //           {/* Auto Scroll 10s Button */}

// //           <TouchableOpacity
// //             onPress={() => setAutoScroll10Sec(!autoScroll10Sec)}>
// //             <FontAwesome6
// //               name={autoScroll10Sec ? 'toggle-on' : 'toggle-off'}
// //               style={{
// //                 fontSize: 35,
// //                 color: autoScroll10Sec ? 'gray' : 'white',
// //                 marginTop: 10,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
// //             Auto 10s
// //           </Text>
// //         </View>

// //         {/* video category */}
// //         <View style={styles.videocategory}>
// //           <Text style={styles.categoryText}>Category : Feed</Text>

// //           {/* Nature Profile */}
// //           <View style={styles.profileRow}>
// //             <TouchableOpacity>
// //               <Image
// //                 source={{uri: item.profilePic}}
// //                 style={styles.profileImage}
// //               />
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //               <Text style={styles.profileText}>Nature</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* Animal Profile */}
// //           <View style={styles.profileRow}>
// //             <TouchableOpacity>
// //               <Image
// //                 source={{uri: item.profilePic}}
// //                 style={styles.profileImage}
// //               />
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //               <Text style={styles.profileText}>Animal</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* More Option */}
// //           <View style={styles.moreRow}>
// //             <TouchableOpacity>
// //               <Image source={{uri: exp}} style={styles.moreIcon} />
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //             // onPress={() => navigation.navigate('VideoCategoryPage')}
// //             >
// //               <Text style={styles.moreText}>More</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Profile Image and Description */}
// //         <View style={styles.profileContainer}>
// //           <Image source={{uri: item.profilePic}} style={styles.profilePic} />
// //           <Text style={styles.description}>ReelBook</Text>

// //           <TouchableOpacity
// //             style={{width: follow ? 82 : 72}}
// //             onPress={() => setFollow(!follow)}>
// //             <View
// //               style={{
// //                 width: '100%',
// //                 height: 30,
// //                 borderWidth: follow ? 1 : 1,
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 borderColor: follow ? 'gray' : 'white',
// //                 borderRadius: 8,
// //                 marginLeft: 5,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: follow ? 'white' : 'white',
// //                   fontWeight: 'bold',
// //                   opacity: 0.8,
// //                 }}>
// //                 {follow ? 'Following' : 'Follow'}
// //               </Text>
// //             </View>
// //           </TouchableOpacity>
// //         </View>
// //         {/* Profile Image and Description */}
// //         <View style={styles.discription}>
// //           <Text style={styles.description}>{item.description}</Text>
// //         </View>

// //         {/* Like, Comment, and Share Icons */}
// //         <View style={styles.iconContainer}>
// //           <TouchableOpacity onPress={() => setLike(!like)}>
// //             <AntDesign
// //               name={like ? 'heart' : 'hearto'}
// //               style={{
// //                 fontSize: 30,
// //                 color: like ? 'red' : 'white',
// //                 marginTop: 15,
// //               }}
// //             />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>325k</Text>

// //           {/* Like Animation (GIF shown when liked) */}
// //           {showLikeAnimation && (
// //             <Image
// //               source={likeGif}
// //               style={{
// //                 position: 'absolute',
// //                 bottom: 80,
// //                 right: 20,
// //                 width: 100,
// //                 height: 100,
// //               }}
// //             />
// //           )}

// //           <TouchableOpacity>
// //             <MaterialCommunityIcons
// //               name="comment-text-outline"
// //               style={styles.icon}
// //             />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>22k</Text>

// //           <TouchableOpacity>
// //             <FontAwesome name="share" style={styles.icon} />
// //           </TouchableOpacity>
// //           <Text style={styles.actionCount}>86k</Text>

// //           <TouchableOpacity onPress={() => setLoader(true)}>
// //             <Feather name="more-vertical" style={styles.icon} />
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
// //             <Image source={{uri: music}} style={styles.musicImage} />
// //           </TouchableOpacity>
// //           <Text style={styles.musicText}>🎶</Text>
// //         </View>
// //       </View>
// //     ),
// //     [isPlaying, muted, showMuteIcon],
// //   );

// //   return (
// //     <View style={{flex: 1}}>
// //       <FlatList
// //         data={data}
// //         keyExtractor={item => item.id}
// //         renderItem={renderItem}
// //         pagingEnabled
// //         ref={flatListRef}
// //         initialNumToRender={1} // Render only 1 item initially to save memory
// //         maxToRenderPerBatch={2} // Render 2 items at a time
// //         windowSize={2} // Increase flatlist performance by rendering fewer items offscreen
// //         onViewableItemsChanged={handleViewableItemsChanged}
// //         viewabilityConfig={viewConfigRef.current}
// //         showsVerticalScrollIndicator={false}
// //         getItemLayout={(data, index) => ({
// //           length: height,
// //           offset: height * index,
// //           index,
// //         })} // Optimize list layout
// //       />

// //       {/* Auto Scroll Toggle Button */}
// //       {/* <TouchableOpacity
// //         style={styles.autoScrollButton}
// //         onPress={() => setAutoScroll(!autoScroll)}>
// //         <Text style={styles.autoScrollText}>
// //           {autoScroll ? 'Auto-Scroll on' : 'Auto-Scroll off'}
// //         </Text>
// //       </TouchableOpacity> */}
// //     </View>
// //   );
// // };

// // export default ReelsScreen;
