import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Map, Users, Wallet, ArrowRight, Sparkles, Compass, Heart, Camera } from 'lucide-react';

const LandingPage = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="landing-page overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1]">
                <div className="animated-grid" />
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
            </div>

            {/* Navbar */}
            <nav className="navbar">
                <div className="container nav-container">
                    <div className="brand flex items-center gap-2">
                        <Plane className="text-purple-600 rotate-45" size={28} />
                        TravelTales
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-glass"
                    >
                        Sign In
                    </motion.button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container hero relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ zIndex: 20 }}
                >
                    <div className="hero-badge">
                        <Sparkles size={16} fill="currentColor" />
                        <span>AI-Powered Travel Planning</span>
                    </div>

                    <h1 className="hero-title">
                        Plan smarter. Travel happier. <br />
                        <span className="gradient-text">Let AI handle the chaos.</span>
                    </h1>

                    <p className="hero-subtitle">
                        Say goodbye to travel stress. Get personalized itineraries, real-time budget tracking, and crowd forecasts in seconds.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button className="btn-primary">
                            Get Started <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </motion.div>

                {/* 3D Visual Composition */}
                <div className="hero-visual perspective-container">
                    <motion.div
                        className="hero-3d-card"
                        style={{ y: y1 }}
                        initial={{ rotateX: 20, rotateY: -20, opacity: 0, scale: 0.9 }}
                        animate={{ rotateX: 10, rotateY: -10, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {/* Fake UI Header */}
                        <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-100">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Trip to Kyoto</h2>
                                <p className="text-gray-500 text-sm">March 15 - March 22 • 2 Travelers</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Users size={20} className="text-gray-600" />
                            </div>
                        </div>

                        {/* Fake Itinerary List */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Day 1 Card */}
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <div className="text-xs font-bold text-purple-600 mb-2 uppercase tracking-wide">Day 01</div>
                                <div className="h-32 rounded-lg bg-gray-300 mb-3 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400)' }}></div>
                                <div className="font-bold text-gray-800">Arashiyama Bamboo Grove</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <Users size={12} /> Low Crowds • 8:00 AM
                                </div>
                            </div>

                            {/* Day 2 Card */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Day 02</div>
                                <div className="h-32 rounded-lg bg-gray-300 mb-3 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1528360983277-13d9012356ee?auto=format&fit=crop&q=80&w=400)' }}></div>
                                <div className="font-bold text-gray-800">Fushimi Inari Shrine</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <Wallet size={12} /> Free Entry
                                </div>
                            </div>

                            {/* Day 3 Card */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm opacity-60">
                                <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Day 03</div>
                                <div className="h-4 rounded-full bg-gray-100 mb-3 w-3/4"></div>
                                <div className="h-4 rounded-full bg-gray-100 mb-2 w-1/2"></div>
                                <div className="h-32 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 text-sm">
                                    Planning...
                                </div>
                            </div>
                        </div>

                        {/* Floating Widgets */}
                        <motion.div
                            className="floating-card card-top-right hidden md:flex"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="icon-box icon-green" style={{ width: 40, height: 40, fontSize: '1.2rem' }}><Wallet size={20} /></div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">Total Budget</div>
                                <div className="text-lg font-bold text-gray-800">$2,450</div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="floating-card card-bottom-left hidden md:flex"
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <div className="icon-box icon-orange" style={{ width: 40, height: 40, fontSize: '1.2rem' }}><Map size={20} /></div>
                            <div>
                                <div className="text-xs text-xs text-gray-500 font-medium">Local Gems</div>
                                <div className="text-sm font-bold text-gray-800">5 Found Nearby</div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Everything you need</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            We combine advanced AI with local insights to create the perfect travel experience.
                        </p>
                    </motion.div>

                    <div className="features-grid">
                        <FeatureCard
                            icon={<Sparkles size={28} />}
                            title="AI Itineraries"
                            desc="Generates full day-by-day plans based on your vibe, budget, and pace in seconds."
                            colorClass="icon-purple"
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Wallet size={28} />}
                            title="Smart Budget"
                            desc="Predict costs for flights, hotels, and daily expenses with real-time tracking."
                            colorClass="icon-green"
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Users size={28} />}
                            title="Crowd Radar"
                            desc="Know when to visit. Our AI predicts crowd levels so you can skip the lines."
                            colorClass="icon-blue"
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={<Compass size={28} />}
                            title="Hidden Gems"
                            desc="Discover secret spots and local favorites that typical travel guides miss."
                            colorClass="icon-orange"
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
                        <Plane size={20} />
                    </div>
                    <p>&copy; {new Date().getFullYear()} TravelTales. Built with AI & <Heart size={14} className="inline text-red-400" fill="currentColor" />.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, colorClass, delay }) => (
    <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
    >
        <div className={`icon-box ${colorClass} mb-6 icon-glow`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">
            {desc}
        </p>
    </motion.div>
);

export default LandingPage;
