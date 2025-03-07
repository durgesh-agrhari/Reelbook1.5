import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker'; // For picking an image
import backendURL, {ADD_STORY, UPLOAD_POST} from '../../../utils/Strings';
// import Loader from '../../../components/Loader';
// import {useInstaContext} from '../../../context/InstaContext';
import axios from 'axios';
import {useInstaContext} from '../../../context/InstaContext';
import Loader from '../../../components/Loader';

const StoryPost = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const [image, setImage] = useState(null);

  const [fdata, setFdata] = useState({
    statustext: '',
  });

  const [userData, setUserData] = useState({});
  const {userToken} = useInstaContext();
  async function getData() {
    axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
      setUserData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  // Function to handle gallery image picking
  const OpenCameraLib = async () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        if (!response.didCancel && !response.error && response.assets) {
          setImage(response.assets[0]); // Save selected image
        }
      },
    );
  };

  // Function to handle image picking
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (!response.didCancel && !response.error && response.assets) {
          setImage(response.assets[0]); // Save selected image
        }
      },
    );
  };

  // Function to upload the image file only
  const uploadData = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }
    setLoader(true);
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: image.fileName,
      type: image.type || 'application/octet-stream',
    });

    try {
      const response = await fetch(backendURL + UPLOAD_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // fetch will handle it automatically
        },
        body: formData, // Attach form data
      });

      // Check if response is OK (status 200)
      if (!response.ok) {
        const responseText = await response.text(); // Get raw response as text
        console.error('Error response text:', responseText); // Log the raw response
        alert('Upload failed: ' + responseText); // Display the error in an alert
        return;
      }

      const responseData = await response.json();
      // console.log('Upload response:', responseData);
      setLoader(false);
      // alert('Upload successful!');

      const addPostObj = {
        userId: userData._id,
        statustext: fdata.statustext,
        username: userData.username,
        imageurl: responseData.fileUrl,
        type: "image"
      };

      // const response1 = await fetch(backendURL + ADD_STORY, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'appplication/json',
      //     // fetch will handle it automatically
      //   },
      //   body: JSON.stringify(addPostObj), // Attach form data
      // });

      const response1 = await axios.post(backendURL + ADD_STORY, addPostObj);

      navigation.navigate('BottomTab');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={30}
              color="white"
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
          <Text style={styles.hederText}>Add New Story</Text>
        </View>
        <Divider
          width={5}
          orientation="vertical"
          style={{color: 'white', marginBottom: 0}}
        />

        <Text
          style={{
            color: 'green',
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 30,
          }}>
          Post Photo Story
        </Text>

        <View style={{padding: 20}}>
          {image && (
            <View
              style={{
                width: '70%',
                height: 350,
                alignItems: 'center',
                alignSelf: 'center',
                margin: 10,
                borderRadius: 10,
              }}>
              <Image
                source={{uri: image.uri}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                }}
              />
            </View>
          )}

          {/* <Button title="Upload Image" onPress={uploadData} /> */}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.btncan} onPress={OpenCameraLib}>
            <Feather name="camera" size={25} color="black" />
            <Text style={{color: 'black', marginLeft: 10}}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btncan} onPress={pickImage}>
            <MaterialCommunityIcons
              name="view-gallery-outline"
              size={25}
              color="black"
            />
            <Text style={{color: 'black', marginLeft: 10}}>Open Gallery</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.captionbox}>
          <TextInput
            placeholder="Enter Your Story Caption"
            placeholderTextColor="green"
            numberOfLines={5}
            multiline={true}
            onChangeText={text => setFdata({...fdata, statustext: text})}
          />
        </View>

        <TouchableOpacity style={styles.btncanPublic} onPress={uploadData}>
          <Text>Public</Text>
        </TouchableOpacity>

        <Text style={{fontSize:25, color:'#0fff', textAlign:'center'}}>Or</Text>

        <TouchableOpacity style={styles.btnvideo} >
          <Text style={{textAlign:'center', color:'#000', fontSize:20}}>Add Video Story</Text>
        </TouchableOpacity>
      </ScrollView>
      <Loader visible={loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'black',
  },
  img: {
    width: '100%',
    height: '95%',
    alignSelf: 'center',
    padding: 10,
    margin: 5,
  },
  btncan: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '43%',
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 10,
    // marginTop: -200,
    margin: 10,
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
    height: '60%',
    width: '46%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionbox: {
    backgroundColor: '#d2d9d4',
    margin: 15,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    // marginTop: -50,
  },
  craditbox: {
    flexDirection: 'row',
    backgroundColor: '#d2d9d4',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
    paddingLeft: 10,
    alignContent: 'center',
    // justifyContent:'center'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
  hederText: {
    color: 'white',
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
  btnvideo:{
    backgroundColor:'gray',
    justifyContent:'center',
    alignContent:'center',
    padding:10,
    margin:20,
    borderRadius:10
  }
});

