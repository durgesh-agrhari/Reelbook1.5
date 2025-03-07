import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Video from 'react-native-video';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import backendURL, {
  ADD_POST,
  ADD_REEL,
  UPLOAD_POST,
} from '../../../utils/Strings';
import { useInstaContext } from '../../../context/InstaContext';
import Loader from '../../../components/Loader';
import { createThumbnail } from 'react-native-create-thumbnail';

const MAX_CATEGORIES = 3;

const categories = [
  { id: '1', name: 'Motivation' },
  { id: '2', name: 'Gym' },
  { id: '3', name: 'Sports' },
  { id: '4', name: 'Girls-Video' },
  { id: '5', name: 'Boy-Atitude' },
  { id: '6', name: 'Bhopury-Video' },
  { id: '7', name: 'Shayari' },
  { id: '8', name: 'Love-Music' },
  { id: '9', name: 'Comedy' },
  { id: '10', name: 'Parlour' },
  { id: '11', name: 'Mehadi' },
  { id: '12', name: 'Music' },
  { id: '13', name: 'Sweet Selfy Girls' },
  { id: '14', name: 'Nail Art' },
  { id: '15', name: 'Hair Style' },
  { id: '16', name: 'Art Sketch' },
  { id: '17', name: 'Cat Lover' },
  { id: '18', name: 'Dog Lover' },
  { id: '19', name: 'Cooking' },
  { id: '20', name: 'Car Lover' },
  { id: '21', name: 'Byke Lover' },
  { id: '22', name: 'Salfie Poas Boy' },
  { id: '23', name: 'Singing' },
  { id: '24', name: 'Dancing' },
  { id: '25', name: 'Nature' },
  { id: '26', name: 'God Video' },
  { id: '27', name: 'Bajan' },
  { id: '28', name: 'Temple' },
  { id: '29', name: 'GF Talk Convesation' },
  { id: '30', name: 'Speeking' },
  { id: '31', name: 'Interview' },
  { id: '32', name: 'Trading' },
  { id: '33', name: 'Bussines Idea' },
  { id: '34', name: 'Earn Pocket Mony' },
  { id: '35', name: 'Video or photo Editing' },
  { id: '36', name: 'Skin care' },
  { id: '37', name: 'Animay' },
  { id: '38', name: 'Youtuber' },
  { id: '39', name: 'FlimWord' },
  { id: '40', name: 'Magic' },
  { id: '41', name: 'Ai Modal' },
  { id: '42', name: 'Story' },
  { id: '43', name: 'Reality Show' },
  // Add more categories as needed
];

