import React from "react";
import styles from './NameBar.module.css';
import { Link } from "react-router-dom";


export const NameBar = ({ selectedContact, setSelectedContact }) => {
    const noSelection = () => {
        setSelectedContact(null);  // This will trigger the transition in the parent component (MainLayout)
    };

    return (
        <nav className={`navbar ${styles.con}`}>
            <div className={`container-fluid`}>
                <span className={`navbar-brand d-flex ${styles.brand}`}>
                    <Link onClick={noSelection}>
                        <i className={`fa-solid fa-arrow-left mx-2 ${styles.arrow}`}></i>
                    </Link>
                    <div className={styles.circularImage}>
                        <img src={selectedContact.profilePicture} alt={selectedContact.userName
} className="flex-fill" />
                    </div>
                    {selectedContact.userName
}
                </span>
            </div>
        </nav>
    );
};

export default NameBar;
