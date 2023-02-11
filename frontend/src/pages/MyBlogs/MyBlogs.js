import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogList from '../../components/blogList/BlogList';
import Sidebar from '../../components/sidebar/Sidebar';
import {
  clearError,
  deleteBlogs,
  myBlogs,
} from '../../redux/actions/blogActions';
import { DELETE_BLOG_RESET } from '../../redux/constants/blogConstant';
import MetaData from '../../utils/MetaData';
import styles from './MyBlog.module.css';
import { BsEmojiFrown } from 'react-icons/bs';
import Loader from '../../components/Loader/Loader';

const MyBlogs = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, blogs } = useSelector((state) => state.myBlogs);
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
    dispatch(myBlogs());

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      navigate('/');
      dispatch({ type: DELETE_BLOG_RESET });
    }
  }, [dispatch, deleteError, navigate, isDeleted]);

  return (
    <>
      <MetaData title={`${user?.name}'s Blog`} />
      {loading && <Loader />}
      {blogs.length === 0 ? (
        <section className='noBlog'>
          <div>
            <h3>No Blog Posted Yet</h3>
            <BsEmojiFrown size={100} color='brown' />
          </div>

          <div>
            <h3>Want To Post Blog?</h3>
            <Link to='/writeblog'>Write Blog</Link>
          </div>
        </section>
      ) : (
        <section className={styles.myBlog}>
          <BlogList
            loading={loading}
            blogs={blogs}
            user={user}
            deleteLoading={deleteLoading}
            blogDeleteHandler={blogDeleteHandler}
          />
          <Sidebar />
        </section>
      )}
    </>
  );
};

export default MyBlogs;
