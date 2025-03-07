// ############################################
// ############################################
// ############ working code Gym imp ##################
// ############################################
// ############################################
// ############################################

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
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {data as initialData} from '../reelsScreen/Database';
import styles from '../reelsScreen/reelsStyle';
import GradientButton from '../newpostScreen/photopost/comp/GradientButton';
const likeGif = require('../../assets/likeGif/like.png'); // Your GIF path
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import backendURL, {GETVIDEO_POST} from '../../utils/Strings';

const {height, width} = Dimensions.get('window');
const exp =
  'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
const music =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

const PlayVideoListItem = () => {
  const params = useRoute().params;
  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Controls pull-to-refresh

  useEffect(() => {
    setVideoList([params.selectedVideo]);
    getVideoData();
  }, []);

  const getVideoData = () => {
    setLoading(true);
    fetch(backendURL + GETVIDEO_POST)
      .then(res => res.json())
      .then(json => {
        const data = json.files.slice(0, 12); // Limits to 6 videos
        // spred opereter
        // setVideoList(limitedVideos);
        setVideoList(videoList => [...videoList, ...data]);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const navigation = useNavigation();
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
  //flip like img
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
  };

  // Handle video pause when navigating away
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
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleMute}
          style={{flex: 1}}>
          <Video
            // source={{uri: video?.url}}
            source={{uri: item.url}}
            style={{width: '100%', height: '100%'}}
            muted={muted}
            paused={isPlaying !== item.id} // Play only the current video
            resizeMode="cover"
            repeat
            onLoad={handleLoad} // Set video duration when loaded
            bufferConfig={{
              minBufferMs: 7000,
              maxBufferMs: 15000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            onLoadStart={() => console.log('Loading video...')}
            onBuffer={() => console.log('Buffering video...')}
            onError={e => console.error('Video error: ', e)}
            automaticallyWaitsToMinimizeStalling
            progressUpdateInterval={1000} // Increase interval to avoid overloading with progress updates
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
        </TouchableOpacity>

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

          <TouchableOpacity
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
          </Text>
        </View>

        {/* video category */}
        <View style={styles.videocategory}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=> navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={25}
              color="white"
              style={{marginRight: 8}}
            />

            <Text style={styles.categoryText}>Back</Text>
          </TouchableOpacity>

          {/* Nature Profile */}
          {/* <View style={styles.profileRow}>
            <TouchableOpacity>
              <Image
                source={{uri: item.profilePic}}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.profileText}>Sports</Text>
            </TouchableOpacity>
          </View> */}

          {/* Animal Profile */}
          {/* <View style={styles.profileRow}>
            <TouchableOpacity>
              <Image
                source={{uri: item.profilePic}}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.profileText}>Cute girls</Text>
            </TouchableOpacity>
          </View> */}

          {/* More Option */}
          {/* <View style={styles.moreRow}>
            <TouchableOpacity>
              <Image source={{uri: exp}} style={styles.moreIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('VideoCategoryPage')}>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        {/* Profile Image and Description */}
        <View style={styles.profileContainer}>
          <Image source={{uri: item.profilePic}} style={styles.profilePic} />
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
            {/* {item.description.length > 105
              ? item.description.slice(0, 105).toLowerCase() + '...'
              : item.description.toUpperCase()} */}
            {item.fileName}
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
                fontSize: 30,
                color: item.like ? 'red' : 'white',
                marginTop: 0,
              }}
            />
          </TouchableOpacity>

          {/* Like Animation (GIF shown when liked) */}
          {item.showLikeAnimation && (
            // <Image
            //   source={likeGif}
            //   style={[
            //     styles.giflike,
            //     {transform: [{scaleX: flipped ? -1 : 1}]},
            //   ]}
            // />
            <View style={styles.containerLike}>
              <Animated.Image
                source={require('../../assets/likeGif/like.png')}
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#131517',
            // height:50,
          }}>
          <TouchableOpacity style={styles.reelbtn}>
            <GradientButton
              title=" Back to Home "
              link="HomeScreen"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reelbtn}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            <GradientButton
              title=" Explore Category "
              link="VideoCategoryPage"
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [isPlaying, muted, showMuteIcon, autoScroll, tenSecondAutoScroll],
  );

  return (
    <View style={{flex: 1, borderTopRightRadius: 20}}>
      <StatusBar
        hidden={false}
        backgroundColor="#0b1321"
        barStyle="light-content"
      />
      {/* <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        ref={flatListRef}
        initialNumToRender={1} // Render only 1 item initially to save memory
        maxToRenderPerBatch={2} // Render 2 items at a time
        windowSize={2} // Increase flatlist performance by rendering fewer items offscreen
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })} // Optimize list layout
      /> */}

      <FlatList
        // style={{zIndex: -1}}
        data={videoList}
        renderItem={renderItem}
        pagingEnabled
        ref={flatListRef}
        initialNumToRender={1} // Render only 1 item initially to save memory
        maxToRenderPerBatch={2} // Render 2 items at a time
        windowSize={2} // Increase flatlist performance by rendering fewer items offscreen
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        // getItemLayout={(data, index) => ({
        //   length: height,
        //   offset: height * index,
        //   index,
        // })} // Optimize list layout
        // renderItem={({item, index}) => (
        //   <PlayVideoListItem video={item} key={index} />
        // )}
      />
    </View>
  );
};