const VideoUploader = () => {
  const navigation = useNavigation();
  const { userToken } = useInstaContext();
  const [loader, setLoader] = useState(false);

  const [videoUri, setVideoUri] = useState(null);
  const [thumbnailUri, setThumbnailUri] = useState(null);

  // State management
  const [postData, setPostData] = useState({
    caption: '',
    credit: '',
    selectedVideo: null,
    selectedCategories: [],
    searchText: '',
  });

  const [dateTimeState, setDateTimeState] = useState({
    selectedDate: 'Select date',
    selectedTime: 'Select time',
    showDatePicker: false,
    showTimePicker: false,
  });

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [userData, setUserData] = useState({});

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${backendURL}/userdata`, {
          token: userToken,
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data');
      }
    };
    fetchUserData();
  }, [userToken]);

  // Date/Time Picker Handlers
  const showDatePicker = () => {
    setDateTimeState(prev => ({
      ...prev,
      showDatePicker: true,
    }));
  };

  const hideDatePicker = () => {
    setDateTimeState(prev => ({
      ...prev,
      showDatePicker: false,
    }));
  };

  const handleDateConfirm = date => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    setDateTimeState(prev => ({
      ...prev,
      selectedDate: formattedDate,
      showDatePicker: false,
    }));
  };

  const showTimePicker = () => {
    setDateTimeState(prev => ({
      ...prev,
      showTimePicker: true,
    }));
  };

  const hideTimePicker = () => {
    setDateTimeState(prev => ({
      ...prev,
      showTimePicker: false,
    }));
  };

  const handleTimeConfirm = date => {
    const formattedTime = new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setDateTimeState(prev => ({
      ...prev,
      selectedTime: formattedTime,
      showTimePicker: false,
    }));
  };


  const pickVideo = () => {
    const options = {
      mediaType: 'video',
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorCode) {
        console.log('Error picking video: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage);
      } else {
        const selectedVideo = response.assets[0];
        setVideoUri(selectedVideo.uri);
        generateThumbnail(selectedVideo.uri);
      }
    });
  };

  const generateThumbnail = async videoUri => {
    try {
      const thumbnail = await createThumbnail({
        url: videoUri,
        timeStamp: 1000, // Time in milliseconds to capture the thumbnail
      });
      // console.log("------------------------------------------")
      // console.log(thumbnail)
      setThumbnailUri(thumbnail.path);
    } catch (error) {
      console.error('Error generating thumbnail: ', error);
      Alert.alert('Error', 'Failed to generate thumbnail.');
    }
  };


  // Upload handling working
  const handleUpload = async () => {
    // console.log('public btn');
    if (!videoUri) {
      Alert.alert('Error', 'Please select a video first');
      return;
    }
    // console.log('public btn 1');
    setLoader(true);
    if (videoUri.length === 0) {
      setCategoryModalVisible(true);
      return;
    }
    // console.log('public btn 2');
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: videoUri,
        type: 'video/mp4',
        name: 'video.mp4',
      });
      // console.log('public btn 3');
      // Upload video ..
      const uploadResponse = await fetch(backendURL + UPLOAD_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      // console.log('public btn 4');
      if (!uploadResponse.ok) {
        throw new Error('Video upload failed');
      }
      // console.log('public btn 5');
      const responseData = await uploadResponse.json();
      console.log('public btn fileurl => ', responseData);
      // Create post with scheduling data
      // console.log('public btn 7'); 
      // ------------thumbnail--------------
      const formDataThumbnail = new FormData();
      formDataThumbnail.append('file', {
        uri: thumbnailUri,
        type: "image/jpeg",
        name: 'thumb.png',
      });
      // console.log('public btn 3 Thumbnail');
      // Upload video ..
      const uploadResponseThumbnail = await fetch(backendURL + UPLOAD_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formDataThumbnail,
      });
      // console.log('public btn 4 Thumbnail');
      if (!uploadResponseThumbnail.ok) {
        throw new Error('Thumbnail upload failed');
      }
      // console.log('public btn 5 Thumbnail');
      const responseDataThumbnail = await uploadResponseThumbnail.json();
      console.log('public btn fileurl => ', responseDataThumbnail);
      // Create post with scheduling data
      // console.log('public btn 7 Thumbnail'); 
      // -----------------------------------


      // console.log(thumbnailUri)
      const postPayload = {
        userId: userData._id,
        caption: postData.caption,
        username: userData.username,
        videourl: responseData.fileUrl,
        thumbnillurl: responseDataThumbnail.fileUrl,
        category: postData.selectedCategories,
        publicpostDate:
          dateTimeState.selectedDate !== 'Select date'
            ? dateTimeState.selectedDate
            : null,
        publicpostTime:
          dateTimeState.selectedTime !== 'Select time'
            ? dateTimeState.selectedTime
            : null,
      };
      // console.log('public btn 8 ');
      await axios.post(backendURL + ADD_REEL, postPayload);
      setLoader(false);
      navigation.navigate('BottomTab');
      Alert.alert('Success', 'Video uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      setLoader(false);
      Alert.alert('Error', 'Failed to upload video');
    }
  };


    // Function to upload the image file only
    // const handleUpload = async () => {
    // const uploadThumbData = async () => {
    // if (!thumbnailUri) {
    //     alert('Please select an image to upload.');
    //     return;
    //   }
    //   console.log("image photo => ", thumbnailUri)
    //   setLoader(true);
    //   const formThumbData = new FormData();
    //   formData.append('file', {
    //     uri: thumbnailUri,
    //     name: thumbnailUri.fileName,
    //     type: thumbnailUri.type || 'application/octet-stream',
    //   });
    //  console.log("punlick thumb ")
    //   try {
    //     const response = await fetch(backendURL + UPLOAD_POST, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         // fetch will handle it automatically
    //       },
    //       body: formThumbData, // Attach form data
    //     });
        
    //     console.log("response photo =>  ", response)
    //     // Check if response is OK (status 200)
    //     if (!response.ok) {
    //       const responseText = await response.text(); // Get raw response as text
    //       console.error('Error response text:', responseText); // Log the raw response
    //       alert('Upload failed: ' + responseText); // Display the error in an alert
    //       return;
    //     }
  
    //     const responseThumbData = await response.json();
    //     console.log('Upload response:',responseThumbData);
    //     setLoader(false);
    //     // alert('Upload successful!');
    //     console.log("response data", responseThumbData)
  
    //     const addPostObj = {
    //       userId: userData._id,
    //       username: userData.username,
    //       thumbnillurl:responseThumbData.fileUrl,
    //     };
  
    //     // const response1 = await axios.post(backendURL + ADD_POST, addPostObj);
    //     // dispatch(fetchPosts())
    //     console.log('public btn 8 ');
    //     await axios.post(backendURL + ADD_REEL, addPostObj);
    //     setLoader(false);
    //     navigation.navigate('BottomTab');
    //     Alert.alert('Success', 'Thumbnill uploaded successfully');
    //   } catch (error) {
    //     console.error('Error uploading:', error);
    //     alert('Upload failed!');
    //   }
    // };

  // Category handling
  const handleSelectCategory = category => {
    setPostData(prev => {
      const isSelected = prev.selectedCategories.some(
        cat => cat.id === category.id,
      );

      if (isSelected) {
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter(
            cat => cat.id !== category.id,
          ),
        };
      }

      if (prev.selectedCategories.length >= MAX_CATEGORIES) {
        Alert.alert(
          'Limit Reached',
          `Maximum ${MAX_CATEGORIES} categories allowed`,
        );
        return prev;
      }

      return {
        ...prev,
        selectedCategories: [...prev.selectedCategories, category],
      };
    });
  };

  // Render methods
  const renderCategoryItem = ({ item }) => {
    const isSelected = postData.selectedCategories.some(
      cat => cat.id === item.id,
    );
    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
        onPress={() => handleSelectCategory(item)}>
        <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
        {isSelected && <Text style={styles.removeIcon}>✕</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
      </View>
      <Divider width={1} />

      <ScrollView>
        {/* Video Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Video</Text>
          <TouchableOpacity style={styles.selectButton} onPress={pickVideo}>
            <MaterialCommunityIcons name="video-plus" size={24} color="white" />
            <Text style={styles.buttonText}>Choose Video</Text>
          </TouchableOpacity>

          {/* {postData.selectedVideo && (
            <Video
              // source={{ uri: postData.selectedVideo }}
              source={{ uri: postData.selectedVideo }}
              style={styles.videoPreview}
              controls
              resizeMode="contain"
            />
          )} */}

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <View>
              {videoUri && (
                <>
                  <Text style={styles.info}>Selected Video:</Text>
                  <Video
                    source={{ uri: videoUri }}
                    style={styles.video}
                    controls={true}
                    resizeMode="contain"
                  />
                </>
              )}
              {/* {videoUri && (
              <Text style={styles.info}>Selected Video</Text>
            )} */}
            </View>
            <View>
              {thumbnailUri && (
                <>
                  <Text style={styles.info}>Thumbnail:</Text>
                  <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
                </>
              )}
            </View>
          </View>
        </View>

        {/* Caption Input */}
        <View style={styles.section}>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#666"
            multiline
            value={postData.caption}
            onChangeText={text =>
              setPostData(prev => ({ ...prev, caption: text }))
            }
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={postData.selectedCategories}
            horizontal
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            style={styles.categoryList}
          />
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setCategoryModalVisible(true)}>
            <Text style={styles.buttonText}>Select Categories</Text>
          </TouchableOpacity>
        </View>

        {/* Scheduling Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule Post (Optional)</Text>
          <View style={styles.scheduleContainer}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={showDatePicker}>
              <Text style={styles.dateText}>{dateTimeState.selectedDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={showTimePicker}>
              <Text style={styles.dateText}>{dateTimeState.selectedTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload Video</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Category Modal */}
      <Modal visible={categoryModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Categories</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories"
              value={postData.searchText}
              onChangeText={text =>
                setPostData(prev => ({ ...prev, searchText: text }))
              }
            />
            <FlatList
              data={categories.filter(cat =>
                cat.name
                  .toLowerCase()
                  .includes(postData.searchText.toLowerCase()),
              )}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setCategoryModalVisible(false)}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={dateTimeState.showDatePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={dateTimeState.showTimePicker}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <Loader visible={loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,

  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 12,
  },
  selectButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  videoPreview: {
    height: 200,
    marginTop: 16,
    backgroundColor: '#222',
  },
  captionInput: {
    backgroundColor: '#222',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryList: {
    marginBottom: 12,
  },
  categoryItem: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
  selectedCategoryItem: {
    backgroundColor: '#0066cc',
  },
  categoryText: {
    color: 'white',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeIcon: {
    color: 'white',
    marginLeft: 8,
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  dateText: {
    color: 'white',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#0066cc',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#333',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateButtonContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  dateButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 14,
  },
  dateLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  pickerModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#222',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerDoneButton: {
    padding: 8,
  },
  pickerDoneText: {
    color: '#0066cc',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 12,
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    tintColor: '#4CAF50',
    marginBottom: 16,
  },
  successText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helperText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  info: {
    marginVertical: 10,
    textAlign: 'center',
    color: 'green',
  },
  thumbnail: {
    width: 190,
    height: 300,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#272c33',
    borderRadius: 15,
    margin: 5,
    borderColor: 'green',
    borderWidth: 2,
  },
  video: {
    width: 190,
    height: 300,
    marginTop: 10,
    backgroundColor: '#272c33',
    borderRadius: 15,
    margin: 5,
    borderColor: 'green',
    borderWidth: 2,
  },
});

export default VideoUploader;



// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   ScrollView,
//   Modal,
//   Alert,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import {Divider} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useNavigation} from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Video from 'react-native-video';
// import {launchImageLibrary} from 'react-native-image-picker';
// import axios from 'axios';
// import backendURL, {
//   ADD_POST,
//   ADD_REEL,
//   UPLOAD_POST,
// } from '../../../utils/Strings';
// import {useInstaContext} from '../../../context/InstaContext';
// import Loader from '../../../components/Loader';
// import {createThumbnail} from 'react-native-create-thumbnail';

// const MAX_CATEGORIES = 3;

// const categories = [
//   {id: '1', name: 'Motivation'},
//   {id: '2', name: 'Gym'},
//   {id: '3', name: 'Sports'},
//   // ... other categories
// ];

// const VideoUploader = () => {
//   const navigation = useNavigation();
//   const {userToken} = useInstaContext();
//   const [loader, setLoader] = useState(false);

//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn
//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn

//   const [videoUri, setVideoUri] = useState(null);
//   const [thumbnailUri, setThumbnailUri] = useState(null);

//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn
//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn

//   // State management
//   const [postData, setPostData] = useState({
//     caption: '',
//     credit: '',
//     selectedVideo: null,
//     selectedCategories: [],
//     searchText: '',
//   });

//   const [dateTimeState, setDateTimeState] = useState({
//     selectedDate: 'Select date',
//     selectedTime: 'Select time',
//     showDatePicker: false,
//     showTimePicker: false,
//   });

//   const [categoryModalVisible, setCategoryModalVisible] = useState(false);
//   const [userData, setUserData] = useState({});

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post(`${backendURL}/userdata`, {
//           token: userToken,
//         });
//         setUserData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         Alert.alert('Error', 'Failed to fetch user data');
//       }
//     };
//     fetchUserData();
//   }, [userToken]);

//   // Date/Time Picker Handlers
//   const showDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: true,
//     }));
//   };

//   const hideDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: false,
//     }));
//   };

//   const handleDateConfirm = date => {
//     const formattedDate = new Date(date).toISOString().split('T')[0];
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedDate: formattedDate,
//       showDatePicker: false,
//     }));
//   };

//   const showTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: true,
//     }));
//   };

//   const hideTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: false,
//     }));
//   };

//   const handleTimeConfirm = date => {
//     const formattedTime = new Date(date).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedTime: formattedTime,
//       showTimePicker: false,
//     }));
//   };

//   // Video picker
//   // const pickVideo = async () => {
//   //   const options = {
//   //     mediaType: 'video',
//   //     selectionLimit: 1,
//   //   };

//   //   try {
//   //     const response = await launchImageLibrary(options);
//   //     if (response.assets?.[0]?.uri) {
//   //       setPostData(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //       generateThumbnail(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     console.error('Error picking video:', error);
//   //     Alert.alert('Error', 'Failed to pick video');
//   //   }
//   // };

//   const pickVideo = () => {
//     const options = {mediaType: 'video', selectionLimit: 1};

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled video picker');
//       } else if (response.errorCode) {
//         console.log('Error picking video: ', response.errorMessage);
//         Alert.alert('Error', response.errorMessage);
//       } else {
//         const selectedVideo = response.assets[0];
//         console.log(selectedVideo);
//         setVideoUri(selectedVideo.uri);
//         generateThumbnail(selectedVideo.uri); // Pass only URI
//       }
//     });
//   };

//   const generateThumbnail = async videoUri => {
//     if (!videoUri) return;

//     try {
//       const thumbnail = await createThumbnail({
//         url: videoUri,
//         timeStamp: 1000, // 1-second mark
//       });
//       setThumbnailUri(thumbnail.path);
//     } catch (error) {
//       console.error('Error generating thumbnail:', error);
//       Alert.alert('Error', 'Failed to generate thumbnail.');
//     }
//   };

//   // Category handling
//   const handleSelectCategory = category => {
//     setPostData(prev => {
//       const isSelected = prev.selectedCategories.some(
//         cat => cat.id === category.id,
//       );

//       if (isSelected) {
//         return {
//           ...prev,
//           selectedCategories: prev.selectedCategories.filter(
//             cat => cat.id !== category.id,
//           ),
//         };
//       }

//       if (prev.selectedCategories.length >= MAX_CATEGORIES) {
//         Alert.alert(
//           'Limit Reached',
//           `Maximum ${MAX_CATEGORIES} categories allowed`,
//         );
//         return prev;
//       }

//       return {
//         ...prev,
//         selectedCategories: [...prev.selectedCategories, category],
//       };
//     });
//   };

//   // // Upload handling
//   // const handleUpload = async () => {
//   //   console.log('public btn');
//   //   if (!videoUri) {
//   //     Alert.alert('Error', 'Please select a video first');
//   //     return;
//   //   }
//   //   console.log('public btn 1');
//   //   setLoader(true);
//   //   if (videoUri.length === 0) {
//   //     setCategoryModalVisible(true);
//   //     return;
//   //   }
//   //   console.log('public btn 2');
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append('file', {
//   //       uri: videoUri.uri,
//   //       type: videoUri.type || 'video/mp4',
//   //       name: videoUri.name,
//   //     });
//   //     console.log('public btn 3');
//   //     // Upload video
//   //     const uploadResponse = await fetch(backendURL + UPLOAD_POST, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //       body: formData,
//   //     });
//   //     console.log('public btn 4');
//   //     if (!uploadResponse.ok) {
//   //       throw new Error('Video upload failed');
//   //     }
//   //     console.log('public btn 5');
//   //     const responseData = await uploadResponse.json();
//   //     console.log('public btn fileurl');
//   //     // Create post with scheduling data
//   //     console.log(responseData);
//   //     const postPayload = {
//   //       userId: userData._id,
//   //       caption: postData.caption,
//   //       username: userData.username,
//   //       videourl: responseData.fileUrl,
//   //       thumbnillurl: responseData.fileUrl,
//   //       category: postData.selectedCategories,
//   //       publicpostDate:
//   //         dateTimeState.selectedDate !== 'Select date'
//   //           ? dateTimeState.selectedDate
//   //           : null,
//   //       publicpostTime:
//   //         dateTimeState.selectedTime !== 'Select time'
//   //           ? dateTimeState.selectedTime
//   //           : null,
//   //     };
//   //     console.log('public btn 6 ');
//   //     await axios.post(backendURL + ADD_REEL, postPayload);
//   //     setLoader(false);
//   //     Alert.alert('Success', 'Video uploaded successfully');
//   //     navigation.navigate('BottomTab');
//   //   } catch (error) {
//   //     console.error('Upload error:', error);
//   //     setLoader(false);
//   //     Alert.alert('Error', 'Failed to upload video');
//   //   }
//   // };

//   console.log(
//     'abcd =====>>>>>>  ',
//     videoUri,
//     '123  ======>>>>>  ',
//     thumbnailUri,
//   );

//   const handleUpload = async () => {
//     if (!videoUri) {
//       Alert.alert('Error', 'Please select a video first');
//       return;
//     }

//     setLoader(true);

//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: videoUri,
//         type: 'video/mp4',
//         name: videoUri.name,
//       });

//       const uploadResponse = await fetch(`${backendURL}${UPLOAD_POST}`, {
//         method: 'POST',
//         headers: {'Content-Type': 'multipart/form-data'},
//         body: formData,
//       });

//       if (!uploadResponse.ok) throw new Error('Upload failed');

//       const responseData = await uploadResponse.json();
//       console.log('Uploaded file URL:', responseData.fileUrl);

//       const postPayload = {
//         userId: userData._id,
//         caption: postData.caption,
//         username: userData.username,
//         videourl: responseData.fileUrl,
//         thumbnillurl: thumbnailUri || responseData.fileUrl,
//         category: postData.selectedCategories,
//         publicpostDate:
//           dateTimeState.selectedDate !== 'Select date'
//             ? dateTimeState.selectedDate
//             : null,
//         publicpostTime:
//           dateTimeState.selectedTime !== 'Select time'
//             ? dateTimeState.selectedTime
//             : null,
//       };

//       await axios.post(`${backendURL}${ADD_REEL}`, postPayload);
//       Alert.alert('Success', 'Video uploaded successfully');
//       navigation.navigate('BottomTab');
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Error', 'Failed to upload video');
//     } finally {
//       setLoader(false);
//     }
//   };

//   // Render methods
//   const renderCategoryItem = ({item}) => {
//     const isSelected = postData.selectedCategories.some(
//       cat => cat.id === item.id,
//     );
//     return (
//       <TouchableOpacity
//         style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
//         onPress={() => handleSelectCategory(item)}>
//         <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
//           {item.name}
//         </Text>
//         {isSelected && <Text style={styles.removeIcon}>✕</Text>}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={30} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Post</Text>
//       </View>
//       <Divider width={1} />

//       <ScrollView>
//         {/* Video Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Video</Text>
//           <TouchableOpacity style={styles.selectButton} onPress={pickVideo}>
//             <MaterialCommunityIcons name="video-plus" size={24} color="white" />
//             <Text style={styles.buttonText}>Choose Video</Text>
//           </TouchableOpacity>

//           {/* {postData.selectedVideo && (
//             <Video
//               // source={{ uri: postData.selectedVideo }}
//               source={{ uri: postData.selectedVideo }}
//               style={styles.videoPreview}
//               controls
//               resizeMode="contain"
//             />
//           )} */}

//           <View style={{alignItems: 'center'}}>
//             {videoUri && (
//               <>
//                 <Text style={styles.info}>Selected Video:</Text>
//                 <Video
//                   source={{uri: videoUri}}
//                   style={styles.video}
//                   controls={true}
//                   resizeMode="contain"
//                 />
//               </>
//             )}
//             {videoUri && <Text style={styles.info}>Selected Video</Text>}
//             {thumbnailUri && (
//               <>
//                 <Text style={styles.info}>Thumbnail:</Text>
//                 <Image source={{uri: thumbnailUri}} style={styles.thumbnail} />
//               </>
//             )}
//           </View>
//         </View>

//         {/* Caption Input */}
//         <View style={styles.section}>
//           <TextInput
//             style={styles.captionInput}
//             placeholder="Write a caption..."
//             placeholderTextColor="#666"
//             multiline
//             value={postData.caption}
//             onChangeText={text =>
//               setPostData(prev => ({...prev, caption: text}))
//             }
//           />
//         </View>

//         {/* Categories */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Categories</Text>
//           <FlatList
//             data={postData.selectedCategories}
//             horizontal
//             renderItem={renderCategoryItem}
//             keyExtractor={item => item.id}
//             style={styles.categoryList}
//           />
//           <TouchableOpacity
//             style={styles.selectButton}
//             onPress={() => setCategoryModalVisible(true)}>
//             <Text style={styles.buttonText}>Select Categories</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Scheduling Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Schedule Post (Optional)</Text>
//           <View style={styles.scheduleContainer}>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showDatePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedDate}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showTimePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedTime}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Upload Button */}
//         <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//           <Text style={styles.uploadButtonText}>Upload Video</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Category Modal */}
//       <Modal visible={categoryModalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Categories</Text>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search categories"
//               value={postData.searchText}
//               onChangeText={text =>
//                 setPostData(prev => ({...prev, searchText: text}))
//               }
//             />
//             <FlatList
//               data={categories.filter(cat =>
//                 cat.name
//                   .toLowerCase()
//                   .includes(postData.searchText.toLowerCase()),
//               )}
//               renderItem={renderCategoryItem}
//               keyExtractor={item => item.id}
//               numColumns={2}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setCategoryModalVisible(false)}>
//               <Text style={styles.buttonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Date Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showDatePicker}
//         mode="date"
//         onConfirm={handleDateConfirm}
//         onCancel={hideDatePicker}
//         minimumDate={new Date()}
//       />

//       {/* Time Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showTimePicker}
//         mode="time"
//         onConfirm={handleTimeConfirm}
//         onCancel={hideTimePicker}
//       />
//       <Loader visible={loader} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     marginLeft: 16,
//     fontWeight: 'bold',
//   },
//   section: {
//     padding: 16,
//     // justifyContent:'center'
//     // alignItems:'center',
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   selectButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   videoPreview: {
//     height: 200,
//     marginTop: 16,
//     backgroundColor: '#222',
//   },
//   captionInput: {
//     backgroundColor: '#222',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   categoryList: {
//     marginBottom: 12,
//   },
//   categoryItem: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 16,
//     marginRight: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedCategoryItem: {
//     backgroundColor: '#0066cc',
//   },
//   categoryText: {
//     color: 'white',
//   },
//   selectedText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   removeIcon: {
//     color: 'white',
//     marginLeft: 8,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flex: 0.48,
//   },
//   dateText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   uploadButton: {
//     backgroundColor: '#0066cc',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   modalContent: {
//     backgroundColor: '#222',
//     borderRadius: 16,
//     padding: 16,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   modalButton: {
//     backgroundColor: '#0066cc',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   dateButtonContainer: {
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: 48,
//   },
//   dateButtonText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   dateLabel: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   pickerModal: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   pickerContainer: {
//     backgroundColor: '#222',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   pickerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   pickerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pickerDoneButton: {
//     padding: 8,
//   },
//   pickerDoneText: {
//     color: '#0066cc',
//     fontSize: 16,
//   },
//   errorText: {
//     color: '#ff4444',
//     fontSize: 14,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: 'white',
//     fontSize: 16,
//     marginTop: 12,
//   },
//   successOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successIcon: {
//     width: 80,
//     height: 80,
//     tintColor: '#4CAF50',
//     marginBottom: 16,
//   },
//   successText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   helperText: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },

//   info: {
//     marginVertical: 10,
//     textAlign: 'center',
//     color: 'green',
//   },
//   thumbnail: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//     borderRadius: 10,
//     // justifyContent:'center',
//     // alignItems:'center',
//   },
//   video: {
//     width: 300,
//     height: 200,
//     marginTop: 10,
//   },
// });

// export default VideoUploader;












// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   ScrollView,
//   Modal,
//   Alert,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import { Divider } from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Video from 'react-native-video';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import backendURL, {
//   ADD_POST,
//   ADD_REEL,
//   UPLOAD_POST,
// } from '../../../utils/Strings';
// import { useInstaContext } from '../../../context/InstaContext';
// import Loader from '../../../components/Loader';
// import { createThumbnail } from 'react-native-create-thumbnail';

// const MAX_CATEGORIES = 3;

// const categories = [
//   { id: '1', name: 'Motivation' },
//   { id: '2', name: 'Gym' },
//   { id: '3', name: 'Sports' },
//   // ... other categories
// ];

// const VideoUploader = () => {
//   const navigation = useNavigation();
//   const { userToken } = useInstaContext();
//   const [loader, setLoader] = useState(false);

//   const [videoUri, setVideoUri] = useState(null);
//   const [thumbnailUri, setThumbnailUri] = useState(null);

//   // State management
//   const [postData, setPostData] = useState({
//     caption: '',
//     credit: '',
//     selectedVideo: null,
//     selectedCategories: [],
//     searchText: '',
//   });

//   const [dateTimeState, setDateTimeState] = useState({
//     selectedDate: 'Select date',
//     selectedTime: 'Select time',
//     showDatePicker: false,
//     showTimePicker: false,
//   });

//   const [categoryModalVisible, setCategoryModalVisible] = useState(false);
//   const [userData, setUserData] = useState({});

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post(`${backendURL}/userdata`, {
//           token: userToken,
//         });
//         setUserData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         Alert.alert('Error', 'Failed to fetch user data');
//       }
//     };
//     fetchUserData();
//   }, [userToken]);

//   // Date/Time Picker Handlers
//   const showDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: true,
//     }));
//   };

//   const hideDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: false,
//     }));
//   };

//   const handleDateConfirm = date => {
//     const formattedDate = new Date(date).toISOString().split('T')[0];
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedDate: formattedDate,
//       showDatePicker: false,
//     }));
//   };

//   const showTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: true,
//     }));
//   };

//   const hideTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: false,
//     }));
//   };

//   const handleTimeConfirm = date => {
//     const formattedTime = new Date(date).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedTime: formattedTime,
//       showTimePicker: false,
//     }));
//   };

//   // Video picker
//   // const pickVideo = async () => {
//   //   const options = {
//   //     mediaType: 'video',
//   //     selectionLimit: 1,
//   //   };

//   //   try {
//   //     const response = await launchImageLibrary(options);
//   //     if (response.assets?.[0]?.uri) {
//   //       setPostData(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //       generateThumbnail(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     console.error('Error picking video:', error);
//   //     Alert.alert('Error', 'Failed to pick video');
//   //   }
//   // };

//   const pickVideo = () => {
//     const options = { mediaType: 'video', selectionLimit: 1 };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled video picker');
//       } else if (response.errorCode) {
//         console.log('Error picking video: ', response.errorMessage);
//         Alert.alert('Error', response.errorMessage);
//       } else {
//         const selectedVideo = response.assets[0];
//         console.log(selectedVideo);
//         setVideoUri(selectedVideo.uri);
//         generateThumbnail(selectedVideo.uri); // Pass only URI
//       }
//     });
//   };

//   const generateThumbnail = async videoUri => {
//     if (!videoUri) return;

//     try {
//       const thumbnail = await createThumbnail({
//         url: videoUri,
//         timeStamp: 1000, // 1-second mark
//       });
//       setThumbnailUri(thumbnail.path);
//     } catch (error) {
//       console.error('Error generating thumbnail:', error);
//       Alert.alert('Error', 'Failed to generate thumbnail.');
//     }
//   };


//   // // Upload handling
//   // const handleUpload = async () => {
//   //   console.log('public btn');
//   //   if (!videoUri) {
//   //     Alert.alert('Error', 'Please select a video first');
//   //     return;
//   //   }
//   //   console.log('public btn 1');
//   //   setLoader(true);
//   //   if (videoUri.length === 0) {
//   //     setCategoryModalVisible(true);
//   //     return;
//   //   }
//   //   console.log('public btn 2');
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append('file', {
//   //       uri: videoUri.uri,
//   //       type: videoUri.type || 'video/mp4',
//   //       name: videoUri.name,
//   //     });
//   //     console.log('public btn 3');
//   //     // Upload video
//   //     const uploadResponse = await fetch(backendURL + UPLOAD_POST, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //       body: formData,
//   //     });
//   //     console.log('public btn 4');
//   //     if (!uploadResponse.ok) {
//   //       throw new Error('Video upload failed');
//   //     }
//   //     console.log('public btn 5');
//   //     const responseData = await uploadResponse.json();
//   //     console.log('public btn fileurl');
//   //     // Create post with scheduling data
//   //     console.log(responseData);
//   //     const postPayload = {
//   //       userId: userData._id,
//   //       caption: postData.caption,
//   //       username: userData.username,
//   //       videourl: responseData.fileUrl,
//   //       thumbnillurl: responseData.fileUrl,
//   //       category: postData.selectedCategories,
//   //       publicpostDate:
//   //         dateTimeState.selectedDate !== 'Select date'
//   //           ? dateTimeState.selectedDate
//   //           : null,
//   //       publicpostTime:
//   //         dateTimeState.selectedTime !== 'Select time'
//   //           ? dateTimeState.selectedTime
//   //           : null,
//   //     };
//   //     console.log('public btn 6 ');
//   //     await axios.post(backendURL + ADD_REEL, postPayload);
//   //     setLoader(false);
//   //     Alert.alert('Success', 'Video uploaded successfully');
//   //     navigation.navigate('BottomTab');
//   //   } catch (error) {
//   //     console.error('Upload error:', error);
//   //     setLoader(false);
//   //     Alert.alert('Error', 'Failed to upload video');
//   //   }
//   // };


//   const handleUpload = async () => {
//     console.log('upload video btn')
//     if (!videoUri) {
//       Alert.alert('Error', 'Please select a video first');
//       return;
//     }
//     console.log('video selected')
//     setLoader(true);
//     console.log('step 1 upload video')
//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: videoUri,
//         type: 'video/mp4',
//         name: videoUri.fileName,
//       });
//       console.log('step 2 upload video')
//       const uploadResponse = await fetch(`${backendURL}${UPLOAD_POST}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'multipart/form-data' },
//         body: formData,
//       });
//       console.log('step 3 upload video')
//       console.log("upload response => ", uploadResponse)
//       if (!uploadResponse.ok) throw new Error('Upload failed');

