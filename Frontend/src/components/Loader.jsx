import React from 'react';
import './Loader.scss';

const Loader = ({ text = "Loading..." }) => {
    return (
        <main className="loader-screen">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            <h1 className="loader-text">{text}</h1>
        </main>
    )
}

export default Loader;
