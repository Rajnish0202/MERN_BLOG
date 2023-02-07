import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearError, getBlogDetails } from '../../redux/actions/blogActions';
import styles from './BlogDetails.module.css';
import bannerImg from '../../assets/HeroImg.jpg';
import { toast } from 'react-toastify';
import MetaData from '../../utils/MetaData';

const BlogDetails = () => {
  const { loading, error, blog } = useSelector((state) => state.blogDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    dispatch(getBlogDetails(id));
  }, [id, dispatch, error]);

  return (
    <>
      <MetaData title={`Blog Details: ${blog._id}`} />
      {loading && <p>Loading...</p>}
      <section className={styles.details}>
        <div className={styles.banner}>
          <img src={bannerImg} alt={blog.title} />
          <div className={styles.back}>
            <Link to='/'>&larr; Back</Link>
          </div>
        </div>
        <div className={styles.blogDetails}>
          <div className={styles.titles}>
            <div className={styles.contant}>
              <div className={styles.author}>
                <Link to={`/users/${blog?.author?._id}`}>
                  <img
                    src={blog?.author?.avataar?.url}
                    alt={blog?.author?.avataar?.public_id}
                  />
                </Link>
                <p>{blog?.author?.name}</p>
              </div>
              <div className={styles.moreDetails}>
                <p>{blog?.createdAt}</p>
                <b>
                  <span>Category: </span>
                  {blog?.category}
                </b>
              </div>
            </div>
            <h3>{blog.title}</h3>
            <div className='underline'></div>
          </div>
          <div className={styles.imageContainer}>
            <img src={blog?.image?.url} alt={blog?.image?.public_id} />
          </div>
          <div className={styles.desc}>{blog?.description}</div>
          {/* Comments */}
          <hr />
          <div>Comments</div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