//       const responseData = await uploadResponse.json();
//       console.log('Uploaded file URL:', responseData.fileUrl);
//       console.log('step 4 upload video')
//       const postPayload = {
//         userId: userData._id,
//         caption: postData.caption,
//         username: userData.username,
//         videourl: responseData.fileUrl,
//         thumbnillurl: thumbnailUri || responseData.fileUrl,
//         category: postData.selectedCategories,
//         publicpostDate:
//           dateTimeState.selectedDate !== 'Select date'
//             ? dateTimeState.selectedDate
//             : null,
//         publicpostTime:
//           dateTimeState.selectedTime !== 'Select time'
//             ? dateTimeState.selectedTime
//             : null,
//       };
//       console.log('step 5 upload video')
//       await axios.post(`${backendURL}${ADD_REEL}`, postPayload);
//       Alert.alert('Success', 'Video uploaded successfully');
//       navigation.navigate('BottomTab');
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Error', 'Failed to upload video');
//     } finally {
//       setLoader(false);
//     }
//   };

//   console.log(
//     'video url =====>>>>>>  ',
//     videoUri,
//     'thumbnill url  ======>>>>>  ',
//     thumbnailUri,
//   );


//   // Category handling
//   const handleSelectCategory = category => {
//     setPostData(prev => {
//       const isSelected = prev.selectedCategories.some(
//         cat => cat.id === category.id,
//       );

