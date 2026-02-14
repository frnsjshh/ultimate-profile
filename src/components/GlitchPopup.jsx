import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GlitchPopup = ({ onClose }) => {
    const [text, setText] = useState("SYSTEM WARNING");

    useEffect(() => {
        const timer = setTimeout(() => {
            setText("i don't have a dream job cuz i dont like to work");
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-950/95 backdrop-blur-md cursor-pointer" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden"
            >
                {/* Scan lines background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

                {/* Warning Icon - Huge */}
                <div className="relative z-10 mb-8 scale-150">
                    <div className="text-red-500 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                        </svg>
                    </div>
                </div>

                <h2 className="relative z-10 text-6xl md:text-8xl font-bold text-center text-red-500 font-mono mb-8 tracking-widest uppercase glitch" data-text="FATAL_ERROR">
                    FATAL_ERROR
                </h2>

                <div className="relative z-10 text-center font-mono text-white text-2xl md:text-4xl leading-relaxed max-w-4xl">
                    <span className="bg-red-600/20 px-4 py-2 rounded inline-block shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-red-500/50">
                        {text}
                    </span>
                </div>

                <p className="absolute bottom-10 text-red-400/50 font-mono text-sm animate-pulse">
                    CLICK ANYWHERE TO REBOOT SYSTEM
                </p>

            </motion.div>
        </div>,
        document.body
    );
};

export default GlitchPopup;
