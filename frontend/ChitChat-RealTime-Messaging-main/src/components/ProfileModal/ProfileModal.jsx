import React, { useState, useEffect } from "react";

const ProfileModal = ({ isOpen, onClose }) => {
    const [user, setUser] = useState({ name: "", Email: "", picture: "" });
    const [newUser, setNewUser] = useState({ name: "", Email: "", picture: "" });
    const [showChangeModal, setShowChangeModal] = useState(false);

    // Fetch user profile when modal opens
    useEffect(() => {
        if (isOpen) {
            fetch(`${import.meta.env.VITE_Back_END_Host}/getProfile`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.user) {
                        setUser({
                            name: data.user.userName,
                            Email: data.user.email,
                            picture: data.user.profilePicture,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching profile:", error);
                });
        }
    }, [isOpen]);

    const handleChangeModalToggle = () => {
        setShowChangeModal(!showChangeModal);
    };

    const handleChangeModalClose = () => {
        setShowChangeModal(false);
    };

    const handleChangeProfile = async (e) => {
        e.preventDefault();

        // Update username
        if (newUser.name) {
            try {
                const response = await fetch(`${import.meta.env.VITE_Back_END_Host}/updateUsername`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ newUsername: newUser.name }),
                });

                const result = await response.json();
                if (result.user) {
                    setUser((prevState) => ({
                        ...prevState,
                        name: result.user.userName,
                    }));
                } else {
                    console.error("Error updating username:", result.message);
                }
            } catch (error) {
                console.error("Error updating username:", error);
            }
        }

        // Upload new profile picture
        if (newUser.picture) {
            const formData = new FormData();
            formData.append("photo", newUser.picture);

            try {
                const response = await fetch(`${import.meta.env.VITE_Back_END_Host}/uploadProfilePhoto`, {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                });

                const result = await response.json();
                if (result.user) {
                    setUser((prevState) => ({
                        ...prevState,
                        picture: result.user.profilePicture,
                    }));
                } else {
                    console.error("Error uploading profile photo:", result.message);
                }
            } catch (error) {
                console.error("Error uploading profile photo:", error);
            }
        }

        // Reset new user state and close modal
        setNewUser({ name: "", picture: "" });
        handleChangeModalClose();
    };

    // Handle deleting the profile photo
    const handleDeletePhoto = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_Back_END_Host}/deleteProfilePhoto`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            if (result.user) {
                // Update user profile to the default picture
                setUser((prevState) => ({
                    ...prevState,
                    picture: result.user.profilePicture,
                }));
            } else {
                console.error("Error deleting profile photo:", result.message);
            }
        } catch (error) {
            console.error("Error deleting profile photo:", error);
        }
    };

    return (
        <>
            <div className={`modal fade ${isOpen ? 'show' : ''} shadow-lg p-3 mb-5 rounded`} style={{ display: isOpen ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden={!isOpen}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Profile</h1>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center text-center">
                            <img src={user.picture} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />
                            <h3>{user.name}</h3>
                            <h5>{user.Email}</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" onClick={onClose} style={{ backgroundColor: '#DFDCF2', color: '#9049BF' }}>
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={handleChangeModalToggle}
                                style={{ backgroundColor: '#9049BF', color: '#DFDCF2' }}
                            >
                                Change
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={handleDeletePhoto} 
                                style={{ backgroundColor: '#9049BF', color: '#DFDCF2' }}
                            >
                                Delete Photo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showChangeModal && (
                <div className={`modal fade show`} style={{ display: 'block' }} aria-labelledby="changeModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="changeModalLabel">Change Profile Information</h1>
                                <button type="button" className="btn-close" onClick={handleChangeModalClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleChangeProfile}>
                                    <div className="mb-3">
                                        <label htmlFor="pic" className="form-label">Picture</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            id="pic"
                                            name="pic"
                                            onChange={(e) => setNewUser({ ...newUser, picture: e.target.files[0] })}
                                        />
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={newUser.name}
                                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                            placeholder={user.name}
                                        />
                                    </div>
                                    <button type="submit" className="btn" style={{ backgroundColor: '#9049BF', color: '#DFDCF2' }}>
                                        Save changes
                                    </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" onClick={handleChangeModalClose} style={{ backgroundColor: '#DFDCF2', color: '#9049BF' }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileModal;