//       if (isSelected) {
//         return {
//           ...prev,
//           selectedCategories: prev.selectedCategories.filter(
//             cat => cat.id !== category.id,
//           ),
//         };
//       }

//       if (prev.selectedCategories.length >= MAX_CATEGORIES) {
//         Alert.alert(
//           'Limit Reached',
//           `Maximum ${MAX_CATEGORIES} categories allowed`,
//         );
//         return prev;
//       }

//       return {
//         ...prev,
//         selectedCategories: [...prev.selectedCategories, category],
//       };
//     });
//   };


//   // Render methods
//   const renderCategoryItem = ({ item }) => {
//     const isSelected = postData.selectedCategories.some(
//       cat => cat.id === item.id,
//     );
//     return (
//       <TouchableOpacity
//         style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
//         onPress={() => handleSelectCategory(item)}>
//         <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
//           {item.name}
//         </Text>
//         {isSelected && <Text style={styles.removeIcon}>✕</Text>}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={30} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Post</Text>
//       </View>
//       <Divider width={1} />

//       <ScrollView>
//         {/* Video Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Video</Text>
//           <TouchableOpacity style={styles.selectButton} onPress={pickVideo}>
//             <MaterialCommunityIcons name="video-plus" size={24} color="white" />
//             <Text style={styles.buttonText}>Choose Video</Text>
//           </TouchableOpacity>

//           {/* {postData.selectedVideo && (
//             <Video
//               // source={{ uri: postData.selectedVideo }}
//               source={{ uri: postData.selectedVideo }}
//               style={styles.videoPreview}
//               controls
//               resizeMode="contain"
//             />
//           )} */}

//           <View style={{ alignItems: 'center' }}>
//             {videoUri && (
//               <>
//                 <Text style={styles.info}>Selected Video:</Text>
//                 <Video
//                   source={{ uri: videoUri }}
//                   style={styles.video}
//                   controls={true}
//                   resizeMode="contain"
//                 />
//               </>
//             )}
//             {videoUri && <Text style={styles.info}>Selected Video</Text>}
//             {thumbnailUri && (
//               <>
//                 <Text style={styles.info}>Thumbnail:</Text>
//                 <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
//               </>
//             )}
//           </View>
//         </View>

//         {/* Caption Input */}
//         <View style={styles.section}>
//           <TextInput
//             style={styles.captionInput}
//             placeholder="Write a caption..."
//             placeholderTextColor="#666"
//             multiline
//             value={postData.caption}
//             onChangeText={text =>
//               setPostData(prev => ({ ...prev, caption: text }))
//             }
//           />
//         </View>

//         {/* Categories */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Categories</Text>
//           <FlatList
//             data={postData.selectedCategories}
//             horizontal
//             renderItem={renderCategoryItem}
//             keyExtractor={item => item.id}
//             style={styles.categoryList}
//           />
//           <TouchableOpacity
//             style={styles.selectButton}
//             onPress={() => setCategoryModalVisible(true)}>
//             <Text style={styles.buttonText}>Select Categories</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Scheduling Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Schedule Post (Optional)</Text>
//           <View style={styles.scheduleContainer}>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showDatePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedDate}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showTimePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedTime}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Upload Button */}
//         <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//           <Text style={styles.uploadButtonText}>Upload Video</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Category Modal */}
//       <Modal visible={categoryModalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Categories</Text>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search categories"
//               value={postData.searchText}
//               onChangeText={text =>
//                 setPostData(prev => ({ ...prev, searchText: text }))
//               }
//             />
//             <FlatList
//               data={categories.filter(cat =>
//                 cat.name
//                   .toLowerCase()
//                   .includes(postData.searchText.toLowerCase()),
//               )}
//               renderItem={renderCategoryItem}
//               keyExtractor={item => item.id}
//               numColumns={2}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setCategoryModalVisible(false)}>
//               <Text style={styles.buttonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Date Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showDatePicker}
//         mode="date"
//         onConfirm={handleDateConfirm}
//         onCancel={hideDatePicker}
//         minimumDate={new Date()}
//       />

