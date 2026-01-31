import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Map, Users, Wallet, ArrowRight, Sparkles, Compass, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="container nav-container">
                    <div className="brand">
                        <Plane className="text-indigo-600" size={28} />
                        TravelTales
                    </div>
                    <button className="btn btn-secondary">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-wrapper">
                <div className="container">
                    <div className="hero-grid">
                        <motion.div
                            className="hero-content"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="hero-badge">
                                ✨ AI-Powered Travel Planning
                            </span>
                            <h1>
                                Plan smarter. Travel happier. <br />
                                <span className="text-gradient">Let AI handle the chaos.</span>
                            </h1>
                            <p className="hero-subtitle">
                                Say goodbye to travel stress. Get personalized itineraries, real-time budget tracking, and crowd forecasts in seconds.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/plan')}
                                >
                                    Get Started <ArrowRight size={20} />
                                </button>
                                <button className="btn btn-secondary">
                                    View Demo
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero-image-container"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
                                alt="Travel"
                                className="hero-main-img"
                            />

                            {/* Floating Widget 1 */}
                            <motion.div
                                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <Wallet size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase">Budget</div>
                                    <div className="text-sm font-bold text-gray-900">On Track</div>
                                </div>
                            </motion.div>

                            {/* Floating Widget 2 */}
                            <motion.div
                                className="absolute top-10 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase">Crowd Level</div>
                                    <div className="text-sm font-bold text-gray-900">Low Traffic</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Everything you need for the perfect trip</h2>
                        <p>We combine advanced AI with local insights to create the perfect travel experience tailored just for you.</p>
                    </div>

                    <div className="features-grid">
                        <FeatureCard
                            icon={<Sparkles size={24} />}
                            title="AI Itineraries"
                            desc="Generates full day-by-day plans based on your vibe, budget, and pace in seconds."
                        />
                        <FeatureCard
                            icon={<Wallet size={24} />}
                            title="Smart Budget"
                            desc="Predict costs for flights, hotels, and daily expenses with real-time tracking."
                        />
                        <FeatureCard
                            icon={<Users size={24} />}
                            title="Crowd Radar"
                            desc="Know when to visit. Our AI predicts crowd levels so you can skip the lines."
                        />
                        <FeatureCard
                            icon={<Compass size={24} />}
                            title="Hidden Gems"
                            desc="Discover secret spots and local favorites that typical travel guides miss."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="flex justify-center items-center gap-2 mb-4 opacity-70">
                        <Plane size={24} className="text-indigo-600" />
                        <span className="font-bold text-gray-900">TravelTales</span>
                    </div>
                    <p>&copy; {new Date().getFullYear()} TravelTales. Built with AI & <Heart size={14} className="inline text-red-500" fill="currentColor" />.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="feature-card">
        <div className="feature-icon">
            {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p>{desc}</p>
    </div>
);

export default LandingPage;