export default StoryPost;

// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import React, {useState} from 'react';
// import {Divider} from 'react-native-elements';
// // import ReelPost from './ReelPost';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const StoryPost = ({navigation}) => {
//   const [imgUrl, setImgUrl] = useState(
//     'https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png',
//   );

//   const OpenCameraLib = async () => {
//     const result = await launchCamera({saveToPhotos: true});
//     setImgUrl(result?.assets[0]?.uri);

//   };

//   const OpenGalleryLib = async () => {
//     const result = await launchImageLibrary();
//     setImgUrl(result?.assets[0]?.uri);
//   };

//   const [fdata, setFdata] = useState({
//     caption: '',
//   });

//   const PhotoPost = () => {
//     alert('Story Uploaded sucessfully');
//     navigation.navigate('BottomTab');
//   };

//   return (
//     <View style={styles.container}>
//       <Header navigation={navigation} />
//       <Divider
//         width={5}
//         orientation="vertical"
//         style={{color: 'white', marginBottom: 30}}
//       />

//       <View>
//         <View style={styles.imgbox}>
//           <Image
//             source={{
//               uri: imgUrl,
//             }}
//             resizeMode="contain"
//             style={styles.img}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             width: '100%',
//             justifyContent: 'center',
//             alignContent: 'center',
//           }}>
//           <TouchableOpacity style={styles.btncan} onPress={OpenCameraLib}>
//             <Text>
//               Open Camera{' '}
//               <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>
//                 X
//               </Text>{' '}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.btncan} onPress={OpenGalleryLib}>
//             <Text>Open Gallery</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.btncanPublic}
//           onPress={() => PhotoPost()}>
//           <Text>Publick</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const Header = ({navigation}) => (
//   <View style={styles.headerContainer}>
//     <TouchableOpacity onPress={() => navigation.goBack()}>
//       <Ionicons
//         name="chevron-back"
//         size={30}
//         color="black"
//         style={{marginLeft: 10}}
//       />
//     </TouchableOpacity>
//     <Text style={styles.hederText}>Add Story</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     margin: 15,
//   },
//   hederText: {
//     color: 'black',
//     fontWeight: '700',
//     fontSize: 18,
//     marginRight: 30,
//   },
//   img: {
//     width: '100%',
//     height: '95%',
//     alignSelf: 'center',
//     padding: 10,
//     borderRadius: 10,
//   },
//   imgbox: {
//     backgroundColor: 'gray',
//     borderRadius: 1,
//     margin: 10,
//     height: '60%',
//     width: '68%',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   btncan: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '42.2%',
//     height: 50,
//     backgroundColor: 'gray',
//     borderRadius: 10,
//     margin: 10,
//   },
//   btncanPublic: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '90%',
//     height: 50,
//     backgroundColor: 'green',
//     borderRadius: 10,
//     margin: 10,
//   },
// });

// export default StoryPost;
