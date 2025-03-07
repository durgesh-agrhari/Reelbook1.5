import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const UpdatePostModal = () => {
  const navigation = useNavigation();
  return (
    <Modal transparent visible={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '90%',
            backgroundColor: 'white',
            bottom: 0,
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.left1}>Edit Post</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.right1}
                onPress={() => navigation.goBack()}>
                <Entypo name="cross" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* gi */}
          <View>
            <Text
              style={{
                color: 'green',
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Update Post Photo
            </Text>
            <View style={{alignItems: 'center'}}>
              <View style={styles.imgbox}>
                <Image
                  source={{
                    uri: 'https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png',
                  }}
                  resizeMode="contain"
                  style={styles.img}
                />
              </View>
            </View>

            <View style={styles.captionbox}>
              <TextInput
                placeholder="Enter your Caption"
                placeholderTextColor="green"
                numberOfLines={5}
                multiline={true}
              />
            </View>
            <TouchableOpacity style={styles.btncanPublic}>
              <Text>Publick</Text>
            </TouchableOpacity>
          </View>
          {/* gi */}
        </View>
      </View>
    </Modal>
  );
};

export default UpdatePostModal;

const styles = StyleSheet.create({
  left1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  right1: {
    marginTop: 20,
    marginRight: 20,
    backgroundColor: 'gray',
    borderRadius: 50,
    padding: 1,
  },
  left: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  right: {
    marginTop: 20,
    marginRight: 20,
    borderRadius: 50,
    padding: 1,
  },

  img: {
    width: '100%',
    height: '95%',
    alignSelf: 'center',
    padding: 10,
    margin: 5,
  },
  btncanPublic: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10,
  },
  imgbox: {
    backgroundColor: 'gray',
    borderRadius: 1,
    margin: 10,
    height: '70%',
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionbox: {
    backgroundColor: '#d2d9d4',
    margin: 15,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    marginTop: -120,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hederText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    marginRight: 30,
  },
  removebtn: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 32,
  },
});
