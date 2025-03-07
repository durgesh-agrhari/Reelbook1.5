import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker'; // For picking an image
import backendURL, {ADD_POST, UPLOAD_POST} from '../../../utils/Strings';
import Loader from '../../../components/Loader';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/PostSlice';

const CameraRool = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);
  const [fdata, setFdata] = useState({
    caption: '',
  });


  const {userData} = useSelector(s=>s.auth);
  const dispatch = useDispatch();

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
    console.log("public btn")
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }
    console.log("image photo => ",image)
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
      
      console.log("response photo =>  ", response)
      // Check if response is OK (status 200)
      if (!response.ok) {
        const responseText = await response.text(); // Get raw response as text
        console.error('Error response text:', responseText); // Log the raw response
        alert('Upload failed: ' + responseText); // Display the error in an alert
        return;
      }

      const responseData = await response.json();
      console.log('Upload response:', responseData);
      setLoader(false);
      // alert('Upload successful!');
      console.log("response data", responseData)

      const addPostObj = {
        userId: userData._id,
        caption: fdata.caption,
        username: userData.username,
        imageurl: responseData.fileUrl,
      };

      // console.log(addPostObj);

      // const response1 = await fetch(backendURL + ADD_POST, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'appplication/json',
      //     // fetch will handle it automatically
      //   },
      //   body: JSON.stringify(addPostObj), // Attach form data
      // });

      const response1 = await axios.post(backendURL + ADD_POST, addPostObj);
      dispatch(fetchPosts())
      // console.log(response1.data);
      // console.log(response1.json());

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
          <Text style={styles.hederText}>New Post</Text>
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
            marginTop: 10,
          }}>
          Post Photo
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
            placeholder="Enter your Caption"
            placeholderTextColor="green"
            numberOfLines={5}
            multiline={true}
            onChangeText={text => setFdata({...fdata, caption: text})}
          />
        </View>

        <TouchableOpacity style={styles.btncanPublic} onPress={uploadData}>
          <Text>Public</Text>
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
});

export default CameraRool;

// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import {Divider} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import React, {useState} from 'react';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {useNavigation} from '@react-navigation/native';

// const CameraRool = () => {
//   const navigation = useNavigation();
//   const [imgUrl, setImgUrl] = useState(
//     'https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png',
//   );

//   const OpenCameraLib = async () => {
//     console.log('Wait====>>>>>');
//     const result = await launchCamera({saveToPhotos: true});
//     setImgUrl(result?.assets[0]?.uri);
//     console.log('Result====>>>>>');
//   };

//   const OpenGalleryLib = async () => {
//     console.log('Wait====>>>>>');
//     const result = await launchImageLibrary();
//     setImgUrl(result?.assets[0]?.uri);
//     console.log('url photo = ', result);
//     // console.log(result);
//     console.log('Result====>>>>>');
//   };

//   const [fdata, setFdata] = useState({
//     caption: '',
//   });

//   const PhotoPost = () => {
//     console.log(fdata);
//     alert('Post Uploaded sucessfully');
//     navigation.navigate('NewPostScreen');
//   };

//   // const uploadImageToAws = () => {
//   //   const reference = storage().ref(imageData.assets[0].filename)
//   //   const pathToFile = imageData.assets[0].uri
//   // }
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons
//             name="chevron-back"
//             size={30}
//             color="black"
//             style={{marginLeft: 10}}
//           />
//         </TouchableOpacity>
//         <Text style={styles.hederText}>New Post</Text>
//       </View>
//       <Divider
//         width={5}
//         orientation="vertical"
//         style={{color: 'white', marginBottom: 30}}
//       />

//       <View>
//         <Text
//           style={{
//             color: 'green',
//             alignSelf: 'center',
//             fontSize: 20,
//             fontWeight: 'bold',
//           }}>
//           Post Photo
//         </Text>
//         <View style={{alignItems: 'center'}}>
//           <View style={styles.imgbox}>
//             <Image
//               source={{
//                 uri: imgUrl,
//               }}
//               resizeMode="contain"
//               style={styles.img}
//             />

//             <TouchableOpacity
//               style={styles.removebtn}
//               onPress={() =>
//                 setImgUrl(
//                   'https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png',
//                 )
//               }>
//               <Entypo name="cross" size={30} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//           <TouchableOpacity style={styles.btncan} onPress={OpenCameraLib}>
//             <Text>Open Camera</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.btncan} onPress={OpenGalleryLib}>
//             <Text>Open Gallery</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.captionbox}>
//           <TextInput
//             placeholder="Enter your Caption"
//             placeholderTextColor="green"
//             numberOfLines={5}
//             multiline={true}
//             onChangeText={text => setFdata({...fdata, caption: text})}
//           />
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignContent: 'center',
//   },
//   img: {
//     width: '100%',
//     height: '95%',
//     alignSelf: 'center',
//     padding: 10,
//     margin: 5,
//   },
//   btncan: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '43%',
//     height: 50,
//     backgroundColor: 'gray',
//     borderRadius: 10,
//     marginTop: -200,
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
//   imgbox: {
//     backgroundColor: 'gray',
//     borderRadius: 1,
//     margin: 10,
//     height: '60%',
//     width: '46%',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   captionbox: {
//     backgroundColor: '#d2d9d4',
//     margin: 15,
//     borderRadius: 10,
//     borderColor: 'black',
//     borderWidth: 2,
//     padding: 10,
//     marginTop: -50,
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
//   removebtn: {
//     width: 30,
//     height: 30,
//     backgroundColor: 'white',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: 20,
//     right: 32,
//   },
// });

// export default CameraRool;
