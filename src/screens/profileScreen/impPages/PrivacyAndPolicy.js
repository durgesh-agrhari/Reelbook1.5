import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';

const img =
  'https://5.imimg.com/data5/SELLER/Default/2023/6/313935530/WF/JW/MY/20026673/realbook-logo.png';
  import Ionicons from 'react-native-vector-icons/Ionicons'
  import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
const PrivacyAndPolicy = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
        <View style={{flexDirection:'row', padding:10, justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=> {navigation.goBack()}}>
          <Ionicons size={30} name='chevron-back' color='white'  />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {navigation.goBack()}} >
          <Text style={{color:'white', fontSize:20}}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginHorizontal: 10}}>
    <View style={{marginTop: 10}}>
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
          marginTop: 20,
          fontWeight: 'bold',
          margin:10
        }}>
        Privacy And Policy *ReelBook*
      </Text>
    </View>
   

      <View style={{backgroundColor:'#3a3d3a', padding:8, borderRadius:10}}>
      <Text style={{color: 'white', fontSize: 16, marginHorizontal: 10}}>
        Reference site about Lorem Ipsum, giving information on its origins,
        as well as a random Lipsum generator. Reference site about Lorem
        Ipsum, giving information on its origins, as well as a random Lipsum
        generator. Reference site about Lorem Ipsum, giving information on its
        origins, as well as a random Lipsum generator.
      </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'green',
          borderWidth: 2,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Text
          style={{
            color: 'green',
            fontSize: 25,
            marginHorizontal: 0,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Our Privacy
        </Text>
      </View>
      <Text style={{color: 'white', fontSize: 16, marginHorizontal: 10, marginTop:10}}>
        Reference site about Lorem Ipsum, giving information on its origins,
        as well as a random Lipsum generator. Reference site about Lorem
        Ipsum, giving information on its origins, as well as a random Lipsum
        generator. Reference site about Lorem Ipsum, giving information on its
        origins, as well as a random Lipsum generator. Reference site about
        Lorem Ipsum, giving information on its origins, as well as a random
        Lipsum generator. Reference site about Lorem Ipsum.
      </Text>


      <View
        style={{
          borderBottomColor: 'green',
          borderWidth: 2,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Text
          style={{
            color: 'green',
            fontSize: 25,
            marginHorizontal: 0,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Our Policy
        </Text>
      </View>
      <Text style={{color: 'white', fontSize: 16, marginHorizontal: 10, marginTop:10}}>
        Reference site about Lorem Ipsum, giving information on its origins,
        as well as a random Lipsum generator. Reference site about Lorem
        Ipsum, giving information on its origins, as well as a random Lipsum
        generator. Reference site about Lorem Ipsum, giving information on its
        origins, as well as a random Lipsum generator. Reference site about
        Lorem Ipsum, giving information on its origins, as well as a random
        Lipsum generator. Reference site about Lorem Ipsum.
      </Text>
    </ScrollView>
  </SafeAreaView>
  );
};

export default PrivacyAndPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
  },
});
