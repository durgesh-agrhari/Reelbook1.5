// export const BASE_URL = 'http://192.168.188.154:3000';

// const backendURL = 'http://172.20.10.4:3000';
// const backendURL = 'https://socialapp-backend-cli.vercel.app';
const backendURL =
  'https://socialapp-backend-cli-git-master-durgesh-agrharis-projects.vercel.app';
export const FEEDS = '/post/getallPosts';
export const REELS = '/reel/getallReels';
export const USER_PROFILE = '/getuser';
export const DELETE_POST = '/post/deletePost';
export const DELETE_REEL = '/reel/deleteReel';
export const ADD_POST = '/post/add';
export const ADD_REEL = '/reel/add';
export const UPDATE_POST = '/post/updatePost';
export const UPDATE_REEL = '/reel/updateReel';
export const LIKE_POST = '/post/like';
export const LIKE_REEL = '/reel/like';
export const POST_COMMENT = '/post/addComment';
export const GET_ALLCOMMENTS = '/post/allComment';
export const DELETE_COMMENT = '/post/daleteComment';
export const UPDATE_COMMENT = '/post/updateComment';
export const FOLLOW_USER = '/follow';
// this one of bothe user and frend user
export const USER_POST_DATA = '/post/getFrienddata';
export const UPDATER_USER = '/update';
export const UPLOAD_POST = '/s3/upload';
export const GETVIDEO_POST = '/s3/list1';
export const GET_USERDATA = '/getuser';
export const GET_All_Users = '/getallUser';
export const ADD_STORY = '/story/add';
export const ADD_VIDEO_CHUNKS = '/s3/videosChunks';
export const SEND_REQUEST = '/sendrequest';

export default backendURL;
