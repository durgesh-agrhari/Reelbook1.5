import {
  StyleSheet,
  Text,
  Touchable,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ActivityIndicator, Modal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Loader = ({visible}) => {
  const navigation = useNavigation();
  return (
    <Modal transparent visible={visible}>
      <View style={styles.mainView}>
        <View style={styles.loaderView}>
          <ActivityIndicator />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                marginTop: 10,
                paddingLeft: 25,
                paddingRight: 25,
                padding: 5,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderView: {
    width: 180,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
