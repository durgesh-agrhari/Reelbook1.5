import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import styles1 from './stylesProfileEdit';
import {useInstaContext} from '../../context/InstaContext';
import backendURL, {UPDATER_USER, UPLOAD_POST} from '../../utils/Strings';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
const img =
  'https://i.pinimg.com/736x/5a/6b/16/5a6b16956a2753892d9ee5714f6f112a.jpg';

const EditProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState('');
  const THEME  = useSelector(state=>state.theme)


  const {userData} = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState(null);
  const [isCoverEditable, setIsCoverEditable] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const openGallery = async type => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (!res.didCancel) {
      if (type == 'cover') {
        setCover(res.assets[0].uri);
        setImageData(res);
        setIsCoverEditable(true);
        setIsProfileEditable(false);
      } else if ('profile') {
        setProfile(res.assets[0].uri);
        setImageData(res);
        setIsProfileEditable(true);
        setIsCoverEditable(false);
      }
    }
  };
  const [gender, setGender] = useState(userData.gender);
  const [upname, setUpname] = useState(userData.name);
  const [upusername, setUpusername] = useState(userData.username);
  const [upbio, setUpbio] = useState(userData?.bio);
  const [upmobilenumber, setUpmobilenumber] = useState(userData.mobile);
  const [upemail, setUpemail] = useState(userData.email);
  const [upbod, setUpbod] = useState(userData.bod);

  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully!', ToastAndroid.SHORT);
  };

  // for file base
  const uploadImage = async () => {
    // const reference = storage().ref(imageData.assets[0].fileName);
    // const pathToFile = imageData.assets[0].uri;
    // await reference.putFile(pathToFile);
    // url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
    // if (isProfileEditable) {
    //   updateProfilePick(url);
    // } else {
    //   updateCoverPick(url);
    // }
  };

  const updateProfilePick = url => {
    var myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      profilePic: url,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeders,
      body: raw,
      redirect: 'follow',
    };
    fetch(backendURL + UPDATER_USER + '/' + userData._id, requestOptions)
      .then(response => response.text())
      .then(result => {
        setImageData(null);
        setProfile('');
        setIsProfileEditable(false);
        setIsCoverEditable(false);
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };

  const updateCoverPick = url => {
    var myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      coverPic: url,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeders,
      body: raw,
      redirect: 'follow',
    };
    fetch(backendURL + UPDATER_USER + '/' + userData._id, requestOptions)
      .then(response => response.text())
      .then(result => {
        setImageData(null);
        setCover('');
        setIsProfileEditable(false);
        setIsCoverEditable(false);
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };

  //update user profile
  const updateUserdata = () => {
    var myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: upname,
      username: upusername,
      bio: upbio,
      mobile: upmobilenumber,
      email: upemail,
      bod: upbod,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeders,
      body: raw,
      redirect: 'follow',
    };
    fetch(backendURL + UPDATER_USER + '/' + userData._id, requestOptions)
      .then(response => response.text())
      .then(result => {
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };

  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);

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

  //for profile pick galary
  const pickprofilePick = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (!response.didCancel && !response.error && response.assets) {
          setProfile(response.assets[0]); // Save selected image
        }
      },
    );
  };

  // Function to upload the image file only profilepick
  const uploadDataCover = async () => {
    setLoading(true)
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

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
      setLoading(false)
      console.log('Upload response:', responseData);
      alert('Upload profile successful!');

      var myHeders = new Headers();
      myHeders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        coverPic: responseData.fileUrl,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeders,
        body: raw,
        redirect: 'follow',
      };
      fetch(backendURL + UPDATER_USER + '/' + userData._id, requestOptions)
        .then(response => response.text())
        .then(result => {
          navigation.goBack();
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error('Error uploading:', error);
      setLoading(false)
      alert('Upload failed!');
    }
  };

  // Function to upload the image file only coverpick
  const uploadDataProfile = async () => {
    setLoading(true)
    if (!profile) {
      alert('Please select an cover pick to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', {
      uri: profile.uri,
      name: profile.fileName,
      type: profile.type || 'application/octet-stream',
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
      setLoading(false)
      console.log('Upload response:', responseData);
      alert('Upload coverpick successful!');

      var myHeders = new Headers();
      myHeders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        profilePic: responseData.fileUrl,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeders,
        body: raw,
        redirect: 'follow',
      };
      fetch(backendURL + UPDATER_USER + '/' + userData._id, requestOptions)
        .then(response => response.text())
        .then(result => {
          navigation.goBack();
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error('Error uploading:', error);
      setLoading(false)
      alert('Upload failed!');
    }
  };

  return (
    <View style={[styles.container,{backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'}]}>
      <View style={styles.editBox}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>
              <Icon name="close-outline" style={[styles.iconClose,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]} />
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Edit Profile</Text>
          {/* <TouchableOpacity
            onPress={() => {
              TostMessage();
            }}>
            <Text>
              <Icon name="checkmark" style={styles.iconCheck} />
            </Text>
          </TouchableOpacity> */}
        </View>
        <ScrollView>
          <View style={styles.imageBox}>
            {image != null ? (
              <Image source={{uri: image?.uri}} style={styles.headerImage} />
            ) : (
              <Image
                style={styles.headerImage}
                source={{uri: userData?.coverPic}}
              />
            )}

            <TouchableOpacity
              style={styles.iconEditHeader}
              onPress={() => {
                // openGallery('cover');
                pickImage();
              }}>
              <MaterialIcons name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.profilePicContainer}>
            <View>
              {profile != null ? (
                <Image source={{uri: profile?.uri}} style={styles.profilePic} />
              ) : (
                <Image
                  style={styles.profilePic}
                  source={{uri: userData?.profilePic}}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  pickprofilePick();
                }}>
                <MaterialIcons name="edit" style={styles.iconEditProfilePic} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.usernameContainer}>
            <Text style={[styles.usernameText ,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>{userData?.name}</Text>
          </View>
          {/* <TouchableOpacity
            style={styles.uploadCoverEdit}
            onPress={() => {
              uploadDataCover();
              uploadDataProfile();
            }}>
            <Text style={styles.txtcoveredit}>Update</Text>
          </TouchableOpacity> */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View>
              {image && (
                <TouchableOpacity
                  style={styles.uploadCoverEdit}
                  onPress={() => {
                    uploadDataCover();
                  }}>
                  <Text style={styles.txtcoveredit}>Update Coverpic</Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              {profile && (
                <TouchableOpacity
                  style={styles.uploadProfileEdit}
                  onPress={() => {
                    uploadDataProfile();
                  }}>
                  <Text style={styles.txtcoveredit}>Update Profile</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={styles.usernameText1}>Edit other details</Text>

          <View style={styles.inputContainer}>
            <View>
              <Text style={[styles.label,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Name</Text>
              <TextInput
                placeholder="Edit your name"
                defaultValue={userData?.name}
                // value={upname}
                onChangeText={txt => setUpname(txt)}
                placeholderTextColor="gray"
                style={[styles.textInput,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}
              />
              {/* <CustomTextInput /> */}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Username</Text>
              <TextInput
                placeholder="Edit your username"
                defaultValue={userData?.username}
                // value={upusername}
                onChangeText={txt => setUpusername(txt)}
                placeholderTextColor="gray"
                style={[styles.textInput,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.label,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Bio</Text>
              <TextInput
                placeholder="Add your bio"
                defaultValue={userData?.bio}
                // value={upbio}
                onChangeText={txt => setUpbio(txt)}
                placeholderTextColor="gray"
                numberOfLines={2}
                multiline={true}
                style={[styles.textInput,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Mobile Number</Text>
              <TextInput
                placeholder="Add mobile number"
                defaultValue={userData?.mobile}
                // value={upmobilenumber}
                onChangeText={txt => setUpmobilenumber(txt)}
                placeholderTextColor="gray"
                style={[styles.textInput,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}
                // keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Email Id </Text>
              <TextInput
                placeholder="Edit your email"
                defaultValue={userData?.email}
                // value={upemail}
                onChangeText={txt => setUpemail(txt)}
                placeholderTextColor="gray"
                style={[styles.textInput,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>Birthday 🎂</Text>
              <TextInput
                placeholder="Add your birthday"
                defaultValue={userData?.bod}
                // value={upbod}
                onChangeText={txt => setUpbod(txt)}
                placeholderTextColor="gray"
                style={[styles.textInput,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}
              />
            </View>

            {/* <View style={styles1.infoEditView}>
              <Text style={[styles1.infoEditFirst_text, styles.genderLabel]}>
                Gender
              </Text>

              <View style={styles.genderContainer}>
                <View style={styles1.radioView}>
                  <Text style={[styles1.radioText, styles.radioText]}>
                    Male
                  </Text>
                  <RadioButton
                    value="Male"
                    status={gender === 'Male' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setGender('Male');
                    }}
                  />
                </View>

                <View style={styles1.radioView}>
                  <Text style={[styles1.radioText, styles.radioText]}>
                    Female
                  </Text>
                  <RadioButton
                    value="Female"
                    status={gender === 'Female' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setGender('Female');
                    }}
                  />
                </View>
              </View>
            </View> */}
          </View>
          <TouchableOpacity
            style={[
              styles.uploadProfileEdit,
              {marginTop: 30, marginBottom: 20},
            ]}
            onPress={() => {
              updateUserdata();
            }}>
            <Text style={styles.txtcoveredit}>Update Profile</Text>
          </TouchableOpacity>
         <Loader visible={loading} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  editBox: {
    marginTop: 5,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  iconClose: {
    fontSize: 35,
    color: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  iconCheck: {
    fontSize: 35,
    color: '#3493D9',
  },
  imageBox: {
    backgroundColor: 'blue',
    borderBottomColor: 'green',
    borderWidth: 4,
    borderRadius: 15,
    width: '100%',
  },
  headerImage: {
    height: 140,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 4,
    backgroundColor: 'gray',
    // zIndex: 1,
  },
  iconEditHeader: {
    width: 40,
    fontSize: 30,
    color: 'white',
    marginTop: -90,
    zIndex: 1,
    backgroundColor: 'green',
    left: 10,
    borderRadius: 100,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  profilePicContainer: {
    flexDirection: 'row',
    marginTop: -60,
    zIndex: 1,
    alignSelf: 'center',
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 60,
    borderColor: 'green',
    borderWidth: 4,
    backgroundColor: 'gray',
  },
  iconEditProfilePic: {
    width: 40,
    fontSize: 30,
    color: 'white',
    marginTop: -90,
    zIndex: 1,
    backgroundColor: 'green',
    left: -10,
    borderRadius: 100,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 2,
  },
  usernameContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignSelf: 'center',
  },
  usernameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  usernameText1: {
    color: 'green',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    alignSelf: 'center',
  },
  textWhite: {
    color: 'white',
  },
  inputContainer: {
    padding: 10,
  },
  label: {
    color: 'white',
    opacity: 0.8,
  },
  textInput: {
    color: 'white',
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
  },
  inputGroup: {
    paddingVertical: 10,
  },
  genderLabel: {
    color: 'white',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    color: 'white',
  },
  uploadCoverEdit: {
    width: 170,
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  uploadProfileEdit: {
    width: 170,
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  txtcoveredit: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
