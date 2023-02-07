import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/captilizeFirstLetter';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { categories } = useSelector((state) => state.blogs);
  return (
    <div className={styles.sidebar}>
      <div className={styles.search}>
        <input type='text' placeholder='Search by title...' />
        <button className='--btn'>
          <FaSearch size={20} />
        </button>
      </div>
      <div className={styles.filterByCategory}>
        <label>Category: </label>
        <select name='' id=''>
          <option value='All'>All</option>
          {categories &&
            categories.map((category, index) => {
              return (
                <option value={category} key={index}>
                  {capitalizeText(category)}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
