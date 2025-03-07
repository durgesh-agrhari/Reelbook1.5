import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const img =
  'https://emojiisland.com/cdn/shop/products/Sad_Face_Emoji_large.png?v=1571606037';

const EarningOption = () => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 30}}>
        <TouchableOpacity
          // onPress={() => pickImage()}
          style={{alignSelf: 'center'}}>
          <Image
            source={{uri: img}}
            style={{
              width: 150,
              height: 150,
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 25,
            color: 'gray',
            textAlign: 'center',
            margin: 10,
            fontWeight: 'bold',
          }}>
          Earming Destboard
        </Text>
      </View>
      <Text style={{color: 'green', fontSize: 30}}>EarningOption</Text>
      {/* <NetflixIcon width={22} height={22} color={'red'} /> */}
    </View>
  );
};

export default EarningOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
