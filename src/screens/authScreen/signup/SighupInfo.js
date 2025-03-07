import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';

const img =
  'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg';

const SighupInfo = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.editBox}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#25BEE7',
            borderRadius: 20,
            margin: 10,
          }}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Fill Your Profile Data
          </Text>
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
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
          <Text
            style={{
              color: '#3493D9',
              fontSize: 18,
              marginTop: 10,
              marginBottom: 60,
            }}>
            Change Profile photo
          </Text>
        </View>

        <View style={{padding: 10}}>
          <View>
            <Text style={{}}>
              Full name <Text style={{color: 'red'}}>*</Text>{' '}
            </Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="gray"
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
                marginBottom: 16,
              }}
            />
          </View>

          <View style={{paddingVertical: 10}}>
            <Text style={{}}>
              Username <Text style={{color: 'red'}}>*</Text>{' '}
            </Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="gray"
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
                marginBottom: 16,
              }}
            />
          </View>

          <View style={{paddingVertical: 10}}>
            <Text style={{}}>
              Password <Text style={{color: 'red'}}>*</Text>{' '}
            </Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="gray"
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
                marginBottom: 16,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 30,
          }}>
          <View style={styles.ViewButton}>
            <TouchableOpacity onPress={() => navigation.push('BottomTab')}>
              <View style={styles.buttonbox}>
                <Text style={{alignItems: 'center', color: 'white'}}>
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  editBox: {
    marginTop: 35,
    width: '100%',
    height: '100%',
  },
  ViewButton: {
    // flex: 1,
    justifyContent: 'flex-end',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonbox: {
    width: 280,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});
export default SighupInfo;
