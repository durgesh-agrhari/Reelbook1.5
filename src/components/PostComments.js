import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {Divider} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useInstaContext} from '../context/InstaContext';
import backendURL, {
  DELETE_COMMENT,
  GET_ALLCOMMENTS,
  POST_COMMENT,
  UPDATE_COMMENT,
} from '../utils/Strings';
import axios from 'axios';
import PostCommentItem from './PostCommentItem';
import CommentOptionModal from './CommentOptionModal';
import Loader from './Loader';
import {useSelector} from 'react-redux';

const PostComments = () => {
  const navigation = useNavigation();
  const [openCommentOptions, setOpenCommentOptions] = useState(false);
  const [selectedCommentitem, setSelectedCommentItem] = useState(null);
  const [openUpdateCommentModal, setOpenUpdateCommentModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  // const [userData, setUserData] = useState({});
  // const {userToken} = useInstaContext();
  // async function getData() {
  //   axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
  //     setUserData(res.data.data);
  //   });
  // }
  // useEffect(() => {
  //   getData();
  // }, []);
  const {userData} = useSelector(s => s.auth);

  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(['']);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const id = route.params.id;

  const postComment = () => {
    setLoading(true);
    const myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      userId: userData._id,
      comment: comment,
      username: userData.username,
      postId: id,
    });
    fetch(backendURL + POST_COMMENT + "/"+id, {
      method: 'POST',
      body,
      headers: myHeders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);

        Keyboard.dismiss();
        getAllComments();
        setComment('');
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(backendURL + GET_ALLCOMMENTS + '/' + id, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setCommentList(json.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteComment = () => {
    setLoading(true);
    const myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + DELETE_COMMENT + '/' + selectedCommentitem._id, {
      method: 'DELETE',
      body:{
        postid:id
      }
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        getAllComments();
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const updateComment = () => {
    setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData._id,
      comment: newComment,
      username: userData.username,
      postId: id,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + UPDATE_COMMENT + '/' + selectedCommentitem._id, {
      method: 'PUT',
      body,
      headers: myHeders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        getAllComments();
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color="black"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              {' '}
              Comment here
            </Text>
          </View>

          <Entypo name="dots-three-vertical" size={26} color="black" />
        </View>
        <Divider width={1} color="gray" style={{marginTop: 10}} />
      </View>

      <FlatList
        style={{
          marginBottom: 100,
          height: Dimensions.get('window').height - 200,
        }}
        data={commentList}
        renderItem={({item, index}) => {
          return (
            <PostCommentItem
              data={item}
              onClickCommentOption={() => {
                setSelectedCommentItem(item);
                setOpenCommentOptions(true);
              }}
            />
          );
        }}
      />

      <View style={styles.bottomView}>
        <Entypo name="emoji-happy" size={26} color="black" />
        <TextInput
          placeholder="Type comment here ... "
          placeholderTextColor="black"
          onChangeText={txt => setComment(txt)}
          style={{
            width: '70%',
            height: '60%',
            borderColor: 'gray',
            borderWidth: 2,
            paddingLeft: 10,
            marginBottom: 0,
            borderRadius: 10,
            color: 'black',
          }}
        />
        <TouchableOpacity
          disabled={comment == '' ? true : false}
          style={[
            styles.postbtn,
            {backgroundColor: comment == '' ? 'gray' : 'blue'},
          ]}
          onPress={() => {
            postComment();
          }}>
          <Text style={styles.commentbtn}>comment</Text>
        </TouchableOpacity>
      </View>
      <CommentOptionModal
        visible={openCommentOptions}
        onClick={x => {
          setOpenCommentOptions(false);
          if (x == 2) {
            deleteComment();
          } else {
            setNewComment(selectedCommentitem.comment);
            setOpenUpdateCommentModal(true);
          }
        }}
        onClose={() => {
          setOpenCommentOptions(false);
        }}
      />
      <Modal transparent visible={openUpdateCommentModal}>
        <View style={styles.modalView}>
          <View style={styles.modalmainView}>
            <Text style={styles.titleComment}>Edit Comment</Text>
            <TextInput
              value={newComment}
              onChangeText={txt => setNewComment(txt)}
              placeholder="Type comment here"
              style={styles.commentInput}
            />

            <View style={styles.commentBottomModal}>
              <TouchableOpacity
                style={styles.cncilbtn}
                onPress={() => {
                  setOpenUpdateCommentModal(false);
                }}>
                <Text
                  style={{color: 'white', fontSize: 18, fontWeight: '6-000'}}>
                  Cancil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updatebtn}
                onPress={() => {
                  setOpenUpdateCommentModal(false);
                  updateComment();
                }}>
                <Text
                  style={{color: 'white', fontSize: 18, fontWeight: '6-000'}}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Loader visible={loading} />
    </View>
  );
};

export default PostComments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 70,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  postbtn: {
    width: '20%',
    height: '60%',
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentbtn: {
    color: 'white',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalmainView: {
    width: '90%',
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleComment: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
    marginTop: 20,
  },
  commentInput: {
    width: '90%',
    height: 50,
    paddingLeft: 20,
    borderWidth: 0.4,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  commentBottomModal: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  cncilbtn: {
    width: '40%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  updatebtn: {
    width: '40%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
