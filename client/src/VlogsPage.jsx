import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Youtube, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const VlogsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { vlogs, destination } = location.state || { vlogs: [], destination: 'your destination' };

    return (
        <div style={{ minHeight: '100vh', background: '#0F172A', color: 'white', padding: '2rem 5% 5rem 5%' }}>
            {/* Header */}
            <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, background: 'linear-gradient(to right, #F87171, #F472B6, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {t('vlogsTitle')} {destination}
                    </h1>
                    <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>{t('vlogsSub')}</p>
                </div>
            </header>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {vlogs && vlogs.length > 0 ? vlogs.map((vlog, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'rgba(30, 41, 59, 0.7)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* Thumbnail Container */}
                        <div style={{ position: 'relative', height: '200px', cursor: 'pointer' }} onClick={() => window.open(vlog.url, '_blank')}>
                            <img
                                src={vlog.thumbnail || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80`}
                                alt={vlog.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                            >
                                <div style={{ background: '#FF0000', borderRadius: '50%', padding: '1rem', color: 'white' }}>
                                    <Play size={32} fill="white" />
                                </div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                <Youtube size={14} color="#FF0000" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                YouTube
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: '1.4', height: '3.4em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {vlog.title}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>By {vlog.youtuber}</span>
                                <button
                                    onClick={() => window.open(vlog.url, '_blank')}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {t('watchNow')} <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem' }}>
                        <Youtube size={64} color="rgba(255,255,255,0.1)" style={{ marginBottom: '1rem' }} />
                        <h3>{t('noVlogsFound')}</h3>
                        <p>{t('checkBackLater')}</p>
                    </div>
                )}
            </div>

            {/* Premium Call to Action */}
            <div style={{
                marginTop: '5rem',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                borderRadius: '32px',
                padding: '3rem',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('visualizeJourney')}</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', opacity: 0.7 }}>
                    {t('vlogAuthenticDesc').replace('{destination}', destination)}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F87171' }}>4K</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{t('experience')}</div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F472B6' }}>HD+</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{t('quality')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VlogsPage;
