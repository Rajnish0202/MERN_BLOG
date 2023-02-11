import React from 'react';
import Card from '../Card/Card';
import styles from './BlogList.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loader from '../Loader/Loader';

const BlogList = ({
  loading,
  blogs,
  user,
  deleteLoading,
  blogDeleteHandler,
}) => {
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

  return (
    <>
      {loading && <Loader />}
      <div className={styles.blogList}>
        {blogs &&
          blogs.map((blog) => {
            return (
              <Card key={blog._id}>
                <div className={styles.blog}>
                  <div className={styles.head}>
                    <code>
                      {blog?.createdAt !== blog?.updatedAt
                        ? `UpdatedAt: ${moment(blog?.updatedAt).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}`
                        : `CreatedAt: ${moment(blog?.createdAt).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}`}
                    </code>
                    <b>
                      <span>Category: </span>
                      {blog.category}
                    </b>
                  </div>
                  <div className={styles.post}>
                    <div>
                      <h3>
                        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                      </h3>
                      <div className='underline'></div>
                    </div>
                    <div>
                      {blog?.author?._id === user?._id ? (
                        <div className={styles.action}>
                          <Link
                            to={`/editBlog/${blog._id}`}
                            className={styles.editBtn}
                          >
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
                  <Link to={`/blog/${blog?._id}`}>
                    <div className={styles.imageBox}>
                      <img src={blog?.image.url} alt={blog?.image.public_id} />
                    </div>
                  </Link>
                  <div className={styles.desc}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          blog.description.substring(0, 300)
                        ),
                      }}
                    ></span>{' '}
                    <Link to={`blog/${blog._id}`}>...Read more</Link>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default BlogList;