export default PlayVideoListItem;

// ############################################
// ############################################
// ############ working code ##################
// ############################################
// ############################################
// ############################################

// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';
// import React, {useEffect, useState, useRef, useCallback} from 'react';
// import {useFocusEffect} from '@react-navigation/native';
// import Video from 'react-native-video';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const {height, width} = Dimensions.get('window');
// import {data as initialData} from '../reelsScreen/Database';
// import styles from '../reelsScreen/reelsStyle';
// import GradientButton from '../newpostScreen/photopost/comp/GradientButton';
// // const likeGif = require('../../assets/likeGif/like.png'); // Your GIF path
// const exp =
//   'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// const music =
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// const PlayVideoListItem = ({video, index}) => {
//   //   const videoRef = useRef(null);
//   const [follow, setFollow] = useState(false);
//   const [data, setData] = useState(
//     initialData.map(item => ({...item, showLikeAnimation: false})), // Add showLikeAnimation state to each item
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

//   // Handle auto-scroll with video duration or 10 seconds
//   useEffect(() => {
//     if (autoScroll || tenSecondAutoScroll) {
//       const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
//       if (scrollTime > 0) {
//         autoScrollTimeoutRef.current = setTimeout(() => {
//           if (flatListRef.current && currentIndex < data.length - 1) {
//             flatListRef.current.scrollToIndex({index: currentIndex + 1});
//           }
//         }, scrollTime);
//       }
//     }

//     // Clear timeout when component is unmounted or settings change
//     return () => clearTimeout(autoScrollTimeoutRef.current);
//   }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

//   const handleLike = index => {
//     const updatedData = [...data];
//     updatedData[index].like = !updatedData[index].like; // Toggle like state for the specific item
//     updatedData[index].showLikeAnimation = true; // Show GIF animation for the specific item
//     setData(updatedData); // Update the data state with the new like state

//     setTimeout(() => {
//       const updatedDataWithHiddenAnimation = [...updatedData];
//       updatedDataWithHiddenAnimation[index].showLikeAnimation = false; // Hide the GIF after 500ms
//       setData(updatedDataWithHiddenAnimation);
//     }, 600);
//   };
//   //flip like img
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
//   };

//   // Handle video pause when navigating away
//   useFocusEffect(
//     useCallback(() => {
//       return () => {
//         setIsPlaying(null); // Stop playing videos when unfocused
//       };
//     }, []),
//   );

//   const handleViewableItemsChanged = useCallback(({viewableItems}) => {
//     if (viewableItems.length > 0) {
//       const index = viewableItems[0].index;
//       setCurrentIndex(index);
//       setIsPlaying(viewableItems[0].item.id); // Only play the visible video
//     }
//   }, []);

//   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

//   return (
//     <View>
//       <View
//         style={{
//           height: height,
//           width: width,
//           justifyContent: 'center',
//           position: 'relative',
//         }}>
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={handleMute}
//           style={{flex: 1}}>
//           <Video
//             source={{uri: video?.url}}
//             // style={styles.video}
//             style={{width: '100%', height: '100%'}}
//             resizeMode="cover"
//             repeat={true}
//             // muted={muted} // Controlled by the muted state
//             paused={false} // Autoplay the video
//             playInBackground={false}
//           />
//         </TouchableOpacity>
//         <View style={styles.camerabtn}>
//           <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')}>
//             <Feather name="camera" style={{fontSize: 35, color: 'white'}} />
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
//           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
//             Auto Scroll
//           </Text>

//           <TouchableOpacity
//             onPress={() => setTenSecondAutoScroll(!tenSecondAutoScroll)}>
//             <FontAwesome6
//               name={tenSecondAutoScroll ? 'toggle-on' : 'toggle-off'}
//               style={{
//                 fontSize: 35,
//                 color: tenSecondAutoScroll ? 'gray' : 'white',
//                 marginTop: 10,
//               }}
//             />
//           </TouchableOpacity>
//           <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
//             10s Auto
//           </Text>
//         </View>

