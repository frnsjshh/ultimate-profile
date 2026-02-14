import React from 'react';

const Loader = () => {
    return (
        <div className="main-container z-50 fixed inset-0 bg-dracula-bg">
            <div className="loader">
                <svg viewBox="0 0 500 150" className="w-full h-full">
                    {/* Circuit trace background */}
                    <path d="M 10,75 L 490,75" className="trace-bg" />

                    {/* Animated flows */}
                    <path d="M 10,75 L 490,75" className="trace-flow yellow" />
                    <path d="M 10,85 L 490,85" className="trace-flow blue" style={{ animationDelay: '0.2s' }} />
                    <path d="M 10,65 L 490,65" className="trace-flow red" style={{ animationDelay: '0.4s' }} />

                    {/* Chip Body */}
                    <rect x="200" y="25" width="100" height="100" className="chip-body" fill="#222" stroke="#444" strokeWidth="2" />

                    {/* Chip Pins */}
                    {[...Array(8)].map((_, i) => (
                        <line key={i} x1={200 + i * 12 + 5} y1="25" x2={200 + i * 12 + 5} y2="15" className="chip-pin" />
                    ))}
                    {[...Array(8)].map((_, i) => (
                        <line key={i + 8} x1={200 + i * 12 + 5} y1="125" x2={200 + i * 12 + 5} y2="135" className="chip-pin" />
                    ))}

                    {/* Text */}
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" className="chip-text" fontSize="14">
                        LOADING
                    </text>
                </svg>
            </div>
        </div>
    );
};

export default Loader;
