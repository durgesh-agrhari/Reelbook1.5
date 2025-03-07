import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { createThumbnail } from "react-native-create-thumbnail";
import Video from "react-native-video";

const VideoThumbnill = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [thumbnailUri, setThumbnailUri] = useState(null);

  const selectVideo = () => {
    const options = {
      mediaType: "video",
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled video picker");
      } else if (response.errorCode) {
        console.log("Error picking video: ", response.errorMessage);
        Alert.alert("Error", response.errorMessage);
      } else {
        const selectedVideo = response.assets[0];
        setVideoUri(selectedVideo.uri);
        generateThumbnail(selectedVideo.uri);
      }
    });
  };

  const generateThumbnail = async (videoUri) => {
    try {
      const thumbnail = await createThumbnail({
        url: videoUri,
        timeStamp: 1000, // Time in milliseconds to capture the thumbnail
      });
      setThumbnailUri(thumbnail.path);
    } catch (error) {
      console.error("Error generating thumbnail: ", error);
      Alert.alert("Error", "Failed to generate thumbnail.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Picker & Thumbnail Generator</Text>
      <Button title="Select Video" onPress={selectVideo} />
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
      {thumbnailUri && (
        <>
          <Text style={styles.info}>Thumbnail:</Text>
          <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    marginVertical: 10,
    textAlign: "center",
  },
  video: {
    width: 300,
    height: 200,
    marginTop: 10,
  },
  thumbnail: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default VideoThumbnill;



// import React, { useState } from "react";
// import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import { createThumbnail } from "react-native-create-thumbnail";

// const VideoThumbnill = () => {
//   const [videoUri, setVideoUri] = useState(null);
//   const [thumbnailUri, setThumbnailUri] = useState(null);

//   const selectVideo = () => {
//     const options = {
//       mediaType: "video",
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled video picker");
//       } else if (response.errorCode) {
//         console.log("Error picking video: ", response.errorMessage);
//         Alert.alert("Error", response.errorMessage);
//       } else {
//         const selectedVideo = response.assets[0];
//         setVideoUri(selectedVideo.uri);
//         generateThumbnail(selectedVideo.uri);
//       }
//     });
//   };

//   const generateThumbnail = async (videoUri) => {
//     try {
//       const thumbnail = await createThumbnail({
//         url: videoUri,
//         timeStamp: 1000, // Time in milliseconds to capture the thumbnail
//       });
//       setThumbnailUri(thumbnail.path);
//     } catch (error) {
//       console.error("Error generating thumbnail: ", error);
//       Alert.alert("Error", "Failed to generate thumbnail.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Video Picker & Thumbnail Generator</Text>
//       <Button title="Select Video" onPress={selectVideo} />
//       {videoUri && <Text style={styles.info}>Selected Video: {videoUri}</Text>}
//       {thumbnailUri && (
//         <>
//           <Text style={styles.info}>Thumbnail:</Text>
//           <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   info: {
//     marginVertical: 10,
//     textAlign: "center",
//   },
//   thumbnail: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//   },
// });

// export default VideoThumbnill;