//         {/* video category */}
//         <View style={styles.videocategory}>
//           <Text style={styles.categoryText}></Text>

//           {/* Nature Profile */}
//           <View style={styles.profileRow}>
//             <TouchableOpacity>
//               <Image
//                 source={{
//                   uri: 'https://i.pinimg.com/474x/2a/63/7a/2a637ad55088ffa297ed62989b2061ff.jpg',
//                 }}
//                 style={styles.profileImage}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={styles.profileText}>Sports</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Animal Profile */}
//           <View style={styles.profileRow}>
//             <TouchableOpacity>
//               <Image
//                 source={{
//                   uri: 'https://i.pinimg.com/474x/2a/63/7a/2a637ad55088ffa297ed62989b2061ff.jpg',
//                 }}
//                 style={styles.profileImage}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={styles.profileText}>Cute girls</Text>
//             </TouchableOpacity>
//           </View>

//           {/* More Option */}
//           <View style={styles.moreRow}>
//             <TouchableOpacity>
//               <Image source={{uri: exp}} style={styles.moreIcon} />
//             </TouchableOpacity>
//             <TouchableOpacity
//             // onPress={() => navigation.navigate('VideoCategoryPage')}
//             >
//               <Text style={styles.moreText}>More</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Profile Image and Description */}
//         <View style={styles.profileContainer}>
//           {/* <Image source={{uri: item.profilePic}} style={styles.profilePic} /> */}
//           <Image
//             source={{
//               uri: 'https://i.pinimg.com/474x/2a/63/7a/2a637ad55088ffa297ed62989b2061ff.jpg',
//             }}
//             style={styles.profilePic}
//           />
//           <Text style={styles.description}>ReelBook</Text>

//           <TouchableOpacity
//             style={{width: follow ? 82 : 72}}
//             onPress={() => setFollow(!follow)}>
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
//               }}>
//               <Text
//                 style={{
//                   color: follow ? 'white' : 'white',
//                   fontWeight: 'bold',
//                   opacity: 0.8,
//                 }}>
//                 {follow ? 'Following' : 'Follow'}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Profile Image and Description */}
//         <View style={styles.discription}>
//           <Text style={styles.description}>
//             Good Nice Bai osm
//             {/* {item.description} */}
//             {/* {item.description.length > 105
//               ? item.description.slice(0, 105).toLowerCase() + '...'
//               : item.description.toUpperCase()} */}
//           </Text>
//         </View>
//         <View style={styles.craditbox}>
//           <Text>
//             {' '}
//             <Text style={{color: 'green', fontWeight: 'bold'}}>
//               Cradit
//             </Text> :{' '}
//             <Text style={{color: '#1668db', fontWeight: 'bold'}}>@</Text>
//             {'elvish_yadav'}
//           </Text>
//         </View>

//         <View style={styles.iconContainer}>
//           <TouchableOpacity
//             onPress={() => handleLike(index)}
//             style={styles.iconbackground}>
//             <AntDesign
//               //   name={like ? 'heart' : 'hearto'}
//               name="hearto"
//               style={{
//                 fontSize: 30,
//                 // color: like ? 'red' : 'white',
//                 color: 'white',
//                 marginTop: 0,
//               }}
//             />
//           </TouchableOpacity>

//           {/* Like Animation (GIF shown when liked) */}
//           {/* {showLikeAnimation && (
//             <View style={styles.containerLike}>
//               <Animated.Image
//                 source={require('../../assets/likeGif/like.png')}
//                 style={[
//                   styles.giflike,
//                   {transform: [{rotateY: flipRotation}]}, // Flip animation using rotateY
//                 ]}
//               />
//             </View>
//           )} */}

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

//           <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
//             <Image source={{uri: music}} style={styles.musicImage} />
//           </TouchableOpacity>
//           <Text style={styles.musicText}>🎶</Text>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: '#131517',
//             // height:50,
//           }}>
//           <TouchableOpacity style={styles.reelbtn}>
//             <GradientButton
//               title="           Back to Home           "
//               link="HomeScreen"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.reelbtn}
//             onPress={() => {
//               navigation.navigate('HomeScreen');
//             }}>
//             <GradientButton
//               title="        Explore Category      "
//               link="VideoCategoryPage"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* <Video
//         source={{uri: video?.url}}
//         // style={styles.video}
//         style={{width: '100%', height: '100%'}}
//         resizeMode="cover"
//         repeat={true}
//         // muted={muted} // Controlled by the muted state
//         paused={false} // Autoplay the video
//         playInBackground={false}
//       /> */}
//     </View>
//   );
// };

