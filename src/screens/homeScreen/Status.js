import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const img =
  'https://photosnow.org/wp-content/uploads/2024/04/cute-girl-pic-cartoon_17.jpg';

  
  const Status = ({route}) => {
    const {name, image} = route.params;
    const navigation = useNavigation();
    const [progress, setProgress] = useState(new Animated.Value(0));
    const windowwidth = Dimensions.get('window').width;
    const windowhight = Dimensions.get('window').height;

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    return () => clearTimeout(timer);
  }, []);

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 3,
          width: '95%',
          borderWidth: 1,
          backgroundColor: 'gray',
          position: 'absolute',
          top: 10,
        }}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}></Animated.View>
      </View>

      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 12,
          left: 0,
          width: '90%',
        }}>
        <View
          style={{
            borderRadius: 100,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: img}}
            style={{
              backgroundColor: 'orange',
              borderRadius: 100,
              resizeMode: 'cover',
              width: '92%',
              height: '92%',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Text style={{color: 'white', paddingLeft: 10}}>
            Sonam kapoor ji {name}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="close"
              style={{fontSize: 20, color: 'white', opacity: 0.6}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={{uri: img}}
        style={{position: 'absolute', width: '100%', height: 700}}
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
        <TextInput
          placeholder="send me message"
          placeholderTextColor="white"
          style={{
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 25,
            width: '85%',
            height: 50,
            paddingLeft: 20,
            fontSize: 20,
            color: 'white',
          }}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="cross" style={{color: 'white', fontSize: 30}} />
        </TouchableOpacity>
      </View>
      {/* <Stories navigation={navigation}/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Status;
