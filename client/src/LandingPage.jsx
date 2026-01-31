import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Users, Wallet, ArrowRight, Sparkles, Compass, Heart, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';

const LandingPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="landing-page">
            <Navbar>
                <button onClick={() => navigate('/plan')} className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    {t('startPlanning')}
                </button>
            </Navbar>

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
                                ✨ {t('tagline')}
                            </span>
                            <h1>
                                {t('heroTitle').split(',')[0]}, <br />
                                <span className="text-gradient">{t('heroTitle').split(',')[1]}</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
                                {t('heroSubtitle')}
                            </p>
                            <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/plan')}
                                >
                                    {t('startPlanning')} <ArrowRight size={20} />
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => navigate('/discover')}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none'
                                    }}
                                >
                                    <Compass size={20} /> Not Sure Where to Go?
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
                        <h2>{t('featureTitle')}</h2>
                        <p>{t('featureSub')}</p>
                    </div>

                    <div className="features-grid">
                        <FeatureCard
                            icon={<Sparkles size={24} />}
                            title={t('aiItineraries')}
                            desc={t('aiItinerariesDesc')}
                        />
                        <FeatureCard
                            icon={<Wallet size={24} />}
                            title={t('smartBudget')}
                            desc={t('smartBudgetDesc')}
                        />
                        <FeatureCard
                            icon={<Users size={24} />}
                            title={t('crowdRadar')}
                            desc={t('crowdRadarDesc')}
                        />
                        <FeatureCard
                            icon={<Compass size={24} />}
                            title={t('hiddenGems')}
                            desc={t('hiddenGemsDesc')}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="section" style={{ padding: '2rem 0', borderTop: '1px solid #E2E8F0', background: 'white' }}>
                <div className="container text-center">
                    <div className="flex justify-center items-center gap-2" style={{ marginBottom: '1rem', opacity: 0.8 }}>
                        <Plane size={24} color="#4F46E5" />
                        <span style={{ fontWeight: 800 }}>{t('appName')}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} {t('appName')}. Built with AI & <Heart size={14} style={{ display: 'inline', color: '#EF4444' }} fill="currentColor" />.</p>
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

