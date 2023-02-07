import axios from 'axios';
import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/blogConstant';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Getting all Blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOG_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/api/blogs`);

    dispatch({ type: ALL_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_BLOG_FAIL, payload: error.response.data.message });
  }
};

// Getting Blogs Details
export const getBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/api/blogs/${id}`);

    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BLOG_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Clearing Errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