//       {/* Time Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showTimePicker}
//         mode="time"
//         onConfirm={handleTimeConfirm}
//         onCancel={hideTimePicker}
//       />
//       <Loader visible={loader} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     marginLeft: 16,
//     fontWeight: 'bold',
//   },
//   section: {
//     padding: 16,
//     // justifyContent:'center'
//     // alignItems:'center',
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   selectButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   videoPreview: {
//     height: 200,
//     marginTop: 16,
//     backgroundColor: '#222',
//   },
//   captionInput: {
//     backgroundColor: '#222',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   categoryList: {
//     marginBottom: 12,
//   },
//   categoryItem: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 16,
//     marginRight: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedCategoryItem: {
//     backgroundColor: '#0066cc',
//   },
//   categoryText: {
//     color: 'white',
//   },
//   selectedText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   removeIcon: {
//     color: 'white',
//     marginLeft: 8,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flex: 0.48,
//   },
//   dateText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   uploadButton: {
//     backgroundColor: '#0066cc',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   modalContent: {
//     backgroundColor: '#222',
//     borderRadius: 16,
//     padding: 16,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   modalButton: {
//     backgroundColor: '#0066cc',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   dateButtonContainer: {
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: 48,
//   },
//   dateButtonText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   dateLabel: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   pickerModal: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   pickerContainer: {
//     backgroundColor: '#222',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   pickerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   pickerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pickerDoneButton: {
//     padding: 8,
//   },
//   pickerDoneText: {
//     color: '#0066cc',
//     fontSize: 16,
//   },
//   errorText: {
//     color: '#ff4444',
//     fontSize: 14,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: 'white',
//     fontSize: 16,
//     marginTop: 12,
//   },
//   successOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successIcon: {
//     width: 80,
//     height: 80,
//     tintColor: '#4CAF50',
//     marginBottom: 16,
//   },
//   successText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   helperText: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },

//   info: {
//     marginVertical: 10,
//     textAlign: 'center',
//     color: 'green',
//   },
//   thumbnail: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//     borderRadius: 10,
//     // justifyContent:'center',
//     // alignItems:'center',
//   },
//   video: {
//     width: 300,
//     height: 200,
//     marginTop: 10,
//   },
// });

// export default VideoUploader;

// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   ScrollView,
//   Modal,
//   Alert,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import {Divider} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useNavigation} from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Video from 'react-native-video';
// import {launchImageLibrary} from 'react-native-image-picker';
// import axios from 'axios';
// import backendURL, {
//   ADD_POST,
//   ADD_REEL,
//   UPLOAD_POST,
// } from '../../../utils/Strings';
// import {useInstaContext} from '../../../context/InstaContext';
// import Loader from '../../../components/Loader';
// import {createThumbnail} from 'react-native-create-thumbnail';

// const MAX_CATEGORIES = 3;

// const categories = [
//   {id: '1', name: 'Motivation'},
//   {id: '2', name: 'Gym'},
//   {id: '3', name: 'Sports'},
//   // ... other categories
// ];

// const VideoUploader = () => {
//   const navigation = useNavigation();
//   const {userToken} = useInstaContext();
//   const [loader, setLoader] = useState(false);

//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn
//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn

//   const [videoUri, setVideoUri] = useState(null);
//   const [thumbnailUri, setThumbnailUri] = useState(null);

//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn
//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn

//   // State management
//   const [postData, setPostData] = useState({
//     caption: '',
//     credit: '',
//     selectedVideo: null,
//     selectedCategories: [],
//     searchText: '',
//   });

//   const [dateTimeState, setDateTimeState] = useState({
//     selectedDate: 'Select date',
//     selectedTime: 'Select time',
//     showDatePicker: false,
//     showTimePicker: false,
//   });

//   const [categoryModalVisible, setCategoryModalVisible] = useState(false);
//   const [userData, setUserData] = useState({});

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post(`${backendURL}/userdata`, {
//           token: userToken,
//         });
//         setUserData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         Alert.alert('Error', 'Failed to fetch user data');
//       }
//     };
//     fetchUserData();
//   }, [userToken]);

//   // Date/Time Picker Handlers
//   const showDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: true,
//     }));
//   };

//   const hideDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: false,
//     }));
//   };

//   const handleDateConfirm = date => {
//     const formattedDate = new Date(date).toISOString().split('T')[0];
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedDate: formattedDate,
//       showDatePicker: false,
//     }));
//   };

//   const showTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: true,
//     }));
//   };

//   const hideTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: false,
//     }));
//   };

//   const handleTimeConfirm = date => {
//     const formattedTime = new Date(date).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedTime: formattedTime,
//       showTimePicker: false,
//     }));
//   };

//   // Video picker
//   // const pickVideo = async () => {
//   //   const options = {
//   //     mediaType: 'video',
//   //     selectionLimit: 1,
//   //   };

//   //   try {
//   //     const response = await launchImageLibrary(options);
//   //     if (response.assets?.[0]?.uri) {
//   //       setPostData(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //       generateThumbnail(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     console.error('Error picking video:', error);
//   //     Alert.alert('Error', 'Failed to pick video');
//   //   }
//   // };

//   const pickVideo = () => {
//     const options = {
//       mediaType: 'video',
//       selectionLimit: 1,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled video picker');
//       } else if (response.errorCode) {
//         console.log('Error picking video: ', response.errorMessage);
//         Alert.alert('Error', response.errorMessage);
//       } else {
//         const selectedVideo = response.assets[0];
//         console.log(selectedVideo);
//         setVideoUri(selectedVideo);
//         generateThumbnail(selectedVideo);
//       }
//     });
//   };

//   const generateThumbnail = async videoUri => {
//     try {
//       const thumbnail = await createThumbnail({
//         url: videoUri,
//         timeStamp: 1000, // Time in milliseconds to capture the thumbnail
//       });
//       setThumbnailUri(thumbnail.path);
//     } catch (error) {
//       console.error('Error generating thumbnail: ', error);
//       Alert.alert('Error', 'Failed to generate thumbnail.');
//     }
//   };

//   // Category handling
//   const handleSelectCategory = category => {
//     setPostData(prev => {
//       const isSelected = prev.selectedCategories.some(
//         cat => cat.id === category.id,
//       );

//       if (isSelected) {
//         return {
//           ...prev,
//           selectedCategories: prev.selectedCategories.filter(
//             cat => cat.id !== category.id,
//           ),
//         };
//       }

//       if (prev.selectedCategories.length >= MAX_CATEGORIES) {
//         Alert.alert(
//           'Limit Reached',
//           `Maximum ${MAX_CATEGORIES} categories allowed`,
//         );
//         return prev;
//       }

//       return {
//         ...prev,
//         selectedCategories: [...prev.selectedCategories, category],
//       };
//     });
//   };

//   // Upload handling
//   const handleUpload = async () => {
//     if (!videoUri) {
//       Alert.alert('Error', 'Please select a video first');
//       return;
//     }

//     setLoader(true);
//     if (videoUri.length === 0) {
//       setCategoryModalVisible(true);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: videoUri.uri,
//         type: videoUri.type || 'video/mp4',
//         name: videoUri.name,
//       });

//       // Upload video
//       const uploadResponse = await fetch(backendURL + UPLOAD_POST, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       if (!uploadResponse.ok) {
//         throw new Error('Video upload failed');
//       }

//       const responseData = await uploadResponse.json();

//       // Create post with scheduling data
//       const postPayload = {
//         userId: userData._id,
//         caption: postData.caption,
//         username: userData.username,
//         videourl: responseData.fileUrl,
//         thumbnillurl: responseData.fileUrl,
//         category: postData.selectedCategories,
//         publicpostDate:
//           dateTimeState.selectedDate !== 'Select date'
//             ? dateTimeState.selectedDate
//             : null,
//         publicpostTime:
//           dateTimeState.selectedTime !== 'Select time'
//             ? dateTimeState.selectedTime
//             : null,
//       };

//       await axios.post(backendURL + ADD_REEL, postPayload);
//       setLoader(false);
//       Alert.alert('Success', 'Video uploaded successfully');
//       navigation.navigate('BottomTab');
//     } catch (error) {
//       console.error('Upload error:', error);
//       setLoader(false);
//       Alert.alert('Error', 'Failed to upload video');
//     }
//   };

//   // Render methods
//   const renderCategoryItem = ({item}) => {
//     const isSelected = postData.selectedCategories.some(
//       cat => cat.id === item.id,
//     );
//     return (
//       <TouchableOpacity
//         style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
//         onPress={() => handleSelectCategory(item)}>
//         <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
//           {item.name}
//         </Text>
//         {isSelected && <Text style={styles.removeIcon}>✕</Text>}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={30} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Post</Text>
//       </View>
//       <Divider width={1} />

//       <ScrollView>
//         {/* Video Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Video</Text>
//           <TouchableOpacity style={styles.selectButton} onPress={pickVideo}>
//             <MaterialCommunityIcons name="video-plus" size={24} color="white" />
//             <Text style={styles.buttonText}>Choose Video</Text>
//           </TouchableOpacity>

//           {/* {postData.selectedVideo && (
//             <Video
//               // source={{ uri: postData.selectedVideo }}
//               source={{ uri: postData.selectedVideo }}
//               style={styles.videoPreview}
//               controls
//               resizeMode="contain"
//             />
//           )} */}

//           {videoUri && (
//             <>
//               <Text style={styles.info}>Selected Video:</Text>
//               <Video
//                 source={{uri: videoUri}}
//                 style={styles.video}
//                 controls={true}
//                 resizeMode="contain"
//               />
//             </>
//           )}
//           {videoUri && (
//             <Text style={styles.info}>Selected Video: {videoUri}</Text>
//           )}
//           {thumbnailUri && (
//             <>
//               <Text style={styles.info}>Thumbnail:</Text>
//               <Image source={{uri: thumbnailUri}} style={styles.thumbnail} />
//             </>
//           )}
//         </View>

//         {/* Caption Input */}
//         <View style={styles.section}>
//           <TextInput
//             style={styles.captionInput}
//             placeholder="Write a caption..."
//             placeholderTextColor="#666"
//             multiline
//             value={postData.caption}
//             onChangeText={text =>
//               setPostData(prev => ({...prev, caption: text}))
//             }
//           />
//         </View>

//         {/* Categories */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Categories</Text>
//           <FlatList
//             data={postData.selectedCategories}
//             horizontal
//             renderItem={renderCategoryItem}
//             keyExtractor={item => item.id}
//             style={styles.categoryList}
//           />
//           <TouchableOpacity
//             style={styles.selectButton}
//             onPress={() => setCategoryModalVisible(true)}>
//             <Text style={styles.buttonText}>Select Categories</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Scheduling Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Schedule Post (Optional)</Text>
//           <View style={styles.scheduleContainer}>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showDatePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedDate}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showTimePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedTime}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Upload Button */}
//         <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//           <Text style={styles.uploadButtonText}>Upload Video</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Category Modal */}
//       <Modal visible={categoryModalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Categories</Text>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search categories"
//               value={postData.searchText}
//               onChangeText={text =>
//                 setPostData(prev => ({...prev, searchText: text}))
//               }
//             />
//             <FlatList
//               data={categories.filter(cat =>
//                 cat.name
//                   .toLowerCase()
//                   .includes(postData.searchText.toLowerCase()),
//               )}
//               renderItem={renderCategoryItem}
//               keyExtractor={item => item.id}
//               numColumns={2}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setCategoryModalVisible(false)}>
//               <Text style={styles.buttonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Date Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showDatePicker}
//         mode="date"
//         onConfirm={handleDateConfirm}
//         onCancel={hideDatePicker}
//         minimumDate={new Date()}
//       />

//       {/* Time Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showTimePicker}
//         mode="time"
//         onConfirm={handleTimeConfirm}
//         onCancel={hideTimePicker}
//       />
//       <Loader visible={loader} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     marginLeft: 16,
//     fontWeight: 'bold',
//   },
//   section: {
//     padding: 16,
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   selectButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   videoPreview: {
//     height: 200,
//     marginTop: 16,
//     backgroundColor: '#222',
//   },
//   captionInput: {
//     backgroundColor: '#222',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   categoryList: {
//     marginBottom: 12,
//   },
//   categoryItem: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 16,
//     marginRight: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedCategoryItem: {
//     backgroundColor: '#0066cc',
//   },
//   categoryText: {
//     color: 'white',
//   },
//   selectedText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   removeIcon: {
//     color: 'white',
//     marginLeft: 8,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flex: 0.48,
//   },
//   dateText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   uploadButton: {
//     backgroundColor: '#0066cc',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   modalContent: {
//     backgroundColor: '#222',
//     borderRadius: 16,
//     padding: 16,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   modalButton: {
//     backgroundColor: '#0066cc',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   dateButtonContainer: {
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: 48,
//   },
//   dateButtonText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   dateLabel: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   pickerModal: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   pickerContainer: {
//     backgroundColor: '#222',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   pickerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   pickerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pickerDoneButton: {
//     padding: 8,
//   },
//   pickerDoneText: {
//     color: '#0066cc',
//     fontSize: 16,
//   },
//   errorText: {
//     color: '#ff4444',
//     fontSize: 14,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: 'white',
//     fontSize: 16,
//     marginTop: 12,
//   },
//   successOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successIcon: {
//     width: 80,
//     height: 80,
//     tintColor: '#4CAF50',
//     marginBottom: 16,
//   },
//   successText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   helperText: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },

//   info: {
//     marginVertical: 10,
//     textAlign: 'center',
//     color: 'red',
//   },
//   thumbnail: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//   },
//   video: {
//     width: 300,
//     height: 200,
//     marginTop: 10,
//   },
// });

// export default VideoUploader;

// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   ScrollView,
//   Modal,
//   Alert,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import {Divider} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useNavigation} from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Video from 'react-native-video';
// import {launchImageLibrary} from 'react-native-image-picker';
// import axios from 'axios';
// import backendURL, {
//   ADD_POST,
//   ADD_REEL,
//   UPLOAD_POST,
// } from '../../../utils/Strings';
// import {useInstaContext} from '../../../context/InstaContext';
// import Loader from '../../../components/Loader';
// import {createThumbnail} from 'react-native-create-thumbnail';

// const MAX_CATEGORIES = 3;

// const categories = [
//   {id: '1', name: 'Motivation'},
//   {id: '2', name: 'Gym'},
//   {id: '3', name: 'Sports'},
//   // ... other categories
// ];

// const VideoUploader = () => {
//   const navigation = useNavigation();
//   const {userToken} = useInstaContext();
//   const [loader, setLoader] = useState(false);

//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn
//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn

//   const [videoUri, setVideoUri] = useState(null);
//   const [thumbnailUri, setThumbnailUri] = useState(null);

//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn
//   // nnnnnnnnnnnnnnnnnnnnnnnnnnnn

//   // State management
//   const [postData, setPostData] = useState({
//     caption: '',
//     credit: '',
//     selectedVideo: null,
//     selectedCategories: [],
//     searchText: '',
//   });

//   const [dateTimeState, setDateTimeState] = useState({
//     selectedDate: 'Select date',
//     selectedTime: 'Select time',
//     showDatePicker: false,
//     showTimePicker: false,
//   });

//   const [categoryModalVisible, setCategoryModalVisible] = useState(false);
//   const [userData, setUserData] = useState({});

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post(`${backendURL}/userdata`, {
//           token: userToken,
//         });
//         setUserData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         Alert.alert('Error', 'Failed to fetch user data');
//       }
//     };
//     fetchUserData();
//   }, [userToken]);

//   // Date/Time Picker Handlers
//   const showDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: true,
//     }));
//   };

//   const hideDatePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showDatePicker: false,
//     }));
//   };

//   const handleDateConfirm = date => {
//     const formattedDate = new Date(date).toISOString().split('T')[0];
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedDate: formattedDate,
//       showDatePicker: false,
//     }));
//   };

//   const showTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: true,
//     }));
//   };

//   const hideTimePicker = () => {
//     setDateTimeState(prev => ({
//       ...prev,
//       showTimePicker: false,
//     }));
//   };

//   const handleTimeConfirm = date => {
//     const formattedTime = new Date(date).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//     setDateTimeState(prev => ({
//       ...prev,
//       selectedTime: formattedTime,
//       showTimePicker: false,
//     }));
//   };

//   // Video picker
//   // const pickVideo = async () => {
//   //   const options = {
//   //     mediaType: 'video',
//   //     selectionLimit: 1,
//   //   };

//   //   try {
//   //     const response = await launchImageLibrary(options);
//   //     if (response.assets?.[0]?.uri) {
//   //       setPostData(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //       generateThumbnail(prev => ({
//   //         ...prev,
//   //         selectedVideo: response.assets[0].uri,
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     console.error('Error picking video:', error);
//   //     Alert.alert('Error', 'Failed to pick video');
//   //   }
//   // };

//   const pickVideo = () => {
//     const options = {
//       mediaType: 'video',
//       selectionLimit: 1,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled video picker');
//       } else if (response.errorCode) {
//         console.log('Error picking video: ', response.errorMessage);
//         Alert.alert('Error', response.errorMessage);
//       } else {
//         const selectedVideo = response.assets[0];
//         setVideoUri(selectedVideo.uri);
//         generateThumbnail(selectedVideo.uri);
//       }
//     });
//   };

//   const generateThumbnail = async videoUri => {
//     try {
//       const thumbnail = await createThumbnail({
//         url: videoUri,
//         timeStamp: 1000, // Time in milliseconds to capture the thumbnail
//       });
//       setThumbnailUri(thumbnail.path);
//     } catch (error) {
//       console.error('Error generating thumbnail: ', error);
//       Alert.alert('Error', 'Failed to generate thumbnail.');
//     }
//   };

//   // Category handling
//   const handleSelectCategory = category => {
//     setPostData(prev => {
//       const isSelected = prev.selectedCategories.some(
//         cat => cat.id === category.id,
//       );

//       if (isSelected) {
//         return {
//           ...prev,
//           selectedCategories: prev.selectedCategories.filter(
//             cat => cat.id !== category.id,
//           ),
//         };
//       }

//       if (prev.selectedCategories.length >= MAX_CATEGORIES) {
//         Alert.alert(
//           'Limit Reached',
//           `Maximum ${MAX_CATEGORIES} categories allowed`,
//         );
//         return prev;
//       }

//       return {
//         ...prev,
//         selectedCategories: [...prev.selectedCategories, category],
//       };
//     });
//   };

//   // Upload handling
//   const handleUpload = async () => {
//     if (!videoUri) {
//       Alert.alert('Error', 'Please select a video first');
//       return;
//     }
//     setLoader(true);
//     if (videoUri.length === 0) {
//       setCategoryModalVisible(true);
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: videoUri,
//         type: 'video/mp4',
//         name: 'video.mp4',
//       });
//       // Upload video
//       const uploadResponse = await fetch(backendURL + UPLOAD_POST, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });
//       if (!uploadResponse.ok) {
//         throw new Error('Video upload failed');
//       }
//       const {fileUrl} = await uploadResponse.json();
//       // Create post with scheduling data
//       const postPayload = {
//         userId: userData._id,
//         caption: postData.caption,
//         username: userData.username,
//         videourl: videoUri,
//         thumbnillurl: thumbnailUri,
//         category: postData.selectedCategories,
//         publicpostDate:
//           dateTimeState.selectedDate !== 'Select date'
//             ? dateTimeState.selectedDate
//             : null,
//         publicpostTime:
//           dateTimeState.selectedTime !== 'Select time'
//             ? dateTimeState.selectedTime
//             : null,
//       };
//       console.log('public btn 6 ');
//       await axios.post(backendURL + ADD_REEL, postPayload);
//       setLoader(false);
//       Alert.alert('Success', 'Video uploaded successfully');
//       navigation.navigate('BottomTab');
//     } catch (error) {
//       console.error('Upload error:', error);
//       setLoader(false);
//       Alert.alert('Error', 'Failed to upload video');
//     }
//   };

//   // Render methods
//   const renderCategoryItem = ({item}) => {
//     const isSelected = postData.selectedCategories.some(
//       cat => cat.id === item.id,
//     );
//     return (
//       <TouchableOpacity
//         style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
//         onPress={() => handleSelectCategory(item)}>
//         <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
//           {item.name}
//         </Text>
//         {isSelected && <Text style={styles.removeIcon}>✕</Text>}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={30} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Post</Text>
//       </View>
//       <Divider width={1} />

//       <ScrollView>
//         {/* Video Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Video</Text>
//           <TouchableOpacity style={styles.selectButton} onPress={pickVideo}>
//             <MaterialCommunityIcons name="video-plus" size={24} color="white" />
//             <Text style={styles.buttonText}>Choose Video</Text>
//           </TouchableOpacity>

//           {/* {postData.selectedVideo && (
//             <Video
//               // source={{ uri: postData.selectedVideo }}
//               source={{ uri: postData.selectedVideo }}
//               style={styles.videoPreview}
//               controls
//               resizeMode="contain"
//             />
//           )} */}

//           {videoUri && (
//             <>
//               <Text style={styles.info}>Selected Video:</Text>
//               <Video
//                 source={{uri: videoUri}}
//                 style={styles.video}
//                 controls={true}
//                 resizeMode="contain"
//               />
//             </>
//           )}
//           {videoUri && (
//             <Text style={styles.info}>Selected Video: {videoUri}</Text>
//           )}
//           {thumbnailUri && (
//             <>
//               <Text style={styles.info}>Thumbnail:</Text>
//               <Image source={{uri: thumbnailUri}} style={styles.thumbnail} />
//             </>
//           )}
//         </View>

//         {/* Caption Input */}
//         <View style={styles.section}>
//           <TextInput
//             style={styles.captionInput}
//             placeholder="Write a caption..."
//             placeholderTextColor="#666"
//             multiline
//             value={postData.caption}
//             onChangeText={text =>
//               setPostData(prev => ({...prev, caption: text}))
//             }
//           />
//         </View>

//         {/* Categories */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Categories</Text>
//           <FlatList
//             data={postData.selectedCategories}
//             horizontal
//             renderItem={renderCategoryItem}
//             keyExtractor={item => item.id}
//             style={styles.categoryList}
//           />
//           <TouchableOpacity
//             style={styles.selectButton}
//             onPress={() => setCategoryModalVisible(true)}>
//             <Text style={styles.buttonText}>Select Categories</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Scheduling Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Schedule Post (Optional)</Text>
//           <View style={styles.scheduleContainer}>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showDatePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedDate}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={showTimePicker}>
//               <Text style={styles.dateText}>{dateTimeState.selectedTime}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Upload Button */}
//         <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//           <Text style={styles.uploadButtonText}>Upload Video</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Category Modal */}
//       <Modal visible={categoryModalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Categories</Text>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search categories"
//               value={postData.searchText}
//               onChangeText={text =>
//                 setPostData(prev => ({...prev, searchText: text}))
//               }
//             />
//             <FlatList
//               data={categories.filter(cat =>
//                 cat.name
//                   .toLowerCase()
//                   .includes(postData.searchText.toLowerCase()),
//               )}
//               renderItem={renderCategoryItem}
//               keyExtractor={item => item.id}
//               numColumns={2}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setCategoryModalVisible(false)}>
//               <Text style={styles.buttonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Date Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showDatePicker}
//         mode="date"
//         onConfirm={handleDateConfirm}
//         onCancel={hideDatePicker}
//         minimumDate={new Date()}
//       />

//       {/* Time Picker Modal */}
//       <DateTimePickerModal
//         isVisible={dateTimeState.showTimePicker}
//         mode="time"
//         onConfirm={handleTimeConfirm}
//         onCancel={hideTimePicker}
//       />
//       <Loader visible={loader} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     marginLeft: 16,
//     fontWeight: 'bold',
//   },
//   section: {
//     padding: 16,
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   selectButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   videoPreview: {
//     height: 200,
//     marginTop: 16,
//     backgroundColor: '#222',
//   },
//   captionInput: {
//     backgroundColor: '#222',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   categoryList: {
//     marginBottom: 12,
//   },
//   categoryItem: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 16,
//     marginRight: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedCategoryItem: {
//     backgroundColor: '#0066cc',
//   },
//   categoryText: {
//     color: 'white',
//   },
//   selectedText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   removeIcon: {
//     color: 'white',
//     marginLeft: 8,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flex: 0.48,
//   },
//   dateText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   uploadButton: {
//     backgroundColor: '#0066cc',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   modalContent: {
//     backgroundColor: '#222',
//     borderRadius: 16,
//     padding: 16,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   modalButton: {
//     backgroundColor: '#0066cc',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   dateButtonContainer: {
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: 48,
//   },
//   dateButtonText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   dateLabel: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   pickerModal: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   pickerContainer: {
//     backgroundColor: '#222',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   pickerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   pickerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pickerDoneButton: {
//     padding: 8,
//   },
//   pickerDoneText: {
//     color: '#0066cc',
//     fontSize: 16,
//   },
//   errorText: {
//     color: '#ff4444',
//     fontSize: 14,
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: 'white',
//     fontSize: 16,
//     marginTop: 12,
//   },
//   successOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successIcon: {
//     width: 80,
//     height: 80,
//     tintColor: '#4CAF50',
//     marginBottom: 16,
//   },
//   successText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   helperText: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },

//   info: {
//     marginVertical: 10,
//     textAlign: 'center',
//     color: 'red',
//   },
//   thumbnail: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//   },
//   video: {
//     width: 300,
//     height: 200,
//     marginTop: 10,
//   },
// });

// export default VideoUploader;

// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   ScrollView,
//   Modal,
//   Alert,
//   StyleSheet,
// } from 'react-native';
// import { Divider } from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Video from 'react-native-video';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import backendURL, { ADD_POST, UPLOAD_POST } from '../../../utils/Strings';
// import { useInstaContext } from '../../../context/InstaContext';

// const MAX_CATEGORIES = 3;

// const categories = [
//   { id: '1', name: 'Motivation' },
//   { id: '2', name: 'Gym' },
//   { id: '3', name: 'Sports' },
//   // ... other categories
// ];

// const VideoUploader = () => {
//   const navigation = useNavigation();
//   const { userToken } = useInstaContext();

//   // State management
//   const [postData, setPostData] = useState({
//     caption: '',
//     credit: '',
//     selectedVideo: null,
//     selectedCategories: [],
//     searchText: '',
//   });

//   const [scheduling, setScheduling] = useState({
//     date: 'Select date',
//     time: 'Select time',
//     isDatePickerVisible: false,
//     isTimePickerVisible: false,
//   });

//   const [categoryModalVisible, setCategoryModalVisible] = useState(false);
//   const [userData, setUserData] = useState({});

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post(`${backendURL}/userdata`, { token: userToken });
//         setUserData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         Alert.alert('Error', 'Failed to fetch user data');
//       }
//     };
//     fetchUserData();
//   }, [userToken]);

//   // Video picker
//   const pickVideo = async () => {
//     const options = {
//       mediaType: 'video',
//       selectionLimit: 1,
//     };

//     try {
//       const response = await launchImageLibrary(options);
//       if (response.assets?.[0]?.uri) {
//         setPostData(prev => ({
//           ...prev,
//           selectedVideo: response.assets[0].uri,
//         }));
//       }
//     } catch (error) {
//       console.error('Error picking video:', error);
//       Alert.alert('Error', 'Failed to pick video');
//     }
//   };

//   // Category handling
//   const handleSelectCategory = (category) => {
//     setPostData(prev => {
//       const isSelected = prev.selectedCategories.some(cat => cat.id === category.id);

//       if (isSelected) {
//         return {
//           ...prev,
//           selectedCategories: prev.selectedCategories.filter(cat => cat.id !== category.id),
//         };
//       }

//       if (prev.selectedCategories.length >= MAX_CATEGORIES) {
//         Alert.alert('Limit Reached', `Maximum ${MAX_CATEGORIES} categories allowed`);
//         return prev;
//       }

//       return {
//         ...prev,
//         selectedCategories: [...prev.selectedCategories, category],
//       };
//     });
//   };

//   // Upload handling
//   const handleUpload = async () => {
//     if (!postData.selectedVideo) {
//       Alert.alert('Error', 'Please select a video first');
//       return;
//     }

//     if (postData.selectedCategories.length === 0) {
//       setCategoryModalVisible(true);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: postData.selectedVideo,
//         type: 'video/mp4',
//         name: 'video.mp4',
//       });

//       // Upload video
//       const uploadResponse = await fetch(backendURL + UPLOAD_POST, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       if (!uploadResponse.ok) {
//         throw new Error('Video upload failed');
//       }

//       const { fileUrl } = await uploadResponse.json();

//       // Create post
//       await axios.post(backendURL + ADD_POST, {
//         userId: userData._id,
//         caption: postData.caption,
//         username: userData.username,
//         imageurl: fileUrl,
//         categories: postData.selectedCategories,
//         scheduledDate: scheduling.date !== 'Select date' ? scheduling.date : null,
//         scheduledTime: scheduling.time !== 'Select time' ? scheduling.time : null,
//       });

//       Alert.alert('Success', 'Video uploaded successfully');
//       navigation.navigate('BottomTab');
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Error', 'Failed to upload video');
//     }
//   };

//   // Date/Time picker handlers
//   const handleDateConfirm = (date) => {
//     const formattedDate = date.toISOString().split('T')[0];
//     setScheduling(prev => ({
//       ...prev,
//       date: formattedDate,
//       isDatePickerVisible: false,
//     }));
//   };

//   const handleTimeConfirm = (date) => {
//     const formattedTime = date.toLocaleTimeString();
//     setScheduling(prev => ({
//       ...prev,
//       time: formattedTime,
//       isTimePickerVisible: false,
//     }));
//   };

//   // Render methods
//   const renderCategoryItem = ({ item }) => {
//     const isSelected = postData.selectedCategories.some(cat => cat.id === item.id);
//     return (
//       <TouchableOpacity
//         style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
//         onPress={() => handleSelectCategory(item)}>
//         <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
//           {item.name}
//         </Text>
//         {isSelected && <Text style={styles.removeIcon}>✕</Text>}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={30} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Post</Text>
//       </View>
//       <Divider width={1} />

//       <ScrollView>
//         {/* Video Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Video</Text>
//           <TouchableOpacity style={styles.selectButton} onPress={pickVideo}>
//             <MaterialCommunityIcons name="video-plus" size={24} color="white" />
//             <Text style={styles.buttonText}>Choose Video</Text>
//           </TouchableOpacity>

//           {postData.selectedVideo && (
//             <Video
//               source={{ uri: postData.selectedVideo }}
//               style={styles.videoPreview}
//               controls
//               resizeMode="contain"
//             />
//           )}
//         </View>

//         {/* Caption Input */}
//         <View style={styles.section}>
//           <TextInput
//             style={styles.captionInput}
//             placeholder="Write a caption..."
//             placeholderTextColor="#666"
//             multiline
//             value={postData.caption}
//             onChangeText={(text) => setPostData(prev => ({ ...prev, caption: text }))}
//           />
//         </View>

//         {/* Categories */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Categories</Text>
//           <FlatList
//             data={postData.selectedCategories}
//             horizontal
//             renderItem={renderCategoryItem}
//             keyExtractor={item => item.id}
//             style={styles.categoryList}
//           />
//           <TouchableOpacity
//             style={styles.selectButton}
//             onPress={() => setCategoryModalVisible(true)}>
//             <Text style={styles.buttonText}>Select Categories</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Scheduling */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Schedule Post (Optional)</Text>
//           <View style={styles.scheduleContainer}>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => setScheduling(prev => ({ ...prev, isDatePickerVisible: true }))}>
//               <Text style={styles.dateText}>{scheduling.date}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => setScheduling(prev => ({ ...prev, isTimePickerVisible: true }))}>
//               <Text style={styles.dateText}>{scheduling.time}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Upload Button */}
//         <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//           <Text style={styles.uploadButtonText}>Upload Video</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Category Modal */}
//       <Modal
//         visible={categoryModalVisible}
//         transparent
//         animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Categories</Text>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search categories"
//               value={postData.searchText}
//               onChangeText={(text) => setPostData(prev => ({ ...prev, searchText: text }))}
//             />
//             <FlatList
//               data={categories.filter(cat =>
//                 cat.name.toLowerCase().includes(postData.searchText.toLowerCase())
//               )}
//               renderItem={renderCategoryItem}
//               keyExtractor={item => item.id}
//               numColumns={2}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setCategoryModalVisible(false)}>
//               <Text style={styles.buttonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Date/Time Pickers */}
//       <DateTimePickerModal
//         isVisible={scheduling.isDatePickerVisible}
//         mode="date"
//         onConfirm={handleDateConfirm}
//         onCancel={() => setScheduling(prev => ({ ...prev, isDatePickerVisible: false }))}
//       />
//       <DateTimePickerModal
//         isVisible={scheduling.isTimePickerVisible}
//         mode="time"
//         onConfirm={handleTimeConfirm}
//         onCancel={() => setScheduling(prev => ({ ...prev, isTimePickerVisible: false }))}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     marginLeft: 16,
//     fontWeight: 'bold',
//   },
//   section: {
//     padding: 16,
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 18,
//     marginBottom: 12,
//   },
//   selectButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   videoPreview: {
//     height: 200,
//     marginTop: 16,
//     backgroundColor: '#222',
//   },
//   captionInput: {
//     backgroundColor: '#222',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   categoryList: {
//     marginBottom: 12,
//   },
//   categoryItem: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 16,
//     marginRight: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedCategoryItem: {
//     backgroundColor: '#0066cc',
//   },
//   categoryText: {
//     color: 'white',
//   },
//   selectedText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   removeIcon: {
//     color: 'white',
//     marginLeft: 8,
//   },
//   scheduleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dateButton: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     flex: 0.48,
//   },
//   dateText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   uploadButton: {
//     backgroundColor: '#0066cc',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   modalContent: {
//     backgroundColor: '#222',
//     borderRadius: 16,
//     padding: 16,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   modalButton: {
//     backgroundColor: '#0066cc',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
// });

// export default VideoUploader;

// import {
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   ScrollView,
//   Modal,
//   Alert,
// } from 'react-native';
// import styles from './ReelStyle';
// import React, {useEffect, useState} from 'react';
// import {Divider} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import {useRoute} from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Video from 'react-native-video'; // For video playback
// import {launchImageLibrary} from 'react-native-image-picker';
// import backendURL, {ADD_POST, UPLOAD_POST} from '../../../utils/Strings';
// import {useInstaContext} from '../../../context/InstaContext';

// const categories = [
//   {id: '1', name: 'Motivation'},
//   {id: '2', name: 'Gym'},
//   {id: '3', name: 'Sports'},
//   {id: '4', name: 'Girls-Video'},
//   {id: '5', name: 'Boy-Atitude'},
//   {id: '6', name: 'Bhopury-Video'},
//   {id: '7', name: 'Shayari'},
//   {id: '8', name: 'Love-Music'},
//   {id: '9', name: 'Comedy'},
//   {id: '10', name: 'Food'},
//   {id: '11', name: 'Sports'},
//   {id: '12', name: 'Music'},
//   {id: '13', name: 'Movies'},
//   {id: '14', name: 'Tech'},
//   {id: '15', name: 'Travel'},
//   {id: '16', name: 'Food'},
//   {id: '17', name: 'Movies'},
//   {id: '18', name: 'Tech'},
//   {id: '19', name: 'Travel'},
//   {id: '20', name: 'Food'},
//   {id: '21', name: 'Sports'},
//   {id: '22', name: 'Music'},
//   {id: '23', name: 'Movies'},
//   {id: '24', name: 'Tech'},
//   {id: '25', name: 'Travel'},
//   {id: '26', name: 'Food'},
//   {id: '27', name: 'Movies'},
//   {id: '28', name: 'Tech'},
//   {id: '29', name: 'Travel'},
//   {id: '30', name: 'Food'},
//   // Add more categories as needed
// ];

// const DocumentSelecter = () => {
//   const navigation = useNavigation();
//   const [imgUrl, setImgUrl] = useState(
//     'https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png',
//   );

//   const params = useRoute().params;
//   const [fdata, setFdata] = useState({
//     caption: '',
//     creadit: '',
//   });
//   const [userData, setUserData] = useState({});
//   const {userToken} = useInstaContext();
//   async function getData() {
//     axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
//       setUserData(res.data.data);
//     });
//   }
//   useEffect(() => {
//     getData();
//   }, []);
//   // const VideoPost = () => {
//   //   Alert('Video Uploaded sucessfully');
//   //   navigation.navigate('NewPostScreen');
//   // };
//   const [loader, setloader] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   const pickVideo = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'video', // Only show videos
//         selectionLimit: 1, // Allow only one video to be selected
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('User cancelled video picker');
//         } else if (response.errorMessage) {
//           console.log('Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setSelectedVideo(response.assets[0].uri); // Set the video URI
//         }
//       },
//     );
//   };

//   // Function to upload the image file only
//   const uploadData = async () => {
//     if (!selectedVideo) {
//       Alert('Please select an image to upload.');
//       return;
//     }
//     setloader(true);
//     const formData = new FormData();
//     formData.append('file', {
//       uri: selectedVideo.uri,
//       name: selectedVideo.fileName,
//       type: selectedVideo.type || 'application/octet-stream',
//     });

//     try {
//       const response = await fetch(backendURL + UPLOAD_POST, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           // fetch will handle it automatically
//         },
//         body: formData, // Attach form data
//       });

//       // Check if response is OK (status 200)
//       if (!response.ok) {
//         const responseText = await response.text(); // Get raw response as text
//         console.error('Error response text:', responseText); // Log the raw response
//         alert('Upload failed: ' + responseText); // Display the error in an alert
//         return;
//       }

//       const responseData = await response.json();
//       console.log('Upload response:', responseData);
//       setloader(false);
//       // alert('Upload successful!');

//       const addPostObj = {
//         userId: userData._id,
//         caption: fdata.caption,
//         username: userData.username,
//         imageurl: responseData.fileUrl,
//       };

//       // console.log(addPostObj);

//       // const response1 = await fetch(backendURL + ADD_POST, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'appplication/json',
//       //     // fetch will handle it automatically
//       //   },
//       //   body: JSON.stringify(addPostObj), // Attach form data
//       // });

//       const response1 = await axios.post(backendURL + ADD_POST, addPostObj);


//       navigation.navigate('BottomTab');
//     } catch (error) {
//       console.error('Error uploading:', error);
//       Alert('Upload failed!');
//     }
//   };

//   // date nad time picker

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('Select date');
//   const [selectedTime, setSelectedTime] = useState('Select time');

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleDateConfirm = date => {
//     console.warn('A date has been picked: ', date);
//     const dt = new Date(date);
//     const x = dt.toISOString().split('T');
//     const x1 = x[0].split('_');
//     // console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
//     setSelectedDate(x1[0]);
//     hideDatePicker();
//   };

//   const showTimePicker = () => {
//     setTimePickerVisibility(true);
//   };

//   const hideTimePicker = () => {
//     setTimePickerVisibility(false);
//   };

//   const handleTimeConfirm = date => {
//     console.warn('A Time has been picked: ', date);
//     const dt = new Date(date);
//     const x = dt.toLocaleTimeString();
//     setSelectedTime(x);
//     hideTimePicker();
//   };

//   //##########################
//   //for chose category code box
//   //##########################

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const MAX_SELECTION = 3; // Set the limit to 4 categories

//   // Filter categories based on search text
//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   const handleSelectCategory = category => {
//     if (selectedCategories.some(item => item.id === category.id)) {
//       // Remove category if it's already selected
//       setSelectedCategories(prev =>
//         prev.filter(item => item.id !== category.id),
//       );
//     } else {
//       // Check if selection limit is reached
//       if (selectedCategories.length < MAX_SELECTION) {
//         setSelectedCategories(prev => [...prev, category]);
//       } else {
//         Alert.alert(
//           'Selection Limit',
//           `You can only select up to ${MAX_SELECTION} categories.`,
//         );
//       }
//     }
//   };

//   const renderCategory = ({item}) => {
//     const isSelected = selectedCategories.some(cat => cat.id === item.id);
//     return (
//       <TouchableOpacity
//         style={[
//           styles.categoryItem,
//           isSelected ? styles.selectedCategoryItem : null,
//         ]}
//         onPress={() => handleSelectCategory(item)}>
//         <Text style={isSelected ? styles.selectedText : styles.categoryText}>
//           {item.name}
//         </Text>
//         {isSelected ? (
//           <Text style={{color: 'white', marginLeft: 10}}>X</Text>
//         ) : null}
//       </TouchableOpacity>
//     );
//   };

//   const renderTopCategorySelected = ({item}) => {
//     const isSelected = selectedCategories.some(cat => cat.id === item.id);
//     return (
//       <View style={{height: 65}}>
//         <TouchableOpacity
//           style={[
//             styles.categoryItemTop,
//             isSelected ? styles.selectedCategoryItemTop : null,
//           ]}
//           onPress={() => handleSelectCategory(item)}>
//           <Text style={isSelected ? styles.selectedText : styles.categoryText}>
//             {item.name}
//           </Text>
//           {isSelected ? (
//             <Text style={{color: 'white', marginLeft: 10}}>X</Text>
//           ) : null}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   //open category box
//   const postAction = () => {
//     setloader(true);
//   };

//   function renderModel() {
//     return (
//       <Modal transparent={true} visible={loader}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'rgba(0,0,0,0.8)',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <View
//             style={{
//               width: '95%',
//               height: 600,
//               backgroundColor: 'white',
//               position: 'absolute',
//               borderRadius: 20,
//               margin: 10,
//             }}>
//             <View
//               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//               <View>
//                 <Text style={styles.left1}>Choose Currect Category</Text>
//               </View>
//               <View>
//                 <TouchableOpacity
//                   style={styles.right1}
//                   onPress={() => setloader(false)}>
//                   <MaterialIcons name="done" size={30} color="black" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.container123}>
//               {/* <ScrollView> */}
//               <Text
//                 style={{
//                   fontSize: 25,
//                   color: 'green',
//                   alignSelf: 'center',
//                   margin: 20,
//                 }}>
//                 Choose Category for video{' '}
//               </Text>
//               Search Input
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search categories"
//                 placeholderTextColor={'black'}
//                 value={searchText}
//                 onChangeText={setSearchText}
//               />
//               Display Selected Categories at the Top
//               <FlatList
//                 data={selectedCategories}
//                 keyExtractor={item => item.id}
//                 horizontal
//                 renderItem={renderTopCategorySelected}
//                 contentContainerStyle={styles.categoryList}
//               />
//               Display Filtered Categories
//               {/* <View style={styles.categoriesContainer}>
//                 {filteredCategories.map(item => renderCategory({item, index}))}
//               </View> */}
//               <View style={styles.categoriesContainer}>
//                 {filteredCategories.map((item, index) =>
//                   renderCategory({item, index}),
//                 )}
//               </View>
//               {/* </ScrollView> */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons
//             name="chevron-back"
//             size={30}
//             color="white"
//             style={{marginLeft: 10}}
//           />
//         </TouchableOpacity>
//         <Text style={styles.hederText}>New Post</Text>
//       </View>
//       <Divider
//         width={5}
//         orientation="vertical"
//         style={{color: 'white', marginBottom: 10}}
//       />
//       <ScrollView>
//         <Text
//           style={styles.videototitle}>
//           Video Photo
//         </Text>
//         <View>
//           <Text style={styles.title}>Video Selector</Text>
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TouchableOpacity
//               style={styles.btncan}
//               // onPress={handleDocumentSelection}
//               onPress={pickVideo}>
//               <MaterialCommunityIcons
//                 name="view-gallery-outline"
//                 size={25}
//                 color="black"
//               />
//               <Text style={{color: 'black', marginLeft: 10}}>Select Video</Text>
//             </TouchableOpacity>
//           </View>
//           {selectedVideo && (
//             <Video
//               source={{uri: selectedVideo}}
//               style={styles.video}
//               controls // Native controls
//               resizeMode="contain"
//             />
//           )}
//         </View>

//         <View style={styles.captionbox}>
//           <TextInput
//             placeholder="Enter your Caption"
//             placeholderTextColor="black"
//             numberOfLines={3}
//             multiline={true}
//             onChangeText={text => setFdata({...fdata, caption: text})}
//           />
//         </View>

//         <View style={{marginHorizontal: 15}}>
//           <Text
//             style={styles.ctitle}>
//             If you used another creater clip then you can give creadit to
//             him/her
//           </Text>
//           <View style={styles.craditbox}>
//             <Text style={{color: 'gray', fontSize: 20, marginTop: 6}}>@</Text>
//             <TextInput
//               placeholder="Creadit creater name !"
//               placeholderTextColor="green"
//               onChangeText={text => setFdata({...fdata, creadit: text})}
//             />
//           </View>
//         </View>

//         {/* Display Selected Categories at the Top */}
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 20,
//           }}>
//           <FlatList
//             data={selectedCategories}
//             keyExtractor={item => item.id}
//             horizontal
//             renderItem={renderTopCategorySelected}
//             contentContainerStyle={styles.categoryList}
//           />

//           <TouchableOpacity
//             onPress={() => {
//               postAction();
//             }}
//             style={styles.vcat}>
//             <Text style={{color: 'white', fontSize: 18, alignSelf: 'center'}}>
//               Chose your Video Category
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View>
//           <Text
//             style={styles.ptitle}>
//             For Post Schedule Pick Date and Time{' '}
//             <Text style={{color: 'green'}}>( Optional)</Text>
//           </Text>

//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TouchableOpacity
//               style={styles.dtpicker}
//               onPress={() => {
//                 showDatePicker();
//               }}>
//               <Text style={{color:'white'}}>{selectedDate}</Text>
//               <Text style={{color:'white'}}>
//                 {selectedDate == 'Select date' ? null : 'change date'}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dtpicker}
//               onPress={() => {
//                 showTimePicker();
//               }}>
//               <Text style={{color:'white'}} >{selectedTime}</Text>
//               <Text style={{color:'white'}} >
//                 {selectedTime == 'Select time' ? null : 'change time'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.btncanPublic} onPress={uploadData}>
//           <Text style={{color: 'white', fontSize: 18}}>Publick</Text>
//         </TouchableOpacity>
//       </ScrollView>
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleDateConfirm}
//         onCancel={hideDatePicker}
//       />
//       <DateTimePickerModal
//         isVisible={isTimePickerVisible}
//         mode="time"
//         onConfirm={handleTimeConfirm}
//         onCancel={hideTimePicker}
//       />
//       {renderModel()}
//     </View>
//   );
// };

// export default DocumentSelecter;





      // thumbnill work ##########
      // console.log("image thumb photo => ", thumbnailUri)
      // const formDatathumb = new FormData();
      // formDatathumb.append('file', {
      //   uri: thumbnailUri,
      //   name: thumbnailUri.fileName,
      //   type: thumbnailUri.type || 'application/octet-stream',
      // });
      // // thumbnill work end #######
      // console.log('public btn 6');
      // thumbill start ##################


      // const response = await fetch(backendURL + UPLOAD_POST, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     // fetch will handle it automatically
      //   },
      //   body: formDatathumb, // Attach form data
      // });

      // console.log("response photo =>  ", response)
      // // Check if response is OK (status 200)
      // if (!response.ok) {
      //   const responseText = await response.text(); // Get raw response as text
      //   console.error('Error response text:', responseText); // Log the raw response
      //   alert('Upload failed: ' + responseText); // Display the error in an alert
      //   return;
      // }

      // const responseThumbData = await response.json();
      // console.log('Upload response:', responseThumbData);
      // setLoader(false);
      // // alert('Upload successful!');
      // console.log("response thumb data", responseThumbData)

      // thumbill end ##################