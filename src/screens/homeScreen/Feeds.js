import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import backendURL, {
  DELETE_POST,
  FEEDS,
  FOLLOW_USER,
  LIKE_POST,
  UPDATE_POST,
} from '../../utils/Strings';
import FeedItem from './FeedItem';
import {useIsFocused} from '@react-navigation/native';
import PostOptionModal from '../../components/PostOptionModal';
import Loader from '../../components/Loader';
import PostUpdateModal from '../../components/PostUpdateModal';
import {useInstaContext} from '../../context/InstaContext';
import axios from 'axios';
import ReportContentModal from '../../components/ReportContentModal';
import RepoartResionModal from '../../components/RepoartResionModal';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts} from '../../redux/PostSlice';
const Feeds = () => {
  //backend data fatch for post details and images
  const [feeds, setFeeds] = useState();
  const isFocused = useIsFocused();
  const [openOption, setopenOption] = useState(false);
  const [openReport, setopenReport] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openReportResionModal, setOpenReportResionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // user data start
  // const [userData, setUserData] = useState({});
  // const {userToken} = useInstaContext();

  // useEffect(() => {
  //   getDatauser();
  // }, []);

  // async function getDatauser() {
  //   axios.post(`${backendURL}/userdata`, {token: userToken}).then(res => {
  //     setUserData(res.data.data);
  //   });
  // }
  const {userData} = useSelector(s => s.auth);
  const {posts} = useSelector(s => s.post);
  // console.log(posts)
  const dispatch = useDispatch();
  // user dataa end

  // useEffect(() => {
  //   // getData();
  //   dispatch(fetchPosts());
  // }, [isFocused]);

  // const getData = () => {
  //   fetch(backendURL + FEEDS)
  //     .then(res => res.json())
  //     .then(json => {
  //       json.data.reverse();
  //       setFeeds(json.data);
  //     });
  // };

  const deletePost = () => {
    setLoading(true);
    const myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + DELETE_POST + '/' + selectedItem._id, {method: 'DELETE'})
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        // alert('Delete Post successfuly');
        // getData();
        dispatch(fetchPosts())
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const updatePost = caption => {
    setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData._id,
      caption: caption,
      username: userData.username,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + UPDATE_POST + '/' + selectedItem._id, {
      method: 'PUT',
      body,
      headers: myHeders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        // alert('Update Post successfuly');
        // getData();
        dispatch(fetchPosts())
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const likePost = item => {
    // setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData._id,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + LIKE_POST + '/' + item._id, {
      method: 'PUT',
      body,
      headers: myHeders,
    })
      .then(res => res.json())
      .then(json => {
        // setLoading(false);
        // getData();
        // console.log(json)
        dispatch(fetchPosts())
      })
      .catch(error => {
        // setLoading(false);
        console.log(error);
      });
  };

  const followUser = id => {
    setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData?._id,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + FOLLOW_USER + '/' + id, {
      method: 'PUT',
      body,
      headers: myHeders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        // alert('followin sucess!');
        // getDatauser();
        // getData();
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const checkFollow = id => {
    let isFollowed = false;
    if (userData != null) {
      userData.following?.map(item => {
        if (item == id) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  };

  const downloadPost = () => {};
  const reportPost = () => {};
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item, index}) => {
          return (
            <FeedItem
              // list={feeds}
              data={item}
              key={index}
              isFollowed={checkFollow(item.userId)}
              onClickOptions={() => {
                setSelectedItem(item);
                setopenOption(true);
              }}
              onClickLike={() => {
                likePost(item);
              }}
              onFollow={() => {
                followUser(item.userId);
              }}
              onReportOption={() => {
                setSelectedItem(item);
                setopenReport(true);
              }}
            />
          );
        }}
      />
      <PostOptionModal
        visible={openOption}
        onClose={() => {
          setopenOption(false);
        }}
        onClick={x => {
          setopenOption(false);
          if (x == 2) {
            deletePost();
          } else if (x == 1) {
            setOpenUpdateModal(true);
          }
        }}
      />
      <Loader visible={loading} />
      <PostUpdateModal
        data={selectedItem}
        visible={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false);
        }}
        onClick={x => {
          setOpenUpdateModal(false);
          updatePost(x);
        }}
      />
      <ReportContentModal
        visible={openReport}
        onClose={() => {
          setopenReport(false);
        }}
        onClick={x => {
          setopenReport(false);
          if (x == 2) {
            downloadPost();
          } else if (x == 1) {
            setOpenReportResionModal(true);
          }
        }}
      />
      <RepoartResionModal
        data={selectedItem}
        visible={openReportResionModal}
        onClose={() => {
          setOpenReportResionModal(false);
        }}
        onClick={x => {
          setOpenReportResionModal(false);
          reportPost(x);
        }}
      />
    </View>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gold',
  },
});
