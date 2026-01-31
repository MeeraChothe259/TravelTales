import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Users, Wallet, ArrowRight, Sparkles, Compass, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="container flex justify-between items-center w-full">
                    <div className="logo">
                        <Plane size={28} />
                        TravelTales
                    </div>
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
                            <span className="badge" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#EEF2FF', color: '#4F46E5', borderRadius: '50px', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                ✨ AI-Powered Travel Planning
                            </span>
                            <h1>
                                Plan smarter. Travel happier. <br />
                                <span className="text-gradient">Let AI handle the chaos.</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
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
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80"
                                alt="Travel"
                                className="hero-image"
                                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', transform: 'rotate(2deg)' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section" style={{ background: '#F8FAFC' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 4rem auto' }}>
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
            <footer className="section" style={{ padding: '2rem 0', borderTop: '1px solid #E2E8F0', background: 'white' }}>
                <div className="container text-center">
                    <div className="flex justify-center items-center gap-2" style={{ marginBottom: '1rem', opacity: 0.8 }}>
                        <Plane size={24} color="#4F46E5" />
                        <span style={{ fontWeight: 800 }}>TravelTales</span>
                    </div>
                    <p style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} TravelTales. Built with AI & <Heart size={14} style={{ display: 'inline', color: '#EF4444' }} fill="currentColor" />.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="card">
        <div className="feature-icon-box">
            {icon}
        </div>
        <h3>{title}</h3>
        <p style={{ fontSize: '0.95rem' }}>{desc}</p>
    </div>
);

export default LandingPage;
