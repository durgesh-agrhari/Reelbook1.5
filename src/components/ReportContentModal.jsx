import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';

const ReportContentModal = ({onClick, onClose, visible}) => {
  const navigation = useNavigation();
  return (
    <Modal
      onRequestClose={() => {
        onClose();
      }}
      transparent={true}
      visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.row}>
            <View>
              <Text style={styles.left}>Options</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.right1} onPress={() => onClose()}>
                <Entypo name="cross" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.left}>Download Post</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.right} onPress={() => onClick()}>
                <MaterialIcons name="save-alt" size={30} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View>
              <TouchableOpacity style={styles.right} onPress={() => onClick(1)}>
                <Text style={styles.left1}>Report Post</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.right} onPress={() => onClick(1)}>
                <MaterialIcons name="dangerous" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportContentModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  left1: {
    color: 'red',
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
