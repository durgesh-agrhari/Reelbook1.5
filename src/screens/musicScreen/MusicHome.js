import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {songs} from '../../data/MusicData';
import MusicListItem from './MusicListItem';

export default function MusicHome() {
  return (
    <View>
      <View style={{backgroundColor: 'pink', padding: 10, marginBottom: 10}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          Sort Music House
        </Text>
      </View>
      <FlatList
        data={songs}
        renderItem={({item, index}) => {
          return <MusicListItem item={item} index={index} data={songs} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
