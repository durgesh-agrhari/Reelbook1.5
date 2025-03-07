import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {videoData} from '../../assets/Video';
import SingleReel from './SingleReel';

const Reelcomponenet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChnageIndexValue = index => {
    setCurrentIndex(index);
  };
  return (
    <SwiperFlatList
      data={videoData}
      vertical={true}
      onChangeIndex={handleChnageIndexValue}
      renderItem={({item, index}) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default Reelcomponenet;

const styles = StyleSheet.create({});
