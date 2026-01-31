import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Sparkles, Info } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const HiddenGemsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { hiddenGems, destination } = location.state || { hiddenGems: [], destination: 'your destination' };

    return (
        <div style={{ minHeight: '100vh', background: '#0F172A', color: 'white', padding: '2rem 5% 5rem 5%' }}>
            {/* Header */}
            <header style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: '3rem',
                            margin: 0,
                            fontWeight: '800',
                            background: 'linear-gradient(to right, #A855F7, #EC4899, #F43F5E)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Hidden Gems: {destination}
                    </motion.h1>
                    <p style={{ opacity: 0.6, fontSize: '1.2rem', marginTop: '0.5rem' }}>Underrated spots that locals keep to themselves</p>
                </div>
            </header>

            {/* Gems Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                gap: '3rem'
            }}>
                {hiddenGems && hiddenGems.length > 0 ? hiddenGems.map((gem, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -10 }}
                        style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            backdropFilter: 'blur(16px)',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative'
                        }}
                    >
                        {/* Image Section */}
                        <div style={{ position: 'relative', height: '300px' }}>
                            <img
                                src={gem.imageUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'}
                                alt={gem.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.9) 100%)'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(168, 85, 247, 0.9)',
                                padding: '8px 16px',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)'
                            }}>
                                <Sparkles size={14} /> HIDDEN GEM
                            </div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '25px', right: '25px' }}>
                                <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: '700' }}>{gem.title}</h2>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div style={{ padding: '2rem' }}>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', opacity: 0.8, margin: '0 0 2rem 0' }}>
                                {gem.description}
                            </p>

                            <div style={{
                                background: 'rgba(168, 85, 247, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '20px',
                                border: '1px solid rgba(168, 85, 247, 0.2)',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#C084FC', marginBottom: '0.75rem' }}>
                                    <Info size={18} />
                                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Why it's underrated</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '1rem', color: '#E9D5FF', fontStyle: 'italic' }}>
                                    "{gem.whyUnderrated}"
                                </p>
                            </div>

                            <button
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${gem.coords.lat},${gem.coords.lng}`, '_blank')}
                                style={{
                                    width: '100%',
                                    background: 'white',
                                    color: '#0F172A',
                                    border: 'none',
                                    padding: '1.25rem',
                                    borderRadius: '16px',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <MapPin size={20} /> Get Directions
                            </button>
                        </div>
                    </motion.div>
                )) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '10rem 0' }}>
                        <Sparkles size={80} color="rgba(168, 85, 247, 0.2)" style={{ marginBottom: '2rem' }} />
                        <h3 style={{ fontSize: '2rem', opacity: 0.8 }}>Missing Secrets?</h3>
                        <p style={{ opacity: 0.6, maxWidth: '500px', margin: '1rem auto 2rem auto' }}>
                            It looks like this trip plan was generated before the "Hidden Gems" feature was added. Generate a fresh plan to unlock city secrets!
                        </p>
                        <button
                            onClick={() => navigate('/onboarding', { state: { prefilledData: { destination } } })}
                            style={{
                                background: 'linear-gradient(to right, #A855F7, #EC4899)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(168, 85, 247, 0.3)'
                            }}
                        >
                            Generate Fresh Plan
                        </button>
                    </div>
                )}
            </div>

            {/* Premium CTA Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    marginTop: '8rem',
                    padding: '4rem',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    borderRadius: '48px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}
            >
                <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', marginBottom: '2rem' }}>
                    <Sparkles size={32} color="#A855F7" />
                </div>
                <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Explore Like a Local</h2>
                <p style={{ maxWidth: '700px', margin: '0 auto 3rem auto', opacity: 0.6, fontSize: '1.2rem', lineHeight: '1.6' }}>
                    Our AI cross-references social data, local blogs, and historical archives to find places that haven't been "discovered" by the masses yet. Enjoy the quiet side of {destination}.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#A855F7' }}>Zero</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.4, textTransform: 'uppercase' }}>Crowds</div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#EC4899' }}>100%</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.4, textTransform: 'uppercase' }}>Authentic</div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#F43F5E' }}>Verified</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.4, textTransform: 'uppercase' }}>Local Spots</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HiddenGemsPage;
