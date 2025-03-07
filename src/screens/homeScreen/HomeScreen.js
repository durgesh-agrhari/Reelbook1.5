import {
  StyleSheet,
  Text,
  View,
  FlatList,
  BackHandler,
  Alert,
  Image,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import Stories from './Stories';
import Post from './Post';
import { posts } from '../../data/posts';
import Feeds from './Feeds';
import VideoHome from './VideoHome';
import GetVideoChunks from '../newpostScreen/getVideoChunk/GetVideoChunks';
import StoryCircle from './storyShow/StoryCircle';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import HomeBannerAds from '../adsManager/HomeBannerAds';
import HomeInterstialAds from '../adsManager/HomeInterstialAds';
import HomeRewardedAds from '../adsManager/HomeRewardedAds';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


const HomeScreen = ({ navigation }) => {
  const THEME = useSelector(state => state.theme)
  // console.log(THEME)
  const [refreshing, setRefreshing] = useState(false);
  // const state = useSelector(s=>s.auth)
  // console.log(state)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulating data reload; replace with actual data fetching logic.
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black', flex: 1 }}>
      <Header navigation={navigation} />

      <View>
        <FlatList
          data={[1, 1, 1]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['green']} // Green indicator
            />
          }
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: '100%' }}>
                {index == 0 && (
                  <View>
                    <Stories />
                    {/* <StoryCircle /> */}
                    <HomeBannerAds/>
                  </View>
                )}
                {index == 1 && (
                  <View>
                    {/* <FlipImage /> */}
                    {/* <GradientButton title="New to you" /> */}
                    {/* <Text style={{alignSelf:'center'}}>Loading Content ...</Text> */}
                    <VideoHome />
                    
                    {/* <GetVideoChunks /> */}
                    <Feeds />
                    {/* {posts.map((post, index) => (
                      <Post post={post} key={index} />
                    ))} */}

                    {/* <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                   
                      <Image
                        source={require('../../assets/likeGif/loading.gif')} // Update with your local GIF path
                        style={{width: 320, height: 320}}
                      />
                    </View> */}
                  </View>
                )}
                {index == 2 && (
                  <View>
                    {/* <HomeReelView /> */}
                    <View style={{ marginBottom: 160, marginTop: 40 }}>

                    <View style={{flexDirection:'row'}}>
                    <HomeInterstialAds/>
                    <HomeRewardedAds/>
                    </View>

                      {/* story */}
                      {/* <View style={{
                        flexDirection: 'row', marginTop: 10, gap: 22, justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                        </View>
                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                        </View>
                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                        </View>
                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                        </View>

                      </View> */}


                      {/* post */}
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 0,
                          backgroundColor: '#dee0e3',
                          marginHorizontal: 12,
                          borderRadius: 10,
                          paddingTop: 25,
                          paddingBottom: 25,
                          marginBottom: 10
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <ShimmerPlaceHolder style={{ width: 80, height: 80, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <View>
                            <ShimmerPlaceHolder style={{ width: 240, height: 20, borderRadius: 50, marginLeft: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder style={{ width: 210, height: 20, borderRadius: 50, marginLeft: 10, marginTop: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                            </ShimmerPlaceHolder>
                          </View>
                        </View>
                        <ShimmerPlaceHolder style={{ width: '85%', height: 250, borderRadius: 20, marginTop: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                        </ShimmerPlaceHolder>

                        <View style={{ flexDirection: 'row', marginTop: 10, gap: 22 }}>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                        </View>
                      </View>

                      {/* post */}
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 30,
                          backgroundColor: '#dee0e3',
                          marginHorizontal: 12,
                          borderRadius: 10,
                          paddingTop: 25,
                          paddingBottom: 25,
                          marginBottom: 40
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <ShimmerPlaceHolder style={{ width: 80, height: 80, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <View>
                            <ShimmerPlaceHolder style={{ width: 240, height: 20, borderRadius: 50, marginLeft: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder style={{ width: 210, height: 20, borderRadius: 50, marginLeft: 10, marginTop: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                            </ShimmerPlaceHolder>
                          </View>
                        </View>
                        <ShimmerPlaceHolder style={{ width: '85%', height: 250, borderRadius: 20, marginTop: 10 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                        </ShimmerPlaceHolder>

                        <View style={{ flexDirection: 'row', marginTop: 10, gap: 22 }}>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                          <ShimmerPlaceHolder style={{ width: 45, height: 45, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
                          </ShimmerPlaceHolder>
                        </View>
                      </View>

                      <Text
                        style={{
                          color: 'black',
                          fontSize: 25,
                          textAlign: 'center',
                        }}>
                        Loading ...{' '}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
