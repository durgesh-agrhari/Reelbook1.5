import { ScrollView, StyleSheet, Text, View, ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight, } from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import { Image } from 'react-native';
import Video from 'react-native-video';
import homevideo from '../../data/homemix/homevideo';
import homeads from '../../data/homemix/homeads';
import homephoto from '../../data/homemix/homephoto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const HomeMix = () => {


    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [muted, setMuted] = useState(true); // New state to handle mute/unmute
  
    // Optimized calculation of the file name
    // const fileName = useMemo(() => {
    //   return data.fileName.length > 10
    //     ? data.fileName.slice(0, 10).toLowerCase() + '...'
    //     : data.fileName.toUpperCase();
    // }, [data.fileName]);
  
  return (
    <View>
      <ScrollView>
        {Array.from({ length: Math.ceil(Math.max(homevideo.length, homeads.length, homephoto.length) / 6) }, (_, i) => {
          const videos = homevideo.slice(i * 6, (i + 1) * 6);
          const ads = homeads[i] ? [homeads[i]] : [];
          const photos = homephoto[i] ? [homephoto[i]] : [];

          return (
            <View key={i}>
              {videos.length > 0 && (
                <View style={styles.videoRow}>
                  {videos.map((video, index) => (
                    <TouchableOpacity key={`video-${i * 6 + index}`} style={styles.videoContainer}>
                      <Text style={styles.text}>Video</Text>
                      <Video source={{ uri: video.vurl }} style={styles.video} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {ads.length > 0 && (
                <TouchableOpacity key={`ads-${i}`} style={styles.adsContainer}>
                  <Text style={styles.text}>Ads</Text>
                  <Image source={{ uri: ads[0].aurl }} style={styles.image} />
                </TouchableOpacity>
              )}
              {photos.length > 0 && (
                <TouchableOpacity key={`photo-${i}`} style={styles.photoContainer}>
                  <Text style={styles.text}>Photo</Text>
                  <Image source={{ uri: photos[0].purl }} style={styles.image} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        {homevideo.length % 6 !== 0 && (
          <View 
          // style={styles.videoRow}
          >
            {homevideo.slice(Math.floor(homevideo.length / 6) * 6).map((video, index) => (
              <TouchableOpacity key={`extra-video-${index}`} 
              // style={styles.videoContainer}
              >
                {/* <Text style={styles.text}>Video</Text>
                <Video source={{ uri: video.vurl }} style={styles.video} /> */}
                 <TouchableHighlight
                    style={styles.container}
                      onPress={() =>
                        navigation.navigate('PlayVideoListItem', {
                          // selectedVideo: data,
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
                            {/* <Text style={{color:'white'}} >{fileName}</Text> */}
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
              </TouchableOpacity>
            ))}
          </View>
        )}
        {homeads.length % 6 !== 0 && (
          homeads.slice(Math.floor(homeads.length / 6)).map((ads, index) => (
            <TouchableOpacity key={`extra-ads-${index}`} style={styles.adsContainer}>
              <Text style={styles.text}>Ads</Text>
              <Image source={{ uri: ads.aurl }} style={styles.image} />
            </TouchableOpacity>
          ))
        )}
        {homephoto.length % 6 !== 0 && (
          homephoto.slice(Math.floor(homephoto.length / 6)).map((photo, index) => (
            <TouchableOpacity key={`extra-photo-${index}`} style={styles.photoContainer}>
              <Text style={styles.text}>Photo</Text>
              <Image source={{ uri: photo.purl }} style={styles.image} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HomeMix;

const styles = StyleSheet.create({
  videoRow: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  videoContainer: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  adsContainer: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  photoContainer: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    padding: 10,
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderColor: '#2838',
    borderWidth: 4,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderColor: '#2838',
    borderWidth: 4,
  },

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

// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { Image } from 'react-native';
// import homevideo from '../../data/homemix/homevideo';
// import Video from 'react-native-video';
// import homeads from '../../data/homemix/homeads';
// import homephoto from '../../data/homemix/homephoto';

// const HomeMix = () => {
//     return (
//         <View>
//             <ScrollView>
//             <View
//                 style={{ flexDirection: 'row', flexWrap: 'wrap', width: 145 }}>
//                 {homevideo.slice(0, 2).map((video, index) => {
//                     return (
//                         <TouchableOpacity key={index} style={{backgroundColor:'gray', padding:15, borderRadius:10}}>
//                              <Text style={{ padding:10, color:'white', fontSize:18, alignSelf:'center'}}>Video</Text>
//                            <Video source={{uri: video.vurl}} style={{width:200, height:400, borderRadius:10, borderColor: '#2838', borderWidth:4 }} />
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//             <View
//                 style={{ flexDirection: 'row', flexWrap: 'wrap', width: 145 }}>
//                 {homeads.slice(0, 1).map((ads, index) => {
//                     return (
//                         <TouchableOpacity key={index} style={{backgroundColor:'green', padding:15, borderRadius:10}}>
//                              <Text style={{ padding:10, color:'white', fontSize:18, alignSelf:'center'}}>Ads</Text>
//                            <Image source={{uri: ads.aurl}} style={{width:200, height:200, borderRadius:10, borderColor: '#2838', borderWidth:4 }} />
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//             <View
//                 style={{ flexDirection: 'row', flexWrap: 'wrap', width: 145 }}>
//                 {homephoto.slice(0, 1).map((Photo, index) => {
//                     return (
//                         <TouchableOpacity key={index} style={{backgroundColor:'blue', padding:15, borderRadius:10}}>
//                             <Text style={{ padding:10, color:'white', fontSize:18, alignSelf:'center'}}>Photo</Text>
//                            <Image source={{uri: Photo.purl}} style={{width:200, height:200, borderRadius:10, borderColor: '#2838', borderWidth:4 }} />
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//             </ScrollView>
//         </View>
//     )
// }

// export default HomeMix

// const styles = StyleSheet.create({})
