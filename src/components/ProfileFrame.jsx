import React from 'react';

const ProfileFrame = ({ imageUrl, name, jobTitle, tags }) => {
    return (
        <div className="holo-card p-6 relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] max-w-sm w-full">
            {/* Online Status Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-green-500/50">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-mono text-green-400">ONLINE</span>
            </div>

            <div className="flex flex-col items-center mt-4">
                {/* Image Frame with Glow */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 rounded-full"></div>
                    <img
                        src={imageUrl || "https://placehold.co/150"}
                        alt={name}
                        className="w-32 h-32 rounded-full border-2 border-cyan-400/50 object-cover relative z-10"
                    />
                </div>

                {/* Name & Title */}
                <h2 className="text-2xl font-bold text-white mb-1 glitch hover:text-cyan-300 transition-colors cursor-default" data-text={name}>
                    {name}
                </h2>
                <p className="text-cyan-300/80 font-mono text-sm tracking-wider uppercase">[{jobTitle}]</p>

                {/* Decorative HUD Lines */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-6"></div>

                <button className="px-6 py-2 bg-cyan-950/30 border border-cyan-500/50 text-cyan-400 font-mono text-sm rounded hover:bg-cyan-500/20 transition-all duration-300 w-full hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] uppercase tracking-widest">
                    Initialize_Comm.exe
                </button>
            </div>
        </div>
    );
};

export default ProfileFrame;
