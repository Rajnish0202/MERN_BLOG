import React, { useEffect } from 'react';
import styles from './Header.module.css';
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/captilizeFirstLetter';
import { logout } from '../../redux/actions/userAction';

const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link
          to='https://www.facebook.com/rajnish.kumar.169067'
          target='_blank'
        >
          <FaFacebookSquare size={30} />
        </Link>
        <Link to='https://twitter.com/Rajnishkum02' target='_blank'>
          <FaTwitterSquare size={30} />
        </Link>
        <Link to='https://github.com/Rajnish0202' target='_blank'>
          <FaGithubSquare size={30} />
        </Link>
        <Link to='https://www.instagram.com/rajnish.raichu92' target='_blank'>
          <FaInstagramSquare size={30} />
        </Link>
      </div>
      <div className={styles.headerCenter}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to='/'>Home</Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/myblog'>MyBlog</Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/postblog'>Write</Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/contactus'>Contact</Link>
          </li>
        </ul>
      </div>
      <div className={styles.headerRight}>
        {!isLoggedIn ? (
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link to='/login'>Login</Link>
            </li>
            <li className={styles.listItem}>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        ) : (
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link to='/profile' className={styles.userLink}>
                <span>
                  <img
                    src={user?.avataar?.url}
                    alt={user?.avataar?.public_id}
                  />
                </span>
                <div title={user?.name}>
                  {capitalizeText(user?.name).split(' ')[0]}
                </div>
              </Link>
            </li>
            <li className={styles.listItem}>
              <button
                className={`${styles.logout} --btn`}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
