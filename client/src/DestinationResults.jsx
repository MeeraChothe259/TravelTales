import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Calendar, DollarSign, ArrowRight, Sparkles,
    Heart, Star, TrendingUp, Globe, Plane, ChevronRight
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

const DestinationResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { suggestions, answers } = location.state || { suggestions: [], answers: {} };
    const [selectedDest, setSelectedDest] = useState(null);

    if (!suggestions || suggestions.length === 0) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>No suggestions found</h2>
                    <button onClick={() => navigate('/discover')}>Start Over</button>
                </div>
            </div>
        );
    }

    const handleSelectDestination = (destination) => {
        // Calculate suggested dates (7 days from now for 1 week trip)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 7);

        const durationDays = answers.duration === 'weekend' ? 3 :
            answers.duration === 'week' ? 7 :
                answers.duration === 'extended' ? 14 : 7;

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + durationDays);

        // Navigate to onboarding with pre-filled data
        navigate('/onboarding', {
            state: {
                prefilledData: {
                    destination: destination.name,
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                    budget: answers.budget || 2,
                    travelers: 2
                }
            }
        });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}
                >
                    <Sparkles size={48} style={{ marginBottom: '1rem' }} />
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
                        Your Perfect Destinations
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '0.5rem' }}>
                        Based on your preferences, here are our top recommendations
                    </p>
                </motion.div>

                {/* Destination Cards */}
                <div style={{ display: 'grid', gap: '2rem', marginBottom: '2rem' }}>
                    {suggestions.map((dest, index) => (
                        <motion.div
                            key={dest.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            style={{
                                background: 'white',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                position: 'relative'
                            }}
                        >
                            {/* Match Badge */}
                            {index === 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    zIndex: 10,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}>
                                    <Star size={16} fill="white" /> Best Match
                                </div>
                            )}

                            {/* Hero Image */}
                            {dest.image && (
                                <div style={{
                                    width: '100%',
                                    height: '300px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '100px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                                    }} />
                                </div>
                            )}

                            <div style={{ padding: '2.5rem' }}>
                                {/* Destination Header */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <MapPin size={28} color="#667eea" />
                                            <h2 style={{ margin: 0, fontSize: '2rem', color: '#1F2937' }}>
                                                {dest.name}
                                            </h2>
                                        </div>
                                        <p style={{
                                            fontSize: '1.1rem',
                                            color: '#6B7280',
                                            margin: '0.5rem 0 0 0',
                                            lineHeight: '1.6'
                                        }}>
                                            {dest.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Match Score */}
                                <div style={{
                                    background: '#F3F4F6',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <TrendingUp size={24} color="#10B981" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                                            Match Score
                                        </div>
                                        <div style={{
                                            background: '#E5E7EB',
                                            height: '8px',
                                            borderRadius: '10px',
                                            overflow: 'hidden'
                                        }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(dest.score / 15) * 100}%` }}
                                                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                                                style={{
                                                    height: '100%',
                                                    background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                                                    borderRadius: '10px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{
                                        fontWeight: 'bold',
                                        fontSize: '1.5rem',
                                        color: '#10B981'
                                    }}>
                                        {Math.round((dest.score / 15) * 100)}%
                                    </div>
                                </div>

                                {/* Best For */}
                                <div style={{
                                    padding: '1rem',
                                    background: '#FEF3C7',
                                    borderLeft: '4px solid #F59E0B',
                                    borderRadius: '8px',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Heart size={18} color="#F59E0B" />
                                        <strong style={{ color: '#92400E' }}>Perfect For:</strong>
                                    </div>
                                    <p style={{ margin: 0, color: '#78350F' }}>
                                        {dest.bestFor}
                                    </p>
                                </div>

                                {/* Quick Facts */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: '1rem',
                                    marginBottom: '2rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem',
                                        background: '#F9FAFB',
                                        borderRadius: '8px'
                                    }}>
                                        <DollarSign size={20} color="#667eea" />
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Budget</div>
                                            <div style={{ fontWeight: 'bold', color: '#1F2937' }}>
                                                {dest.budgetFit.includes(1) ? 'Budget' : dest.budgetFit.includes(2) ? 'Moderate' : 'Luxury'}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem',
                                        background: '#F9FAFB',
                                        borderRadius: '8px'
                                    }}>
                                        <Calendar size={20} color="#667eea" />
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Duration</div>
                                            <div style={{ fontWeight: 'bold', color: '#1F2937' }}>
                                                {answers.duration === 'weekend' ? '2-3 Days' :
                                                    answers.duration === 'week' ? '5-7 Days' :
                                                        answers.duration === 'extended' ? '10-14 Days' : 'Flexible'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectDestination(dest)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 2rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    <Plane size={24} />
                                    Plan My Trip to {dest.name.split(',')[0]}
                                    <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '3rem'
                }}>
                    <button
                        onClick={() => navigate('/discover')}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '10px',
                            border: '2px solid white',
                            background: 'transparent',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Start Over
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'white',
                            color: '#667eea',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationResults;
