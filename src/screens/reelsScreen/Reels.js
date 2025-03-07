import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import backendURL, {
  DELETE_POST,
  DELETE_REEL,
  FEEDS,
  FOLLOW_USER,
  LIKE_POST,
  LIKE_REEL,
  REELS,
  UPDATE_POST,
  UPDATE_REEL,
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
import ReelsScreen from './ReelsScreen';
const Reels = () => {
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
  // 
  const {userData} = useSelector(s => s.auth);
  const {posts} = useSelector(s => s.post);
  const dispatch = useDispatch();
  // user dataa end

  useEffect(() => {
    getData();
    // dispatch(fetchPosts());
  }, [isFocused]);

  const getData = () => {
    fetch(backendURL + REELS)
      .then(res => res.json())
      .then(json => {
        json.data.reverse();
        setFeeds(json.data);
      });
  };

  const deleteReel = () => {
    setLoading(true);
    const myHeders = new Headers();
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + DELETE_REEL + '/' + selectedItem._id, {method: 'DELETE'})
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

  const updateReel = caption => {
    setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData._id,
      caption: caption,
      username: userData.username,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + UPDATE_REEL + '/' + selectedItem._id, {
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

  const likeReel = item => {
    // setLoading(true);
    const myHeders = new Headers();
    const body = JSON.stringify({
      userId: userData._id,
    });
    myHeders.append('Content-Type', 'application/json');
    fetch(backendURL + LIKE_REEL + '/' + item._id, {
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
    console.log('follow click 3')
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

  const downloadReel = () => {};
  const reportReel = () => {};
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item, index}) => {
          return (
            <ReelsScreen
              // list={feeds}
              data={item}
              key={index}
              isFollowed={checkFollow(item.userId)}
              onClickOptions={() => {
                setSelectedItem(item);
                setopenOption(true);
              }}
              onClickLike={() => {
                likeReel(item);
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
            deleteReel();
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
          updateReel(x);
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
            downloadReel();
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
          reportReel(x);
        }}
      />
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gold',
  },
});
