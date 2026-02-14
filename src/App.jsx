import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Antigravity from './components/Antigravity';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';
import ProfileFrame from './components/ProfileFrame';

import EntryCard from './components/EntryCard';
import GlitchPopup from './components/GlitchPopup';

function App() {
  const [loading, setLoading] = useState(true);
  const [showEntryCard, setShowEntryCard] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('about');
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      setShowEntryCard(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const particleColor = theme === 'dark' ? '#bd93f9' : '#ff79c6'; // Dracula colors adapted

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-dracula-bg text-dracula-text' : 'bg-warm-bg text-warm-text'}`}>

      {/* Background - Low z-index */}
      <div className="absolute inset-0 z-0">
        <Antigravity
          count={300}
          magnetRadius={10}
          ringRadius={10}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={2}
          lerpSpeed={0.5}
          color="#FF9FFC"
          autoAnimate={true}
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <AnimatePresence mode="wait">
        {showEntryCard ? (
          <motion.div
            key="entry-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-50 h-screen w-full flex items-center justify-center"
          >
            <EntryCard onEnter={() => setShowEntryCard(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen"
          >

            {/* Header Section */}
            <header className="w-full flex justify-end p-4">
              <ThemeToggle toggleTheme={toggleTheme} />
            </header>

            <main className="flex-grow flex flex-col items-center gap-8 w-full max-w-2xl">

              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full flex justify-center"
              >
                <ProfileFrame
                  name="Francis Joshua Gacutno"
                  jobTitle="Kung kaya nila, sila ipabuhat"
                  imageUrl="/profile.png"
                />
              </motion.div>

              <div className="text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 glitch" data-text="Francis Joshua Gacutno">
                  Francis Joshua Gacutno
                </h1>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="inline-block px-6 py-2 bg-cyan-950/40 border border-cyan-500/50 rounded-full backdrop-blur-sm cursor-help hover:bg-cyan-500/20 transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <p className="text-cyan-400 font-mono text-sm md:text-base tracking-widest flex items-center gap-2">
                    <span className="opacity-70">DREAM JOB:</span>
                    <span className="font-bold text-white border-b border-cyan-400/50">SOFTWARE ENGINEER</span>
                  </p>
                </motion.div>
              </div>

              {/* Tabbed Navigation */}
              <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10">
                <div className="flex space-x-4 mb-6 border-b border-white/20 pb-2">
                  {['about', 'gaming', 'links'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 capitalize font-medium transition-colors ${activeTab === tab
                        ? 'text-pink-500 border-b-2 border-pink-500'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-[200px]"
                  >
                    {activeTab === 'about' && (
                      <div className="grid gap-6">
                        {/* Skill Log */}
                        <div className="bg-black/40 border border-cyan-500/30 p-4 rounded-lg backdrop-blur-md">
                          <h3 className="text-cyan-400 font-mono text-sm mb-2 uppercase tracking-widest">Skill Log_</h3>
                          <div className="flex justify-between text-xs text-cyan-300/70 mb-1">
                            <span>JAVA (ADVANCED)</span>
                            <span>PWR LVL: 90%</span>
                          </div>
                          <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "90%" }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-orange-500 to-red-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                            />
                          </div>

                          {/* Vibe Coder Skill */}
                          <div className="mt-4 relative group">
                            <div className="flex justify-between text-xs text-pink-400 font-bold mb-1">
                              <span className="glitch" data-text="VIBE CODER">VIBE CODER</span>
                              <span className="text-red-400 animate-pulse">10/5 STARS</span>
                            </div>
                            <div className="h-2 bg-gray-900 rounded-full border border-gray-800 relative overflow-visible">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: ["0%", "100%", "120%", "40%", "150%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                              />
                              {/* Visual Bug Artifacts */}
                              <div className="absolute -top-4 left-[80%] text-[10px] text-red-500 font-mono opacity-80 animate-bounce">
                                ERR_OVERFLOW
                              </div>
                              <div className="absolute top-2 left-[20%] w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                              <div className="absolute -bottom-2 left-[50%] w-12 h-1 bg-red-500/50 skew-x-12 animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Active Quest */}
                        <div className="bg-black/40 border border-yellow-500/30 p-4 rounded-lg backdrop-blur-md relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-20">
                            <svg className="w-16 h-16 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                          </div>
                          <h3 className="text-yellow-400 font-mono text-sm mb-4 uppercase tracking-widest">Active Quest_</h3>
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border border-yellow-500/50 rounded flex items-center justify-center">
                              <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 bg-yellow-400 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="text-white font-bold">Grinding LeetCode</p>
                              <p className="text-yellow-500/60 text-xs mt-1">Status: In Progress...</p>
                            </div>
                          </div>
                        </div>

                        {/* Passive Buffs */}
                        <div className="bg-black/40 border border-purple-500/30 p-4 rounded-lg backdrop-blur-md">
                          <h3 className="text-purple-400 font-mono text-sm mb-4 uppercase tracking-widest">Equipped Runes_</h3>
                          <div className="flex flex-wrap gap-2">
                            {['One Piece', 'Naruto', 'Jujutsu Kaisen'].map(anime => (
                              <span key={anime} className="px-3 py-1 bg-purple-900/30 border border-purple-500/50 rounded text-xs text-purple-200">
                                {anime}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'gaming' && (
                      <div className="grid gap-6">
                        {/* MLBB Card */}
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.5 }}
                          className="bg-black/60 border border-purple-500/50 p-4 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 origin-top cursor-pointer"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-purple-400 font-bold uppercase tracking-wider">Mobile Legends</h3>
                            <span className="text-xs text-purple-300/50 border border-purple-500/30 px-2 py-0.5 rounded">JUNGLER</span>
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-gray-400 font-mono mb-1">CURRENT RANK</p>
                              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">
                                Mythical Immortal
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 font-mono mb-1">WIN RATE</p>
                              <div className="text-purple-300">Objective: 100%</div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Valorant Card */}
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="bg-black/60 border border-red-500/50 p-4 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 origin-top cursor-pointer"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-red-400 font-bold uppercase tracking-wider">Valorant</h3>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                              <span className="text-xs text-red-300/50 border border-red-500/30 px-2 py-0.5 rounded">CHAMBER MAIN</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-gray-400 font-mono mb-1">CURRENT RANK</p>
                              <div className="text-2xl font-bold text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.3)]">
                                Gold <span className="text-xs opacity-50 font-normal text-white">(Hardstuck)</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 font-mono mb-1">STATUS</p>
                              <div className="text-red-300">Headhunter Only</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {activeTab === 'links' && (
                      <div className="flex justify-center items-center h-full pt-8">
                        <a
                          href="https://github.com/frnsjshh/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-[#333] text-white rounded-lg hover:bg-black transition flex items-center gap-2"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          <span>GitHub Profile</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                  {showPopup && <GlitchPopup onClose={() => setShowPopup(false)} />}
                </AnimatePresence>
              </div>

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
