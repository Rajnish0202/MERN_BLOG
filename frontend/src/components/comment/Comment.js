import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { capitalizeText } from '../../utils/captilizeFirstLetter';
import { confirmDelete } from '../../utils/deleteAlert';
import styles from './Comment.module.css';

const Comment = ({ blog, showComment, user, commentHandler, index }) => {
  return (
    <>
      <div className={styles.comments}>
        {showComment === index && (
          <>
            <div className={styles.commentList}>
              <ul className={styles.list}>
                {blog?.comments &&
                  blog?.comments.map((comment) => {
                    return (
                      <li key={comment._id}>
                        <div className={styles.image}>
                          <img
                            src={comment?.user?.avataar?.url}
                            alt={comment?.user?.avataar?.public_id}
                            title={comment?.name}
                          />
                          <p title={comment?.name}>
                            {comment?.name?.split(' ')[0]}
                          </p>
                        </div>
                        <div className={styles.center}>
                          <p>{capitalizeText(comment?.comment)}</p>
                        </div>
                        {user?._id?.toString() ===
                          comment?.user?._id?.toString() && (
                          <div
                            className={styles.action}
                            onClick={() =>
                              confirmDelete(
                                comment?._id,
                                commentHandler,
                                blog?._id,
                                'Comment'
                              )
                            }
                          >
                            <FaTrash size={20} color='red' />
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Comment;
