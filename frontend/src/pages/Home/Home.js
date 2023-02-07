import React, { useEffect } from 'react';
import BlogList from '../../components/blogList/BlogList';
import HeroBanner from '../../components/hero/HeroBanner';
import Sidebar from '../../components/sidebar/Sidebar';
import MetaData from '../../utils/MetaData';
import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getAllBlogs } from '../../redux/actions/blogActions';
import { toast } from 'react-toastify';

const Home = () => {
  const { loading, error, blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title='Home' />
      <HeroBanner />
      <section className={styles.home}>
        <BlogList loading={loading} blogs={blogs} />
        <Sidebar />
      </section>
    </>
  );
};

export default Home;
