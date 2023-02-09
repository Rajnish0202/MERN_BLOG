import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { blogDetailsReducer, blogsReducer } from './reducers/blogsReducer';
import {
  forgotPasswordReducer,
  userReducer,
  userUpdateReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  blogs: blogsReducer,
  blogDetails: blogDetailsReducer,
  user: userReducer,
  userProfile: userUpdateReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