// export default PlayVideoListItem;

// // const styles = StyleSheet.create({

// // });

//////////////////not working
// import React, {useState, useRef, useEffect, useCallback} from 'react';
// import {
//   View,
//   Dimensions,
//   TouchableOpacity,
//   Text,
//   Image,
//   StatusBar,
//   Animated,
// } from 'react-native';
// import Video from 'react-native-video';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';

// import styles from '../reelsScreen/reelsStyle';
// import GradientButton from '../newpostScreen/photopost/comp/GradientButton';
// const likeGif = require('../../assets/likeGif/like.png');

// const {height, width} = Dimensions.get('window');
// const exp = 'https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png';
// const music = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqNkbdmjxtSehC6hp0wkFRBPwW6GCqUbvv2Ngrhstg&s';

// const PlayVideoListItem = ({data}) => {
//   const navigation = useNavigation();
//   const [follow, setFollow] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   // const [isPlaying, setIsPlaying] = useState(data[0]?.id); // Start with the first video
//   const [isPlaying, setIsPlaying] = useState(0); // Start with the first video
//   const [autoScroll, setAutoScroll] = useState(false);
//   const [tenSecondAutoScroll, setTenSecondAutoScroll] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [showMuteIcon, setShowMuteIcon] = useState(false);
//   const [videoDuration, setVideoDuration] = useState(5000);

//   const autoScrollTimeoutRef = useRef(null);

//   // Handle auto-scroll logic
//   useEffect(() => {
//     if (autoScroll || tenSecondAutoScroll) {
//       const scrollTime = tenSecondAutoScroll ? 10000 : videoDuration;
//       if (scrollTime > 0) {
//         autoScrollTimeoutRef.current = setTimeout(() => {
//           if (currentIndex < data.length - 1) {
//             setCurrentIndex(prevIndex => prevIndex + 1);
//             setIsPlaying(data[currentIndex + 1]?.id);
//           }
//         }, scrollTime);
//       }
//     }

//     return () => clearTimeout(autoScrollTimeoutRef.current);
//   }, [currentIndex, videoDuration, autoScroll, tenSecondAutoScroll]);

//   const handleLike = index => {
//     const updatedData = [...data];
//     updatedData[index].like = !updatedData[index].like;
//     setData(updatedData);
//   };

//   const handleMute = () => {
//     setMuted(!muted);
//     setShowMuteIcon(true);
//     setTimeout(() => setShowMuteIcon(false), 1000);
//   };

//   const handleLoad = meta => {
//     setVideoDuration(meta.duration * 1000);
//   };

//   return (
//     <View style={{flex: 1, borderTopRightRadius: 20}}>
//       <StatusBar hidden={false} backgroundColor="#0b1321" barStyle="light-content" />
//       {data.length > 0 && (
//         <View
//           style={{
//             height: height,
//             width: width,
//             justifyContent: 'center',
//             position: 'relative',
//           }}>
//           <TouchableOpacity activeOpacity={1} onPress={handleMute} style={{flex: 1}}>
//             <Video
//               source={{uri: data[currentIndex]?.url}}
//               style={{width: '100%', height: '100%'}}
//               muted={muted}
//               paused={isPlaying !== data[currentIndex]?.id}
//               resizeMode="cover"
//               repeat
//               onLoad={handleLoad}
//               bufferConfig={{
//                 minBufferMs: 7000,
//                 maxBufferMs: 15000,
//                 bufferForPlaybackMs: 2500,
//                 bufferForPlaybackAfterRebufferMs: 5000,
//               }}
//               onLoadStart={() => console.log('Loading video...')}
//               onBuffer={() => console.log('Buffering video...')}
//               onError={e => console.error('Video error: ', e)}
//               automaticallyWaitsToMinimizeStalling
//               progressUpdateInterval={1000}
//             />
//             {showMuteIcon && (
//               <View style={styles.muteIconContainer}>
//                 <Icon name={muted ? 'volume-off' : 'volume-up'} size={50} color="#fff" />
//               </View>
//             )}
//           </TouchableOpacity>

//           {/* UI Components remain the same */}
//           {/* You can add the rest of your component code here without changes */}
//           {/* ... */}

//           {/* Navigation Buttons */}
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: '#131517',
//             }}>
//             <TouchableOpacity style={styles.reelbtn}>
//               <GradientButton title="           Back to Home           " link="HomeScreen" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.reelbtn}
//               onPress={() => {
//                 navigation.navigate('HomeScreen');
//               }}>
//               <GradientButton title="        Explore Category      " link="VideoCategoryPage" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default PlayVideoListItem;
