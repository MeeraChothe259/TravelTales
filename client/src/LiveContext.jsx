import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, ShieldAlert, ExternalLink, Wallet, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const LiveContext = ({ plan }) => {
    const { t } = useLanguage();
    const data = plan?.liveContext;

    if (!data) return null;

    return (
        <div className="card live-context-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'linear-gradient(135deg, #FDFCFB 0%, #E2D1C3 100%)', border: 'none' }}>
            <div className="intel-header">
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#845EC2' }}>
                    <Newspaper size={20} /> {t('liveDestinationUpdates') || 'Live Destination Updates'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#4B4453', opacity: 0.8 }}>Real-time news, events and safety alerts</p>
            </div>

            {/* Real-time Exchange Rate (NEW) */}
            {plan.exchangeRate && (
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--success-light)', padding: '0.5rem', borderRadius: '8px' }}>
                            <Wallet size={20} color="var(--success)" />
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('exchangeRate') || 'Exchange Rate'}</span>
                            <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>1 USD = {plan.exchangeRate} {plan.homeCurrency?.code}</strong>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <TrendingUp size={16} color="var(--success)" />
                        <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold' }}>Live Rate</span>
                    </div>
                </motion.div>
            )}

            {/* Safety Alert */}
            {data.safetyAlert && (
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        background: 'rgba(255,255,255,0.7)',
                        padding: '1rem',
                        borderRadius: '12px',
                        borderLeft: '4px solid #FF6B6B',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '0.75rem'
                    }}
                >
                    <ShieldAlert size={20} color="#FF6B6B" style={{ marginTop: '2px' }} />
                    <div>
                        <strong style={{ fontSize: '0.9rem', display: 'block', color: '#FF6B6B' }}>{t('safetyNotice') || 'Safety & Health Notice'}</strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#2C3E50' }}>{data.safetyAlert}</p>
                    </div>
                </motion.div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Real-time News */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                        < Newspaper size={16} color="var(--primary)" /> {t('localNews') || 'Recent Local News'}
                    </h4>
                    {data.news?.map((item, i) => (
                        <div key={i} style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: 'var(--text-main)' }}>{item.title}</h5>
                            <div className="flex justify-between items-center">
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.source} • {item.relevance}</span>
                                <ExternalLink size={12} color="var(--primary)" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Events */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                        <Calendar size={16} color="var(--secondary)" /> {t('upcomingEvents') || 'Upcoming Events'}
                    </h4>
                    {data.events?.map((event, i) => (
                        <div key={i} style={{ background: 'white', padding: '0.75rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <div className="flex justify-between items-start mb-1">
                                <h5 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--secondary)' }}>{event.name}</h5>
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', background: 'var(--secondary-light)', color: 'var(--secondary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{event.date}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveContext;
