import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  actionBlogsReducer,
  blogDetailsReducer,
  blogsReducer,
  commentReducer,
  myBlogsReducer,
  newBlogsReducer,
  newCommentReducer,
} from './reducers/blogsReducer';
import {
  forgotPasswordReducer,
  userReducer,
  userUpdateReducer,
} from './reducers/userReducer';
import { contactUsReducer } from './reducers/contactReducer';

const reducer = combineReducers({
  blogs: blogsReducer,
  blogDetails: blogDetailsReducer,
  myBlogs: myBlogsReducer,
  newBlog: newBlogsReducer,
  blogActions: actionBlogsReducer,
  user: userReducer,
  userProfile: userUpdateReducer,
  forgotPassword: forgotPasswordReducer,
  contactUs: contactUsReducer,
  newComment: newCommentReducer,
  commentAction: commentReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
