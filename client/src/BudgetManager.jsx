import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, User, Calendar, AlertTriangle, Users, RotateCcw } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const BudgetManager = ({ details }) => {
    const { t } = useLanguage();
    if (!details) return null;

    const { totalEstimated, travelers, dayWise, currency } = details;
    const initialTravelers = parseInt(travelers) || 1;
    const [numPersons, setNumPersons] = useState(initialTravelers);

    // --- SMART BUDGET MODEL ---
    // We assume about 40% of trip costs are "Fixed/Shared" (Hotels, Car Rental)
    // and 60% are "Individual" (Food, Entry Tickets, Flights)
    const SHARED_RATIO = 0.4;
    const INDIVIDUAL_RATIO = 0.6;

    const budgetStats = useMemo(() => {
        // Calculate base components from the original estimate
        const individualBaseTotal = totalEstimated * INDIVIDUAL_RATIO;
        const sharedBaseTotal = totalEstimated * SHARED_RATIO;

        const perPersonIndividualCost = individualBaseTotal / initialTravelers;

        // Calculate New Totals
        const currentIndividualTotal = perPersonIndividualCost * numPersons;
        const currentTotal = sharedBaseTotal + currentIndividualTotal;
        const currentSplit = currentTotal / numPersons;

        // Day-wise calculation using the same shared/individual logic
        const updatedDayWise = dayWise.map(day => {
            const dayIndividualBase = day.total * INDIVIDUAL_RATIO;
            const daySharedBase = day.total * SHARED_RATIO;

            const perPersonDayIndividual = dayIndividualBase / initialTravelers;
            const currentDayTotal = daySharedBase + (perPersonDayIndividual * numPersons);

            // Targets also scale slightly but stay harder to reach for larger groups
            const currentDayTarget = (day.target * SHARED_RATIO) + ((day.target * INDIVIDUAL_RATIO / initialTravelers) * numPersons);

            const overspendPercent = currentDayTotal > currentDayTarget
                ? Math.round(((currentDayTotal - currentDayTarget) / currentDayTarget) * 100)
                : 0;

            return {
                ...day,
                total: currentDayTotal,
                target: currentDayTarget,
                overspendPercent
            };
        });

        return {
            total: currentTotal,
            split: currentSplit,
            dayWise: updatedDayWise
        };
    }, [totalEstimated, initialTravelers, dayWise, numPersons]);

    const handleReset = () => {
        setNumPersons(initialTravelers);
    };

    return (
        <div className="card budget-manager-container">
            <div className="intel-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={20} color="var(--success)" /> {t('smartBudget')}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('budgetAnalysis')}</p>
                </div>
                {numPersons !== initialTravelers && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handleReset}
                        className="btn-icon"
                        title={t('reset')}
                        style={{ padding: '0.5rem', borderRadius: '50%', background: 'var(--bg-body)', border: '1px solid var(--border-light)' }}
                    >
                        <RotateCcw size={16} color="var(--text-muted)" />
                    </motion.button>
                )}
            </div>

            <div style={{ padding: '1.5rem 1.5rem 0' }}>
                <div className="flex items-center gap-3 p-3" style={{ background: 'var(--bg-body)', borderRadius: '12px', border: '1px solid var(--border-light)', transition: 'all 0.3s ease' }}>
                    <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '8px' }}>
                        <Users size={20} color="var(--primary)" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="numPersons" style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.1rem', letterSpacing: '0.05em' }}>{t('numTravelers')}</label>
                        <input
                            id="numPersons"
                            type="number"
                            min="1"
                            max="50"
                            value={numPersons}
                            onChange={(e) => setNumPersons(Math.max(1, parseInt(e.target.value) || 1))}
                            style={{
                                width: '100%',
                                border: 'none',
                                background: 'transparent',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                outline: 'none',
                                color: 'var(--primary)',
                                padding: 0
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="budget-stats-grid" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="stat-card" style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    <span className="stat-label" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t('totalTripCost')}</span>
                    <motion.strong
                        key={budgetStats.total}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="stat-value"
                        style={{ display: 'block', fontSize: '1.25rem', color: 'var(--text-main)' }}
                    >
                        {currency} ${Math.round(budgetStats.total).toLocaleString()}
                    </motion.strong>
                </div>
                <div className="stat-card" style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    <span className="stat-label" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t('perPerson')}</span>
                    <motion.strong
                        key={budgetStats.split}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="stat-value"
                        style={{ display: 'block', fontSize: '1.25rem', color: 'var(--success)' }}
                    >
                        {currency} ${Math.round(budgetStats.split).toLocaleString()}
                    </motion.strong>
                </div>
            </div>

            <div className="day-splits" style={{ padding: '0 1.5rem 1.5rem' }}>
                <h4 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <Calendar size={18} color="var(--primary)" /> {t('dayWiseForecast')}
                </h4>
                <div className="flex flex-col gap-4">
                    {budgetStats.dayWise.map((day, idx) => (
                        <div key={idx} className="day-budget-row">
                            <div className="flex justify-between items-center mb-2">
                                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)' }}>{t('day')} {day.day}</span>
                                <div style={{ textAlign: 'right' }}>
                                    <motion.span
                                        key={day.total}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block' }}
                                    >
                                        ${Math.round(day.total).toLocaleString()}
                                    </motion.span>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Target: ${Math.round(day.target).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="budget-bar-bg" style={{ height: '8px', background: '#E2E8F0', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                                <motion.div
                                    className="budget-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((day.total / day.target) * 100, 100)}% ` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    style={{
                                        background: day.overspendPercent > 0 ? 'linear-gradient(90deg, #EF4444, #F87171)' : 'linear-gradient(90deg, #10B981, #34D399)',
                                        height: '100%',
                                        borderRadius: '10px'
                                    }}
                                />
                            </div>
                            <AnimatePresence>
                                {day.overspendPercent > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div className="overspend-alert" style={{ background: '#FEF2F2', padding: '0.4rem 0.8rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #FEE2E2' }}>
                                            <AlertTriangle size={14} color="#EF4444" />
                                            <span style={{ color: '#991B1B', fontSize: '0.75rem', fontWeight: '600' }}>{day.overspendPercent}% {t('groupBudgetAlert')} 🚨</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            <div className="partner-split-card" style={{ margin: '0 1.5rem 1.5rem', padding: '1.25rem', background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', borderRadius: '16px', border: '1px solid #BAE6FD', boxShadow: '0 4px 12px rgba(186, 230, 253, 0.2)' }}>
                <div className="flex items-center gap-4">
                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '12px', color: 'var(--primary)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <User size={24} />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, color: '#0369A1', fontSize: '1rem' }}>{t('finalSplit')}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#0C4A6E', opacity: 0.8 }}>{t('forecastFor')} {numPersons} {numPersons === 1 ? t('traveler') : t('travelersLabel')}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <motion.strong
                            key={budgetStats.split}
                            initial={{ scale: 1.1, color: '#0EA5E9' }}
                            animate={{ scale: 1, color: 'var(--primary)' }}
                            style={{ fontSize: '1.5rem', display: 'block', lineHeight: 1 }}
                        >
                            ${Math.round(budgetStats.split).toLocaleString()}
                        </motion.strong>
                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('perPerson')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetManager;

