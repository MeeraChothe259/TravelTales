import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Youtube, Play, ExternalLink, User } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const VlogsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { vlogs, destination } = location.state || { vlogs: [], destination: 'Unknown' };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', padding: '2rem' }}>
            {/* Header */}
            <header style={{ maxWidth: '1200px', margin: '0 auto 3rem auto', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '50%', padding: '0.8rem', cursor: 'pointer', display: 'flex' }}
                >
                    <ArrowLeft size={24} color="#FF0000" />
                </button>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800' }}>
                        {t('vlogsTitle')} {destination}
                    </h1>
                    <p style={{ color: 'var(--text-sub)', fontSize: '1.1rem' }}>
                        {t('vlogsSub')}
                    </p>
                </div>
            </header>

            {/* Content Grid */}
            <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {vlogs.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
                        {vlogs.map((vlog, index) => {
                            const isPlaceholder = !vlog.url || vlog.url.includes('VIDEO_ID');
                            const finalUrl = isPlaceholder
                                ? `https://www.youtube.com/results?search_query=${encodeURIComponent(destination + ' ' + vlog.title)}`
                                : vlog.url;
                            const finalThumbnail = isPlaceholder || vlog.thumbnail.includes('VIDEO_ID')
                                ? `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80`
                                : vlog.thumbnail;

                            return (
                                <motion.div
                                    key={vlog.id || index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}
                                    onClick={() => window.open(finalUrl, '_blank')}
                                >
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: '16/9',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }}>
                                        <img
                                            src={finalThumbnail}
                                            alt={vlog.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'rgba(0,0,0,0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                        }} className="vlog-overlay">
                                            <div style={{ background: 'white', borderRadius: '50%', padding: '1rem' }}>
                                                <Play color="#FF0000" fill="#FF0000" size={32} />
                                            </div>
                                        </div>
                                        {isPlaceholder && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                background: 'rgba(255,255,255,0.9)',
                                                padding: '4px 10px',
                                                borderRadius: '8px',
                                                fontSize: '0.7rem',
                                                fontWeight: 'bold',
                                                color: '#E11D48',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Youtube size={14} /> AI RECOMMENDED
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                            {isPlaceholder ? 'YouTube Search' : 'YouTube'}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <User size={20} color="var(--text-sub)" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '600', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                {vlog.title}
                                            </h3>
                                            <div style={{ color: 'var(--text-sub)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                {vlog.youtuber} • <ExternalLink size={12} /> {isPlaceholder ? 'Search on YouTube' : 'Watch Now'}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <div style={{ background: 'rgba(255,0,0,0.05)', p: '2rem', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                            <Youtube size={48} color="#FF0000" />
                        </div>
                        <h2>{t('noVlogsFound')}</h2>
                        <p>{t('checkBackLater')}</p>
                    </div>
                )}
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                div:hover > .vlog-overlay {
                    opacity: 1 !important;
                }
            `}} />
        </div>
    );
};

export default VlogsPage;
