import React from 'react';
import Card from '../Card/Card';
import styles from './BlogList.module.css';
import { Link } from 'react-router-dom';

const BlogList = ({ loading, blogs }) => {
  return (
    <>
      {loading && <p>Loading...</p>}
      <div className={styles.blogList}>
        {blogs &&
          blogs.map((blog) => {
            return (
              <Card key={blog._id}>
                <div className={styles.blog}>
                  <div className={styles.head}>
                    <code>{blog?.createdAt}</code>
                    <b>
                      <span>Category: </span>
                      {blog.category}
                    </b>
                  </div>
                  <h3>
                    <Link to={`/${blog._id}`}>{blog.title}</Link>
                  </h3>
                  <div className='underline'></div>
                  <div className={styles.imageBox}>
                    <img src={blog?.image.url} alt={blog?.image.public_id} />
                  </div>
                  <div className={styles.desc}>
                    <p>
                      {blog.description.substring(0, 300)}...
                      <Link to={`/${blog._id}`}>Read more</Link>
                    </p>
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
