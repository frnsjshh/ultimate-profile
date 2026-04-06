import React, { useState, useEffect, useRef } from 'react';
import profilePic from './assets/profile.png';
import { motion, AnimatePresence } from 'framer-motion';
import Antigravity from './components/Antigravity';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';
import ProfileFrame from './components/ProfileFrame';

import EntryCard from './components/EntryCard';
import GlitchPopup from './components/GlitchPopup';
import { Github, Facebook, Instagram, Code, Terminal } from 'lucide-react';

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
                  jobTitle="Kung kaya nila, sa ilaha ipabuhat"
                  imageUrl={profilePic}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <a
                          href="https://github.com/frnsjshh/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 bg-black/60 border border-gray-600/50 rounded-lg hover:bg-gray-800/50 transition-all group flex items-center gap-4 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                          <Github className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="text-xs text-gray-400 font-mono">CODE REPOSITORY</p>
                            <p className="text-white font-bold">GitHub</p>
                          </div>
                        </a>

                        <a
                          href="https://leetcode.com/u/frnsjshh/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 bg-black/60 border border-yellow-600/50 rounded-lg hover:bg-yellow-900/20 transition-all group flex items-center gap-4 shadow-[0_0_10px_rgba(202,138,4,0.1)] hover:shadow-[0_0_20px_rgba(202,138,4,0.2)]"
                        >
                          <Terminal className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="text-xs text-yellow-500/70 font-mono">TRAINING GROUND</p>
                            <p className="text-yellow-400 font-bold">LeetCode</p>
                          </div>
                        </a>

                        <a
                          href="https://www.facebook.com/francis.josh.3150/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 bg-black/60 border border-blue-600/50 rounded-lg hover:bg-blue-900/20 transition-all group flex items-center gap-4 shadow-[0_0_10px_rgba(37,99,235,0.1)] hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                        >
                          <Facebook className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="text-xs text-blue-500/70 font-mono">SOCIAL NETWORK</p>
                            <p className="text-blue-400 font-bold">Facebook</p>
                          </div>
                        </a>

                        <a
                          href="https://www.facebook.com/francis.josh.3150/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 bg-black/60 border border-pink-600/50 rounded-lg hover:bg-pink-900/20 transition-all group flex items-center gap-4 shadow-[0_0_10px_rgba(236,72,153,0.1)] hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]"
                        >
                          <Instagram className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="text-xs text-pink-500/70 font-mono">IMAGE DB</p>
                            <p className="text-pink-400 font-bold">Instagram</p>
                          </div>
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
