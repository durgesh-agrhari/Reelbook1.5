import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import backendURL, { GETVIDEO_POST } from '../../utils/Strings';
import VideoHomeItem from './VideoHomeItem';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)



const VideoHome = () => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false); // Controls pull-to-refresh
  const [loadCount, setLoadCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // getVideoData();
      setLoadCount(0);
    }
  }, [isFocused]);

  useEffect(() => {
    getVideoData();
  }, [loadCount]);

  const getVideoData = () => {
    setLoading(true);
    fetch(backendURL + GETVIDEO_POST)
      .then(res => res.json())
      .then(json => {
        // const data = json.files.slice(loadCount, loadCount + 4); // Limits to 6 videos
        const data = json.files.slice(loadCount, 4); // Limits to 6 videos
        // spred opereter
        // setVideoList(limitedVideos); /// comment this line for increase to + 4 
        setVideoList(videoList => [...videoList, ...data]);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && videoList.length === 0 ? ( // Show spinner when first loading
        // <ActivityIndicator size={40} color="#0000ff" style={styles.spinner} />
        <View>

         

          <View style={{
            flexDirection: 'row', marginTop: 20, gap: 8, justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dee0e3',
              borderRadius:15,
              padding:8,
              paddingTop:14,
            }}>

              <ShimmerPlaceHolder style={{ width: 180, height: 300, borderRadius: 20, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
              </ShimmerPlaceHolder>

              <View style={{
                flexDirection: 'row', marginBottom: 8, justifyContent: 'center',
                alignItems: 'center', marginTop:8
              }}>
                <ShimmerPlaceHolder style={{ width: 40, height: 40, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                </ShimmerPlaceHolder>
                <View>
                  <ShimmerPlaceHolder style={{ width: 120, height: 10, borderRadius: 50, marginLeft: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                  </ShimmerPlaceHolder>
                  <ShimmerPlaceHolder style={{ width: 100, height: 10, borderRadius: 50, marginLeft: 10, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                  </ShimmerPlaceHolder>
                </View>
              </View>
            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dee0e3',
              borderRadius:15,
              padding:8,
              paddingTop:14,
            }}>

              <ShimmerPlaceHolder style={{ width: 180, height: 300, borderRadius: 20, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
              </ShimmerPlaceHolder>
              <View style={{
                flexDirection: 'row', marginBottom: 8, justifyContent: 'center',
                alignItems: 'center', marginTop:8
              }}>
                <ShimmerPlaceHolder style={{ width: 40, height: 40, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                </ShimmerPlaceHolder>
                <View>
                  <ShimmerPlaceHolder style={{ width: 120, height: 10, borderRadius: 50, marginLeft: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                  </ShimmerPlaceHolder>
                  <ShimmerPlaceHolder style={{ width: 100, height: 10, borderRadius: 50, marginLeft: 10, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                  </ShimmerPlaceHolder>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={videoList}
          numColumns={2}
          onRefresh={getVideoData} // Pull-to-refresh function
          refreshing={loading} // Show spinner while refreshing
          onEndReached={() => setLoadCount(loadCount + 4)}
          //trishold
          // onEndReachedThreshold={0.2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <VideoHomeItem data={item} />}
          ListEmptyComponent={!loading && <Text style={{alignSelf:'center', margin:10}}>No videos found</Text>} // Show message when no data is available
        />
      )}
    </View>
  );
};

export default VideoHome;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// import {FlatList, StyleSheet, View, Text} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import backendURL, {GETVIDEO_POST} from '../../utils/Strings';
// import VideoHomeItem from './VideoHomeItem';

// const VideoHome = () => {
//   const [videoList, setVideoList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (isFocused) {
//       getVideoData();
//     }
//   }, [isFocused]);

//   const getVideoData = () => {
//     setLoading(true);
//     fetch(backendURL + GETVIDEO_POST)
//       .then(res => res.json())
//       .then(json => {
//         const limitedVideos = json.files.slice(0, 6); // Limits to 6 videos
//         setVideoList(limitedVideos);
//       })
//       .catch(err => {
//         console.error('Error fetching videos:', err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <View style={{flex: 1}}>
//       <FlatList
//         data={videoList}
//         numColumns={2}
//         style={{display: 'flex'}}
//         onRefresh={getVideoData} // Pull-to-refresh function
//         refreshing={loading} // Show loading spinner when refreshing
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item}) => <VideoHomeItem data={item} />}
//       />
//     </View>
//   );
// };

// export default VideoHome;

// const styles = StyleSheet.create({});

// import {FlatList, StyleSheet, View, Text} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import backendURL, {GETVIDEO_POST} from '../../utils/Strings';
// import VideoHomeItem from './VideoHomeItem';

// const VideoHome = () => {
//   const [videoList, setVideoList] = useState();
//   const [loading, setLoading] = useState(false);
//   const isFocused = useIsFocused();
//   useEffect(() => {
//     getVideoData();
//   }, [isFocused]);

//   const getVideoData = () => {
//     setLoading(true);
//     fetch(backendURL + GETVIDEO_POST)
//       .then(res => res.json())
//       .then(json => {
//         const limitedVideos = json.files.slice(0, 6); // Limits to 10 videos
//         setVideoList(limitedVideos);
//         if (limitedVideos) {
//           setLoading(false);
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching videos:', err);
//       });
//   };

//   return (
//     <View>
//       <FlatList
//         data={videoList}
//         numColumns={2}
//         style={{display: 'flex'}}
//         onRefresh={getVideoData}
//         refreshing={loading}
//         renderItem={({item, index}) => (
//           <VideoHomeItem data={item} key={index} />
//         )}
//       />
//     </View>
//   );
// };

// export default VideoHome;

// const styles = StyleSheet.create({});
