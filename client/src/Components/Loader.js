import React from 'react';
import './Loader.css'; // Import the CSS for styling the loader

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div className="loader-inner"></div>
                <div style={{ width: '100%' }} className=' w-full text-sm text-center'>Loading...</div>
            </div>
        </div>
    );
};

export default Loader;
