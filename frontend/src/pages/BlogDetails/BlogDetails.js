import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  clearError,
  deleteBlogs,
  getBlogDetails,
} from '../../redux/actions/blogActions';
import styles from './BlogDetails.module.css';
import bannerImg from '../../assets/HeroImg.jpg';
import { toast } from 'react-toastify';
import MetaData from '../../utils/MetaData';
import moment from 'moment';
import DOMPurify from 'dompurify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { DELETE_BLOG_RESET } from '../../redux/constants/blogConstant';
import { confirmAlert } from 'react-confirm-alert';

const BlogDetails = () => {
  const { loading, error, blog } = useSelector((state) => state.blogDetails);
  const { user } = useSelector((state) => state.user);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.blogActions);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const blogDeleteHandler = (id) => {
    dispatch(deleteBlogs(id));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: `Delete Product `,
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => blogDeleteHandler(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };

  useEffect(() => {
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

    dispatch(getBlogDetails(id));
  }, [id, dispatch, error, deleteError, navigate, isDeleted]);

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
                <p>
                  {blog?.createdAt !== blog?.updatedAt
                    ? `UpdatedAt: ${moment(blog?.updatedAt).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}`
                    : `CreatedAt: ${moment(blog?.createdAt).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}`}
                </p>
                <b>
                  <span>Category: </span>
                  {blog?.category}
                </b>
              </div>
            </div>
            <div className={styles.post}>
              <div>
                <h3>{blog.title}</h3>
                <div className='underline'></div>
              </div>
              {blog?.author?._id === user?._id ? (
                <div className={styles.action}>
                  <Link to={`/editBlog/${blog._id}`} className={styles.editBtn}>
                    <button>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    disabled={deleteLoading ? true : false}
                    onClick={() => confirmDelete(blog?._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <Link to={`${blog?.image?.url}`} target='_blank'>
            <div className={styles.imageContainer}>
              <img src={blog?.image?.url} alt={blog?.image?.public_id} />
            </div>
          </Link>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.description),
            }}
          ></div>
          {/* Comments */}
          <hr />
          <div>Comments</div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
