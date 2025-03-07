import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import backendURL, { GET_All_Users } from '../../utils/Strings';
import StoryUsers from './StoryUsers';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


const Stories = () => {
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector(s => s.auth);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backendURL}${GET_All_Users}`);
      const data = await response.json();
      if (userData) {
        let updatedData = [];
        const findCurrentUser = data?.data.find(item => item._id == userData._id);
        if (findCurrentUser) {
          updatedData.push(findCurrentUser);
        }
        const filterUsers = data?.data.filter(item => item._id !== userData._id);
        updatedData = [...updatedData, ...filterUsers];
        setUsers(updatedData);
      } else {
        setUsers(data?.data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(({ item }) => <StoryUsers item={item} />, []);

  return (
    <View>
      {loading ? (
        // <ActivityIndicator size="large" color="green" style={styles.loader} />
        <View style={{
          flexDirection: 'row', marginTop: 10, gap: 22, justifyContent: 'center',
          alignItems: 'center', marginBottom: 20
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ShimmerPlaceHolder style={{ width: 70, height: 70, borderRadius: 50, }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder style={{ width: 45, height: 10, borderRadius: 5, marginTop: 5 }} shimmerColors={['#53575c', '#8e8e8e', '#53575c']}>
            </ShimmerPlaceHolder>
          </View>

        </View>

      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5} // Optimizes initial rendering
          maxToRenderPerBatch={5} // Optimizes batch rendering
          windowSize={3} // Improves performance by limiting the number of rendered items
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Stories;



// import React, {useEffect, useState, useCallback} from 'react';
// import {View, FlatList, StyleSheet} from 'react-native';
// import {useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import backendURL, {GET_All_Users} from '../../utils/Strings';
// import StoryUsers from './StoryUsers';

// const Stories = () => {
//   const THEME = useSelector(state => state.theme);
//   const navigation = useNavigation();
//   const [users, setUsers] = useState([]);
//   const {userData} = useSelector(s => s.auth);
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(`${backendURL}${GET_All_Users}`);
//       const data = await response.json();
//       if(userData){
//         let updatedData=[]
//         const findCurrentUser=data?.data.find((item)=>item._id == userData._id)
//         if(findCurrentUser){
//           updatedData.push(findCurrentUser)
//         }
//         const filterUsers=data?.data.filter((item)=>item._id !== userData._id)
//         updatedData=[...updatedData,...filterUsers]
//         setUsers(updatedData)
//       }else{
//         setUsers(data?.data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const renderItem = useCallback(({item}) => <StoryUsers item={item} />, []);

//   return (
//     <View>
//       <FlatList
//         data={users}
//         keyExtractor={item => item._id}
//         renderItem={renderItem}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         initialNumToRender={5} // Optimizes initial rendering
//         maxToRenderPerBatch={5} // Optimizes batch rendering
//         windowSize={3} // Improves performance by limiting the number of rendered items
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default Stories;

// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// // import {users} from '../../data/users';
// import {useNavigation} from '@react-navigation/native';
// // import Entypo from 'react-native-vector-icons/Entypo';
// import {useSelector} from 'react-redux';
// import backendURL, {GET_All_Users} from '../../utils/Strings';
// import StoryUsers from './StoryUsers';
// // import { date } from 'yup'

// const Stories = () => {
//   const THEME = useSelector(state => state.theme);
//   const navigation = useNavigation();

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(`${backendURL}${GET_All_Users}`);
//       const data = await response.json();
//       setUsers(data?.data || []);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   return (
//     <View>
//       {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
//       <FlatList
//         data={users}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => <StoryUsers item={item} key={item?._id} />}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   story: {
//     width: 90,
//     height: 90,
//     borderRadius: 50,
//     marginLeft: 3,
//     marginBottom: 5,
//     borderWidth: 2.5,
//     borderColor: '#5536ba',
//     resizeMode: 'cover',
//     marginTop: 4,
//     padding: 10,
//   },
//   storyinner: {
//     width: 102,
//     height: 102,
//     borderRadius: 50,
//     borderWidth: 2.5,
//     borderColor: '#5536ba',
//     resizeMode: 'cover',
//     marginTop: 10,
//     paddingBottom: 5,
//   },
// });

// export default Stories;

{
  /* {users.map((story, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('AnimationStory', {
                name: story.name,
                image: story.image,
              })
              
            }
            >
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 6,
                position: 'relative',
              }}>
              {story.id == 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 40,
                    zIndex: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.push('StoryPost')}>
                    <Entypo
                      name="circle-with-plus"
                      style={{
                        fontSize: 25,
                        color: '#2596be',
                        backgroundColor: 'white',
                        borderRadius: 100,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : (<View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 32,
                  zIndex: 1,
                }}>
                <TouchableOpacity>
                  <Image source={{uri:story.profileimg}} 
                  style={{
                    width:50, 
                    height:50, 
                    borderRadius:50, 
                    borderColor:'#5536ba', 
                    borderWidth:3, 
                    padding:2
                    }} 
                    />
                </TouchableOpacity>
              </View>)}

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.storyinner}>
                  <Image style={styles.story} source={{uri: story.image}} />
                </View>
                <View style={{marginBottom:0, marginTop:5, padding:0}}>                
                <Text
                  style={{
                    color: THEME.data == 'LIGHT' ? 'black' : 'white',
                    marginTop: 4,
                    textAlign: 'center',
                    fontSize: 11,
                    opacity: story.id == 0 ? 1 : 0.9,
                  }}>
                  {story.user.length > 10
                    ? story.user.slice(0, 10).toLowerCase() + '...'
                    : story.user.toUpperCase()}
                </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))} */
}
{
  /* </ScrollView> */
}

// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import React from 'react';
// import {users} from '../../data/users';
// import {useNavigation} from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { useSelector } from 'react-redux';
// // import { date } from 'yup'

// const Stories = () => {
//   const THEME = useSelector(state=> state.theme)
//   const navigation = useNavigation();
//   return (
//     <View style={{marginBottom: 13}}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {users.map((story, index) => (
//           <TouchableOpacity
//             key={index}
//             // onPress={() =>
//             //   navigation.navigate('Status', {
//             //     name: story.name,
//             //     image: story.image,
//             //   })
//             //   AnimationStory
//             // }
//             onPress={() =>
//               navigation.navigate('AnimationStory', {
//                 name: story.name,
//                 image: story.image,
//               })

//             }
//             >
//             <View
//               style={{
//                 flexDirection: 'column',
//                 paddingHorizontal: 6,
//                 position: 'relative',
//               }}>
//               {story.id == 1 ? (
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: 10,
//                     right: 40,
//                     zIndex: 1,
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => navigation.push('StoryPost')}>
//                     <Entypo
//                       name="circle-with-plus"
//                       style={{
//                         fontSize: 25,
//                         color: '#2596be',
//                         backgroundColor: 'white',
//                         borderRadius: 100,
//                       }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ) : (<View
//                 style={{
//                   position: 'absolute',
//                   bottom: 10,
//                   right: 32,
//                   zIndex: 1,
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => navigation.push('StoryPost')}>

//                   {/* <Entypo
//                     name="circle-with-plus"
//                     style={{
//                       fontSize: 25,
//                       color: '#2596be',
//                       backgroundColor: 'white',
//                       borderRadius: 100,
//                     }}
//                   /> */}
//                   <Image source={{uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR3J9Vv26v3KsaBMYZoqTW62IlhZ0G5FP6MQ&s'}}
//                   style={{
//                     width:50,
//                     height:50,
//                     borderRadius:50,
//                     borderColor:'#5536ba',
//                     borderWidth:3,
//                     padding:2
//                     }}
//                     />
//                 </TouchableOpacity>
//               </View>)}

//               <View style={{justifyContent: 'center', alignItems: 'center'}}>
//                 <View style={styles.storyinner}>
//                   <Image style={styles.story} source={{uri: story.image}} />
//                 </View>
//                 <View style={{marginBottom:0, marginTop:0}}>
//                 <Text
//                   style={{
//                     color: THEME.data == 'LIGHT' ? 'black' : 'white',
//                     marginTop: 4,
//                     textAlign: 'center',
//                     fontSize: 11,
//                     opacity: story.id == 0 ? 1 : 0.9,
//                   }}>
//                   {story.user.length > 10
//                     ? story.user.slice(0, 10).toLowerCase() + '...'
//                     : story.user.toUpperCase()}
//                 </Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   story: {
//     width: 90,
//     height: 90,
//     borderRadius: 50,
//     marginLeft: 3,
//     marginBottom: 5,
//     borderWidth: 2.5,
//     borderColor: '#5536ba',
//     resizeMode: 'cover',
//     marginTop: 4,
//     padding: 10,
//   },
//   storyinner: {
//     width: 102,
//     height: 102,
//     borderRadius: 50,
//     borderWidth: 2.5,
//     borderColor: '#5536ba',
//     resizeMode: 'cover',
//     marginTop: 10,
//     paddingBottom: 5,
//   },
// });

// export default Stories;
