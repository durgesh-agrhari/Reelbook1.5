import React, {useState} from 'react';
import {Button, View, Text, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // For picking an image
import backendURL, {UPLOAD_POST} from '../../../utils/Strings';

const FormDataUploadExample = () => {
  const [image, setImage] = useState(null);

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

    const formData = new FormData();
    // console.log(image);
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
      console.log('Upload response:', responseData);
      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed!');
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text>Upload Image</Text>

      <Button title="Pick Image" onPress={pickImage} />

      {image && (
        <Image
          source={{uri: image.uri}}
          style={{width: 200, height: 200, marginTop: 10}}
        />
      )}

      <Button title="Upload Image" onPress={uploadData} />
    </View>
  );
};

export default FormDataUploadExample;

// import React, {useState} from 'react';
// import {Button, View, Text, Image} from 'react-native';
// import * as ImagePicker from 'react-native-image-picker'; // For picking an image
// import backendURL, {UPLOAD_POST} from '../../../utils/Strings';

// const FormDataUploadExample = () => {
//   const [image, setImage] = useState(null);

//   // Function to handle image picking
//   const pickImage = () => {
//     ImagePicker.launchImageLibrary(
//       {
//         mediaType: 'photo',
//       },
//       response => {
//         if (!response.didCancel && !response.error && response.assets) {
//           setImage(response.assets[0]); // Save selected image
//         }
//       },
//     );
//   };

//   // Function to upload the image file only
//   const uploadData = async () => {
//     if (!image) {
//       alert('Please select an image to upload.');
//       return;
//     }

//     console.log('image => ', image);

//     // Prepare the FormData for image upload
//     const formData = new FormData();
//     formData.append('image', {
//       uri: image.uri, // Image file path
//       type: image.type, // e.g., 'image/jpeg'
//       name: image.fileName, // Name of the file
//     });

//     try {
//       const response = await fetch(backendURL + UPLOAD_POST, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data', // Important for FormData
//         },
//         body: formData, // Attach form data
//       });

//       const responseData = await response.json();
//       console.log('Upload response:', responseData);
//       alert('Upload successful!');
//     } catch (error) {
//       console.error('Error uploading: => ', error);
//       alert('Upload failed!');
//     }
//   };

//   return (
//     <View style={{padding: 20}}>
//       <Text>Upload Image</Text>

//       <Button title="Pick Image" onPress={pickImage} />

//       {image && (
//         <Image
//           source={{uri: image.uri}}
//           style={{width: 200, height: 200, marginTop: 10}}
//         />
//       )}

//       <Button title="Upload Image" onPress={uploadData} />
//     </View>
//   );
// };

// export default FormDataUploadExample;

// import React, {useState} from 'react';
// import {Button, View, Text, Image, TextInput} from 'react-native';
// import * as ImagePicker from 'react-native-image-picker'; // For picking an image
// import backendURL, {UPLOAD_POST} from '../../../utils/Strings';

// const FormDataUploadExample = () => {
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   // Function to handle image picking
//   const pickImage = () => {
//     ImagePicker.launchImageLibrary(
//       {
//         mediaType: 'photo',
//       },
//       response => {
//         if (!response.didCancel && !response.error && response.assets) {
//           setImage(response.assets[0]); // Save selected image
//         }
//       },
//     );
//   };

//   // Function to upload data
//   const uploadData = async () => {
//     if (!image || !name || !email) {
//       alert('Please complete the form.');
//       return;
//     }

//     console.log('namae => ', name);
//     console.log('email => ', email);
//     console.log('image => ', image);

//     // Prepare the FormData
//     const formData = new FormData();
//     formData.append('name', name); // Add name field
//     formData.append('email', email); // Add email field
//     formData.append('image', {
//       uri: image.uri, // Image file path
//       type: image.type, // e.g., 'image/jpeg'
//       name: image.fileName, // Name of the file
//     });
//     // console.log(image.uri);
//     try {
//       const response = await fetch(backendURL + UPLOAD_POST, {
//         method: 'POST',
//         headers: {
//           // 'Content-Type': 'multipart/form-data', // Important for FormData
//         },
//         body: formData, // Attach form data
//       });

//       const responseData = await response.json();
//       console.log('Upload response:', responseData);
//       alert('Upload successful!');
//     } catch (error) {
//       console.error('Error uploading:', error);
//       alert('Upload failed!');
//     }
//   };

//   return (
//     <View style={{padding: 20}}>
//       <Text>Upload Image and Data</Text>

//       <TextInput
//         placeholder="Enter your name"
//         placeholderTextColor="red"
//         value={name}
//         onChangeText={setName}
//         style={{borderWidth: 1, marginBottom: 10, padding: 10, color: 'white'}}
//       />

//       <TextInput
//         placeholder="Enter your email"
//         placeholderTextColor="red"
//         value={email}
//         onChangeText={setEmail}
//         style={{borderWidth: 1, marginBottom: 10, padding: 10, color: 'white'}}
//       />

//       <Button title="Pick Image" onPress={pickImage} />

//       {image && (
//         <Image
//           source={{uri: image.uri}}
//           style={{width: 200, height: 200, marginTop: 10}}
//         />
//       )}

//       <Button title="Upload Data" onPress={uploadData} />
//     </View>
//   );
// };

// export default FormDataUploadExample;
