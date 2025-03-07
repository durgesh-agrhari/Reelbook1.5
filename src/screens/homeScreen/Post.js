import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-elements';

const Post = ({post}) => {
  const navigation = useNavigation();

  const [like, setLike] = useState(post.isLiked);
  const [save, setSave] = useState(post.isSaved);
  const [follow, setFollow] = useState(post.follow);
  const [loader, setloader] = useState(false);

  const postAction = () => {
    setloader(true);
  };

  function renderModel() {
    return (
      <Modal transparent={true} visible={loader}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor: 'white',
              bottom: 0,
              position: 'absolute',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.left1}>Post Options</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.right1}
                  onPress={() => setloader(false)}>
                  <Entypo name="cross" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.left}>Update Post</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.right}
                  onPress={() => navigation.navigate('UpdatePostModal')}>
                  <AntDesign name="edit" size={30} color="green" />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.left}>Delete Post</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.right}>
                  <AntDesign name="delete" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View>
      <View>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
            // backgroundColor:'gray',
          }}>
          <Divider
            width={2}
            style={{backgroundColor: 'white', opacity: 0.08, marginTop: 6}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
              backgroundColor: '#0b1321',
              marginTop: 5,
              marginBottom: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                // source={{uri: post.imagelink}}
                source={require('../../assets/pictures/reelbook.jpg')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderColor: 'white',
                  borderWidth: 2,
                }}
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  {post.user}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <TouchableOpacity
                style={{width: follow ? 82 : 72}}
                onPress={() => setFollow(!follow)}>
                <View
                  style={{
                    width: '100%',
                    height: 30,
                    borderRadius: 5,
                    // backgroundColor: follow ? '#fff' : '#3493D9',
                    borderWidth: follow ? 1 : 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: follow ? 'gray' : 'white',
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: follow ? 'gray' : 'white',
                      fontWeight: 'bold',
                    }}>
                    {follow ? 'Following' : 'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>

             {/* <TouchableOpacity
                onPress={() => {
                  postAction();
                }}>
                <Feather
                  name="more-vertical"
                  style={{
                    fontSize: 22,
                    color: 'white',
                    paddingLeft: 10,
                    marginVertical: 4,
                  }}
                /> 
              </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              // source={{uri: post.imagelink}}
              source={require('../../assets/pictures/reelbook.jpg')}
              style={{
                width: '100%',
                height: 400,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              paddingVertical: 15,
              backgroundColor: '#0b1321',
              marginTop: 2,
              marginBottom: 2,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)',
                padding: 6,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 30,
                borderColor: 'gray',
                borderWidth: 0.2,
                marginLeft: 5,}}>
              <TouchableOpacity onPress={() => setLike(!like)}>
                <AntDesign
                  name={like ? 'heart' : 'hearto'}
                  style={{
                    paddingRight: 8,
                    fontSize: 30,
                    color: like ? 'red' : 'white',
                  }}
                />
              </TouchableOpacity>
              <Text style={{color: 'white'}}>
                {/* Liked by {like ? 'you and ' : ''}{' '} */}
                {like ? post.likes + 1 : post.likes} Likes
              </Text>
            </View>
            <View style={{flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.3)',
                padding: 6,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 30,
                borderColor: 'gray',
                borderWidth: 0.2,
                marginLeft: 5,}}>
              <TouchableOpacity onPress={() => navigation.push('Comments')}>
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  style={{
                    // paddingLeft: 20,
                    fontSize: 30,
                    color: 'white',
                    paddingRight: 6,
                  }}
                />
              </TouchableOpacity>
              <View style={{marginTop: 2, marginBottom: 2}}>
                {!!post.comments.length && (
                  <Text style={{color: 'grey'}}>
                    {post.comments.length > 1 ? '' : ''} {post.comments.length}{' '}
                    {post.comments.length > 1 ? 'Comments' : 'Comment'}
                  </Text>
                )}
              </View>
            </View>

            <View style={{flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.3)',
                padding: 6,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 30,
                borderColor: 'gray',
                borderWidth: 0.2,
                marginLeft: 5,}}>
              <TouchableOpacity>
                <FontAwesome
                  name="share"
                  style={{
                    paddingLeft: 20,
                    fontSize: 25,
                    color: 'white',
                    // paddingRight: 6,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'gary',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                365
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 14,
                paddingVertical: 2,
                color: 'white',
              }}>
              if you like post! please like my first poast :)
            </Text>

            <View style={{marginTop: 2, marginBottom: 2}}>
              {!!post.comments.length && (
                <Text style={{color: 'grey'}}>
                  View {post.comments.length > 1 ? 'all' : ''}{' '}
                  {post.comments.length}{' '}
                  {post.comments.length > 1 ? 'Comments' : 'Comment'}
                </Text>
              )}
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  // source={{uri: post.profile_pictue}}
                  source={require('../../assets/pictures/reelbook.jpg')}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    borderColor: 'orange',
                    marginRight: 10,
                  }}
                />
                <TouchableOpacity
                // onPress={() => navigation.push('Comments')}
                >
                  <Text style={{color: 'white', opacity: 0.6}}>
                    add a comment
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-happy"
                    style={{fontSize: 15, color: 'green', marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-neutral"
                    style={{fontSize: 15, color: 'pink', marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name="emoji-sad"
                    style={{fontSize: 15, color: 'red', marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 15, marginTop: 0}}>
        <Comments post={post} />
      </View>
      {renderModel()}
    </View>
  );
};

// case 1 0 comments dont render component
// case 2 1 render component without all and singuler comments
// case 3 2 render component withe all plural comments

const Comments = ({post}) => (
  <View>
    {post.comments.slice(0, 2).map((comment, index) => (
      <View key={index} style={{flexDirection: 'row', marginTop: 2}}>
        <Text style={{fontWeight: '600'}}>
          <Text style={{color: 'white'}}> {comment.user}</Text>{' '}
          <Text style={{color: 'grey'}}>{comment.comment}</Text>
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  story: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: '#ff8501',
  },

  shareIcon: {
    transform: [{rotate: '0deg'}],
    marginTop: -3,
  },
  footerIcon: {
    width: 33,
    height: 33,
    marginRight: 10,
  },
  leftFooterIconContainer: {
    flexDirection: 'row',
    width: '32',
    justifyContent: 'space-between',
  },

  left1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  right1: {
    marginTop: 20,
    marginRight: 20,
    backgroundColor: 'gray',
    borderRadius: 50,
    padding: 1,
  },
  left: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  right: {
    marginTop: 20,
    marginRight: 20,
    borderRadius: 50,
    padding: 1,
  },
});

export default Post;

// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
// import React,{ useState } from 'react'
// import { Divider } from 'react-native-elements'

// import HomePost from './HomePost'

// const postFooterIcons = [
//     {
//         name: 'Like',
//         imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1wrrcSr6nSAMcz4ZhXzd7Vqc-la-_G6OhoP8sMGBCw&s',
//         likedImageUrl: 'https://cdn-icons-png.freepik.com/512/5185/5185603.png',
//     },
//     {
//         name: 'Comment',
//         imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KGeH_lbPpyWEZW85nmEmouDfDrU-BkaIDMUZs5eGqg&s',
//     },
//     {
//         name: 'Share',
//         imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzZ6uj0r-sEkJMAoCBxyd0g8aWPSgKhGVll0nou0_5A&s',
//     },
//     {
//         name: 'Save',
//         imageUrl: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Y5MzItbmluZy0xMTUta2xjM2YzamMuanBn.jpg',
//     }
// ]

// const Post = ({ post }) => {
//     return (
//         <View style={{ marginBottom: 30 }}>
//             <HomePost/>
//             <Divider width={1} orientation='vertical' />
//             <PostHeader post={post} />
//             <PostImage post={post} />

//             <View style={{ marginHorizontal: 15, marginTop: 10 }}>
//                 <PostFooter />
//                 <Likes post={post} />
//                 <Caption post={post} />
//                 <CommentSection post={post} />
//                 <Comments post={post} />
//             </View>
//         </View>
//     )
// }

// const PostHeader = ({ post }) => (
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Image source={{ uri: post.profile_pictue }} style={styles.story} />
//             <Text style={{ color: 'white', marginLeft: 8, fontWeight: '700' }}>{post.user}</Text>
//         </View>
//         <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
//     </View>
// )

// const PostImage = ({ post }) => (

//     <View style={{
//         width: '100%',
//         height: 450,
//     }}>
//         <Image source={{ uri: post.imagelink }} style={{ height: '100%', resizeMode: 'cover', margin: 3 }} />
//     </View>
// )

// const PostFooter = () => (
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//         <View style={styles.leftFooterIconContainer}>
//             <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
//             <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
//             <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl} />
//         </View>

//         <View>
//             <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
//         </View>

//     </View>
// )

// const Icon = ({ imgStyle, imgUrl }) => (
//     <TouchableOpacity>
//         <Image style={imgStyle} source={{ uri: imgUrl }} />
//     </TouchableOpacity>
// )

// const Likes = ({ post }) => (
//     <View style={{ flexDirection: 'row', marginTop: 5 }}>
//         <Text style={{ color: 'white', fontWeight: '600' }}>{post.likes.toLocaleString('en')} likes</Text>
//     </View>

// )

// const Caption = ({ post }) => (
//     <View style={{ marginTop: 5 }}>
//         <Text style={{ color: 'white' }}>
//             <Text style={{ fontWeight: '600' }}>{post.user}  </Text>
//             <Text style={{ color: 'white' }}>{post.caption}</Text>
//         </Text>
//     </View>
// )

// const CommentSection = ({ post }) => (
//     <View style={{ marginTop: 5 }}>
//         {!!post.comments.length && (
//             <Text style={{ color: 'grey' }}>View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length > 1 ? 'Comments' : 'Comment'}</Text>
//         )}
//     </View>
// )

// // case 1 0 comments dont render component
// // case 2 1 render component without all and singuler comments
// // case 3 2 render component withe all plural comments

// const Comments = ({ post }) => (
//     <View>
//         {post.comments.map((comment, index) => (
//             <View key={index} style={{ flexDirection: 'row', marginTop: 2 }} >
//                 <Text style={{ fontWeight: '600' }}><Text style={{ color: 'white' }}> {comment.user}</Text> {' '}
//                     <Text style={{ color: 'grey' }}>{comment.comment}</Text></Text>
//             </View>
//         ))}
//     </View>
// )

// const styles = StyleSheet.create({
//     story: {
//         width: 40,
//         height: 40,
//         borderRadius: 50,
//         marginLeft: 6,
//         borderWidth: 3,
//         borderColor: '#ff8501',

//     },

//     shareIcon: {
//         transform: [{ rotate: '0deg' }],
//         marginTop: -3,
//     },
//     footerIcon: {
//         width: 33,
//         height: 33,
//         marginRight: 10,
//     },
//     leftFooterIconContainer: {
//         flexDirection: 'row',
//         width: '32',
//         justifyContent: 'space-between',
//     }
// })

// export default Post
