import React from 'react';
import styles from './Header.module.css';
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaSearch,
  FaTwitterSquare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
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
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to='/login'>Login</Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/login'>Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
