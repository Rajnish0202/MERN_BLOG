import React, { useEffect } from 'react';
import BlogList from '../../components/blogList/BlogList';
import HeroBanner from '../../components/hero/HeroBanner';
import Sidebar from '../../components/sidebar/Sidebar';
import MetaData from '../../utils/MetaData';
import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  deleteBlogs,
  getAllBlogs,
} from '../../redux/actions/blogActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DELETE_BLOG_RESET } from '../../redux/constants/blogConstant';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, blogs } = useSelector((state) => state.blogs);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.blogActions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogDeleteHandler = (id) => {
    dispatch(deleteBlogs(id));
  };

  useEffect(() => {
    dispatch(getAllBlogs());

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      navigate('/');
      dispatch({ type: DELETE_BLOG_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <>
      <MetaData title='Home' />
      <HeroBanner />
      <section className={styles.home}>
        <BlogList
          loading={loading}
          blogs={blogs}
          user={user}
          deleteLoading={deleteLoading}
          blogDeleteHandler={blogDeleteHandler}
        />
        <Sidebar />
      </section>
    </>
  );
};

export default Home;
