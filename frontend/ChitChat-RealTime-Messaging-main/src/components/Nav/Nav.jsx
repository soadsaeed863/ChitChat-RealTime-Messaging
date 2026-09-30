import React, { useState } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';
import styles from './Nav.module.css';
import useLogout from '../../hooks/useLogout';
import { Link } from "react-router-dom";


export const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const {loading, logout} = useLogout();
  const handleProfileClick = () => {
    setIsProfileModalOpen(true); // Open the modal when profile icon is clicked
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false); // Close the modal when clicking close button
  };


  return (
    <>
      <div className={`${styles.con}`}>
        <ul className={`nav flex-column ${styles.side}`}>
          <li className="nav-item">
            <Link className="nav-link" onClick={handleProfileClick}>
              <i className={`${styles.icon} fa-solid fa-circle-user`}></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <i className={`${styles.icon} fa-solid fa-circle-plus`}></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#" onClick={logout}>
              <i className={`${styles.icon} fa-solid fa-right-from-bracket`}></i>
            </Link>
          </li>
        </ul>
      </div>

      <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Navbar;