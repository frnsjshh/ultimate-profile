import React from 'react';

const ThemeToggle = ({ toggleTheme }) => {
    return (
        <label className="switch">
            <input type="checkbox" onChange={toggleTheme} />
            <div className="slider">
                <div className="star star_1"></div>
                <div className="star star_2"></div>
                <div className="star star_3"></div>
                <div className="cloud"></div>
            </div>
        </label>
    );
};

export default ThemeToggle;
