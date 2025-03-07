import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splashScreen/Splash';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import Loginform from '../screens/authScreen/login/Loginform';
import BottomTab from '../components/BottomTab';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import ActivityScreen from '../screens/activityScreen/ActivityScreen';
import FriendProfile from '../screens/activityScreen/FriendProfile';
import {ProfileBody} from '../screens/activityScreen/ProfileBody';
import Status from '../screens/homeScreen/Status';
import MusicScreen from '../screens/musicScreen/MusicScreen';
import EditProfile from '../screens/profileScreen/EditProfile';
import ProfileDestboard from '../screens/profileScreen/ProfileDestboard';
import NewPostScreen from '../screens/newpostScreen/NewPostScreen';
// import FollowingandFollowers from '../screens/profileScreen/FollowingandFollowers';
import Signupform from '../screens/authScreen/signup/Signupform';
import StoryPost from '../screens/homeScreen/storyPost/StoryPost';
import CameraRool from '../screens/newpostScreen/photopost/CameraRool';
import PostComments from '../components/PostComments';
import ForgetPassword from '../screens/authScreen/login/ForgetPassword';
import ChangePassword from '../screens/authScreen/login/ChangePassword';
import Explore from '../components/Explore';
import SignupOtp from '../screens/authScreen/signup/SignupOtp';
import InputOtp from '../screens/authScreen/signup/InputOtp';
import SighupInfo from '../screens/authScreen/signup/SighupInfo';
import ForgetOtpVerify from '../screens/authScreen/login/ForgetOtpVerify';
import Aboutus from '../screens/profileScreen/impPages/Aboutus';
import YourActivity from '../screens/profileScreen/impPages/YourActivity';
import PrivacyAndPolicy from '../screens/profileScreen/impPages/PrivacyAndPolicy';
import EarningOption from '../screens/profileScreen/impPages/EarningOption';
import EarningDestboard from '../screens/profileScreen/impPages/earningPages/EarningDestboard';
import Wihdraw from '../screens/profileScreen/impPages/earningPages/Wihdraw';
import UpdatePostModal from '../screens/homeScreen/optionModal/UpdatePostModal';
import DocumentSelecter from '../screens/newpostScreen/reelpost/DocumentSelecter';
import FriendProfilePost from '../screens/activityScreen/FriendProfilePost';
import AddNewPost from '../screens/newpostScreen/AddNewPost';
import Gym from '../screens/reelsScreen/reelsCategorys/BoysCategory/Gym';
import PlayVideoListItem from '../screens/homeScreen/PlayVideoListItem';
import Splacehome from '../screens/splashScreen/Splacehome';
import MultiSelectCategory from '../screens/newpostScreen/photopost/comp/MultiSelectCategory';
import PullToRefersh from '../screens/newpostScreen/photopost/comp/PullToRefersh';
import MusicBook from '../screens/musicScreen/MusicBook';
import UserProfile from '../screens/activityScreen/UserProfile';
import VideoSelector from '../screens/newpostScreen/reelpost/VideoSelector';
import ChatScreen from '../screens/chatScreen/ChatScreen';
import EquipmentList from '../screens/newpostScreen/photopost/comp/EquipmentList';
import ProfileVP from '../screens/newpostScreen/photopost/comp/ProfileVP';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserData} from '../redux/AuthSlice';
import {fetchPosts} from '../redux/PostSlice';
import ChatTabs from '../screens/chatScreen/ChatTabs';
import Reels from '../screens/videoyoutube/Reels';
import VideoThumbnill from '../screens/newpostScreen/photopost/comp/VideoThumbnill';
import MusicHome from '../screens/musicScreen/MusicHome';
import Music from '../screens/musicScreen/Music';
import Story from '../screens/homeScreen/storyAnimation/Story';
import VideoFeed from '../screens/newpostScreen/photopost/videodemo/VideoFeed';
import ProfileScreenc from '../screens/chatScreen/chatpage/ProfileScreenc';
import RequestChatRoom from '../screens/chatScreen/chatpage/RequestChatRoom';
import HomeMix from '../screens/homeScreen/HomeMix';
// import Videissue from '../screens/reelsScreen/reelhightissue/Videissue';
// Importing Screens and Components

// Define the Stack Navigator
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const auth = useSelector(s => s.auth);

  const {userReduxToken} = auth;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userReduxToken) dispatch(fetchUserData(userReduxToken));
  }, [userReduxToken]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splacehome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splacehome" component={Splacehome} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Loginform" component={Loginform} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
        <Stack.Screen name="FriendProfile" component={FriendProfile} />
        <Stack.Screen name="ProfileBody" component={ProfileBody} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="MusicScreen" component={MusicScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ProfileDestboard" component={ProfileDestboard} />
        <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
        {/* <Stack.Screen
          name="FollowingandFollowers"
          component={FollowingandFollowers}
          /> */}
        <Stack.Screen name="Signupform" component={Signupform} />
        <Stack.Screen name="StoryPost" component={StoryPost} />
        <Stack.Screen name="CameraRool" component={CameraRool} />
        <Stack.Screen name="PostComments" component={PostComments} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="SignupOtp" component={SignupOtp} />
        <Stack.Screen name="InputOtp" component={InputOtp} />
        <Stack.Screen name="SighupInfo" component={SighupInfo} />
        <Stack.Screen name="ForgetOtpVerify" component={ForgetOtpVerify} />
        <Stack.Screen name="Aboutus" component={Aboutus} />
        <Stack.Screen name="YourActivity" component={YourActivity} />
        <Stack.Screen name="PrivacyAndPolicy" component={PrivacyAndPolicy} />
        <Stack.Screen name="EarningOption" component={EarningOption} />
        <Stack.Screen name="EarningDestboard" component={EarningDestboard} />
        <Stack.Screen name="Wihdraw" component={Wihdraw} />

        <Stack.Screen name="DocumentPicker" component={DocumentSelecter} />
        <Stack.Screen name="UpdatePostModal" component={UpdatePostModal} />
        <Stack.Screen name="FriendProfilePost" component={FriendProfilePost} />
        <Stack.Screen name="AddNewPost" component={AddNewPost} />
        <Stack.Screen name="Gym" component={Gym} />
        <Stack.Screen name="PlayVideoListItem" component={PlayVideoListItem} />
        <Stack.Screen name="PullToRefersh" component={PullToRefersh} />
        <Stack.Screen name="Musicbook" component={MusicBook} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="VideoSelector" component={VideoSelector} />
        <Stack.Screen name="EquipmentList" component={EquipmentList} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProfileVP" component={ProfileVP} />
        <Stack.Screen name="ChatTabs" component={ChatTabs} />
        <Stack.Screen name="Reels" component={Reels} />
        <Stack.Screen name="VideoThumbnill" component={VideoThumbnill} />
        <Stack.Screen name="MusicHome" component={MusicHome} />
        <Stack.Screen name="Music" component={Music} />
        <Stack.Screen name="AnimationStory" component={Story} />
        <Stack.Screen name="VideoFeed" component={VideoFeed} />
        <Stack.Screen name="ProfileScreenc" component={ProfileScreenc} />
        <Stack.Screen name="RequestChatRoom" component={RequestChatRoom}  />
        <Stack.Screen name="HomeMix" component={HomeMix}  />
        {/* <Stack.Screen name="Videissue" component={Videissue} /> */}

        <Stack.Screen
          name="MultiSelectCategory"
          component={MultiSelectCategory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
