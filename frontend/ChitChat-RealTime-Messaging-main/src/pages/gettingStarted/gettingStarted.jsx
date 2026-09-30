import React, { useState } from "react";
import MainLayout from "../../components/MainPage/MainPage";

const GettingStartedModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // Modal starts as open

    const handleAddPeople = () => {
        setIsModalOpen(false); 
        //will navigate to the add component it's done 
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <>
            {isModalOpen && (
                <div
                    className="modal-overlay"
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1050,
                    }}
                >
                    <div
                        className="modal-dialog shadow-lg p-3 mb-5 rounded"
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '15px',
                            padding: '20px',
                            width: '50%',
                            zIndex: 1060,
                        }}
                    >
                        <div className="modal-content d-flex flex-column align-items-center text-center">
                            <div className="modal-header">
                                <h5 className="modal-title">Woo Hoo! You Made it</h5>
                                {/* <button type="button" className="btn-close " aria-label="Close" onClick={handleCloseModal}></button> */}
                            </div>
                            <div className="modal-body ">
                                <img src="/people.jpg" style={{ width: '50%', borderRadius: '50%' }} alt="People" />
                                <h5>Get In Touch With Your People Now!</h5>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn m-3"
                                    onClick={handleCloseModal}
                                    style={{ backgroundColor: '#DFDCF2', color: '#9049BF' }}
                                >
                                    Skip
                                </button>
                                <button
                                    type="button"
                                    className="btn m-3"
                                    style={{ backgroundColor: '#9049BF', color: '#DFDCF2' }}
                                    onClick={handleAddPeople}
                                >
                                    Add People
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <MainLayout />
        </>
    );
};

export default GettingStartedModal;
