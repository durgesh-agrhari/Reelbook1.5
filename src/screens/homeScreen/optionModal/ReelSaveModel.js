import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ReelSaveModel = ({visible}) => {
  const navigation = useNavigation();
  return (
    <Modal transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: 200,
            backgroundColor: 'white',
            bottom: 10,
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.left1}>Reel Options</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.right1}
                onPress={() => navigation.goBack()}>
                <Entypo name="cross" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.left}>Save Post</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.right}>
                <Ionicons name="save-outline" size={30} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.left}>Delete Post</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.right}>
                <AntDesign name="delete" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default ReelSaveModel;

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
});
