import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const MusicListItem = ({item, index, data}) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate.navigate('Music', {
          data: item,
          index: index,
        });
      }}>
      <View style={{flexDirection: 'row', margin: 10}}>
        <View>
          <Image
            source={{uri: item.image}}
            style={{width: 80, height: 80, borderRadius: 10}}
          />
        </View>
        <View style={{justifyContent: 'center', margin: 5}}>
          <Text style={{fontSize: 18, fontWeight: 'bold '}}>{item.singer}</Text>
          <Text style={{fontSize: 12}}>{item.title}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            marginLeft: 20,
          }}>
          <AntDesign name="playcircleo" size={28} />
        </View>
        <View
          style={{alignItems: 'center', justifyContent: 'center', margin: 5}}>
          <Entypo name="dots-three-vertical" size={26} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MusicListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    borderRadius: 10,
    height: 100,
    marginBottom: 5,
    marginHorizontal: 10,
    // alignItems: 'center',
  },
});
