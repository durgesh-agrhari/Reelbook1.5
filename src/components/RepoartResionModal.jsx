import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';

const RepoartResionModal = ({onClick, onClose, visible, data}) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const navigation = useNavigation();
  const [caption, setCaption] = useState('');
  //   const [imageUrl, setImageUrl] = useState(
  //     'https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png',
  //   );

  useEffect(() => {
    setCaption(data && data.caption ? data.caption : '');
    // setImageUrl(data && data.imageUrl ? data.imageUrl : '');
  }, [visible]);
  return (
    <Modal
      onRequestClose={() => {
        onClose();
      }}
      transparent={true}
      visible={visible}>
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
            height: '50%',
            backgroundColor: '#3b3b3b',
            // backgroundColor: 'white',
            bottom: 0,
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.left1}>Report</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.right1}
                onPress={() => {
                  onClose();
                }}>
                <Entypo name="cross" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* gi */}
          <View>
            <Text
              style={{
                color: 'red',
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                margin: 20,
              }}>
              Why are you reporting this post?
            </Text>
            <View>
              <TouchableOpacity style={styles.reportbtn}>
                <Text style={styles.reporttxt}>I just don't like it</Text>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setIsChecked1(!isChecked1)}
                  isChecked={isChecked1}
                  rightText={'Check me!'}
                  checkBoxColor="#000" // Customize color
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.reportbtn}>
                <Text style={styles.reporttxt}>False information</Text>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setIsChecked2(!isChecked2)}
                  isChecked={isChecked2}
                  rightText={'Check me!'}
                  checkBoxColor="#000" // Customize color
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.reportbtn}>
                <Text style={styles.reporttxt}>Nudity or sexual activity</Text>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setIsChecked3(!isChecked3)}
                  isChecked={isChecked3}
                  rightText={'Check me!'}
                  checkBoxColor="#000" // Customize color
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.reportbtn}>
                <Text style={styles.reporttxt}>Scam, fraud or spam</Text>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setIsChecked4(!isChecked4)}
                  isChecked={isChecked4}
                  rightText={'Check me!'}
                  checkBoxColor="#000" // Customize color
                />
              </TouchableOpacity>
            </View>
            {/* <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Caption
            </Text> */}
            {/* <View style={styles.captionbox}>
              <TextInput
                value={caption}
                onChangeText={txt => setCaption(txt)}
                placeholder="Enter your Caption"
                placeholderTextColor="green"
                numberOfLines={2}
                multiline={true}
              />
            </View> */}
            <TouchableOpacity
              style={styles.btncanPublic}
              onPress={() => {
                onClick(caption);
              }}>
              <Text style={{color: 'red', fontWeight: 'bold', fontSize: 20}}>
                Report
              </Text>
            </TouchableOpacity>
          </View>
          {/* gi */}
        </View>
      </View>
    </Modal>
  );
};

export default RepoartResionModal;

const styles = StyleSheet.create({
  checkbox: {
    height: 15,
  },

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
    opacity: 0.6,
  },
  btncanPublic: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#0b1321',
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
    marginTop: 20,
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
  reporttxt: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  reportbtn: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    borderRadius: 10,
    borderBlockColor: 'black',
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    marginHorizontal: 15,
    margin: 4,
    justifyContent: 'space-between',
  },
});
