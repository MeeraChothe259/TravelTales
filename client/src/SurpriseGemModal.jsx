import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, ArrowRight } from 'lucide-react';

const SurpriseGemModal = ({
    showSurpriseModal,
    surpriseGem,
    showSwapOptions,
    setShowSurpriseModal,
    handleAddGem,
    handleSwapActivity,
    modifiedPlan
}) => {
    if (!showSurpriseModal || !surpriseGem) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '2rem'
            }}
            onClick={() => setShowSurpriseModal(false)}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                }}
            >
                {!showSwapOptions ? (
                    <div style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={28} /> Hidden Gem Discovered!
                            </h2>
                            <button onClick={() => setShowSurpriseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>


                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{surpriseGem.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>{surpriseGem.description}</p>

                        <div style={{ background: '#FEF3C7', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid #F59E0B' }}>
                            <strong style={{ color: '#92400E', fontSize: '0.85rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Why It's Underrated</strong>
                            <p style={{ margin: 0, color: '#78350F' }}>{surpriseGem.whyUnderrated}</p>
                        </div>

                        <button
                            onClick={handleAddGem}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <ArrowRight size={20} /> Add to My Itinerary
                        </button>
                    </div>
                ) : (
                    <div style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0, color: 'var(--primary)' }}>Replace a Safe-to-Skip Activity</h2>
                            <button onClick={() => setShowSurpriseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Select which activity you'd like to replace with <strong>{surpriseGem.title}</strong>:</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflow: 'auto' }}>
                            {modifiedPlan?.itinerary?.map((day, dayIndex) => (
                                ['morning', 'afternoon', 'evening'].map(slotKey => {
                                    const activity = day[slotKey];
                                    if (!activity || !activity.safeToSkip) return null;

                                    return (
                                        <motion.div
                                            key={`${dayIndex}-${slotKey}`}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => handleSwapActivity(dayIndex, slotKey)}
                                            style={{
                                                padding: '1rem',
                                                background: '#F0FDF4',
                                                border: '2px solid #BBF7D0',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <strong style={{ color: 'var(--text-main)' }}>{activity.title}</strong>
                                                <span style={{ fontSize: '0.75rem', background: '#22C55E', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '50px' }}>Safe to Skip</span>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                Day {day.day} • {slotKey.charAt(0).toUpperCase() + slotKey.slice(1)} • {activity.time}
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ))}</div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default SurpriseGemModal;
