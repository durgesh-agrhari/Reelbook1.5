import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SportsReel from './SportsReel';

const ReelBottomTab = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <SportsReel />

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
          <View style={[styles.button, styles.homeButton]}>
            <Text style={styles.buttonText}>Back To Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('VideoCategoryPage')}>
          <View style={[styles.button, styles.categoryButton]}>
            <Text style={styles.buttonText}>Back To Category 2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReelBottomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1f211f',
    height: 50,
    marginBottom:10,
  },
  button: {
    borderRadius: 5,
    padding: 9,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: 'gray',
  },
  homeButton: {
    borderColor: 'red',
    borderWidth: 2,
  },
  categoryButton: {
    borderColor: 'green',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import React from 'react';

// import {useNavigation} from '@react-navigation/native';
// import SportsReel from './SportsReel';

// const Sports = () => {
//   const navigation = useNavigation();
//   return (
//     <View>
//       <SportsReel />

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           alignItems: 'center',
//           backgroundColor: '#1f211f',
//           height: 50,
//         }}>
//         <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
//           <View
//             style={{
//               backgroundColor: 'gray',
//               borderRadius: 5,
//               padding: 9,
//               paddingLeft: 50,
//               paddingRight: 50,
//               borderColor: 'red',
//               borderWidth: 2,
//             }}>
//             <Text>Back To Home</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('VideoCategoryPage')}>
//           <View
//             style={{
//               backgroundColor: 'gray',
//               borderRadius: 5,
//               padding: 9,
//               paddingLeft: 50,
//               paddingRight: 50,
//               borderColor: 'green',
//               borderWidth: 2,
//             }}>
//             <Text>Back To Category</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Sports;

// const styles = StyleSheet.create({});
