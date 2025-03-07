// import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
// import React, {useEffect, useState, useRef, useCallback} from 'react';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import PlayVideoListItem from './PlayVideoListItem';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import backendURL, {GETVIDEO_POST} from '../../utils/Strings';

// const PlayVideoList = () => {
//   const params = useRoute().params;
//   const [videoList, setVideoList] = useState([]);
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false); // Controls pull-to-refresh

//   useEffect(() => {
//     setVideoList([params.selectedVideo]);
//     getVideoData();
//   }, []);

//   const getVideoData = () => {
//     setLoading(true);
//     fetch(backendURL + GETVIDEO_POST)
//       .then(res => res.json())
//       .then(json => {
//         const data = json.files.slice(0, 2); // Limits to 6 videos
//         // spred opereter
//         // setVideoList(limitedVideos);
//         setVideoList(videoList => [...videoList, ...data]);
//       })
//       .catch(err => {
//         console.error('Error fetching videos:', err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <View>
//       <View
//         style={{
//           position: 'absolute',
//           zIndex: 10,
//           padding: 10,
//         }}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.goBack();
//           }}>
//           <Ionicons name="arrow-back" size={30} color="gray" />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         // style={{zIndex: -1}}
//         data={videoList}
//         pagingEnabled
//         renderItem={({item, index}) => (
//           <PlayVideoListItem video={item} key={index} />
//         )}
//       />
//     </View>
//   );
// };

// export default PlayVideoList;

// const styles = StyleSheet.create({});
