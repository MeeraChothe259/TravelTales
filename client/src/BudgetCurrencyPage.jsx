import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DollarSign, ArrowLeft, Globe, RefreshCcw,
    TrendingUp, Wallet, ArrowRightLeft, Info, Users
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';

const BudgetCurrencyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { details } = location.state || {};

    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [rates, setRates] = useState({ USD: 1 });
    const [isLoading, setIsLoading] = useState(true);

    // Converter state
    const [convertAmount, setConvertAmount] = useState(100);
    const [convertFrom, setConvertFrom] = useState('USD');
    const [convertTo, setConvertTo] = useState('EUR');

    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
        { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
        { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
        { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }
    ];

    useEffect(() => {
        const fetchRates = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                setRates(data.rates);
            } catch (error) {
                console.error("Error fetching rates:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRates();
    }, []);

    const convertValue = (val, toCurr) => {
        const rate = rates[toCurr] || 1;
        return val * rate;
    };

    const currencySymbol = useMemo(() => {
        const curr = currencies.find(c => c.code === targetCurrency);
        return curr ? curr.symbol : '$';
    }, [targetCurrency]);

    if (!details) {
        return (
            <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: 'var(--bg-body)' }}>
                <div className="text-center">
                    <h2>Budget Data Missing</h2>
                    <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const [numTravelers, setNumTravelers] = useState(details?.travelers || 1);
    const initialTravelers = details?.travelers || 1;

    // --- SMART BUDGET MODEL ---
    // 40% are fixed/shared (Hotels, etc.), 60% are individual (Food, entry)
    const SHARED_RATIO = 0.4;
    const INDIVIDUAL_RATIO = 0.6;

    const currentStats = useMemo(() => {
        const individualBaseTotal = details.totalEstimated * INDIVIDUAL_RATIO;
        const sharedBaseTotal = details.totalEstimated * SHARED_RATIO;

        const perPersonIndividualCost = individualBaseTotal / initialTravelers;

        const currentTotal = sharedBaseTotal + (perPersonIndividualCost * numTravelers);
        const currentSplit = currentTotal / numTravelers;

        return { total: currentTotal, split: currentSplit };
    }, [details.totalEstimated, initialTravelers, numTravelers]);

    const convertedTotal = convertValue(currentStats.total, targetCurrency);
    const convertedPerPerson = convertValue(currentStats.split, targetCurrency);

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', paddingTop: '80px' }}>
            <Navbar />

            <div className="container" style={{ maxWidth: '1200px', padding: '2rem 1.5rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary"
                    style={{ marginBottom: '2rem', border: 'none', background: 'white' }}
                >
                    <ArrowLeft size={20} /> {t('backToTrip') || 'Back to Trip'}
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                    {/* LEFT COLUMN: Budget Summary */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card"
                            style={{ padding: '2rem' }}
                        >
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Wallet size={28} color="var(--primary)" /> {t('budgetAnalysis')}
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        {t('selectYourCurrency')}
                                    </label>
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem', background: '#F1F5F9', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                        <Globe size={20} color="var(--primary)" />
                                        <select
                                            value={targetCurrency}
                                            onChange={(e) => setTargetCurrency(e.target.value)}
                                            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '1rem', fontWeight: '600', outline: 'none', cursor: 'pointer' }}
                                        >
                                            {currencies.map(c => (
                                                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        {t('numTravelers')}
                                    </label>
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem', background: '#F1F5F9', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                        <input
                                            type="number"
                                            min="1"
                                            value={numTravelers}
                                            onChange={(e) => setNumTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                                            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '1rem', fontWeight: '600', outline: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'var(--primary-light)', padding: '1.5rem', borderRadius: '16px', border: '1px solid #C7D2FE' }}>
                                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{t('totalTripCost')}</span>
                                    <strong style={{ fontSize: '1.75rem', color: 'var(--secondary)' }}>
                                        {currencySymbol}{Math.round(convertedTotal).toLocaleString()}
                                    </strong>
                                </div>
                                <div style={{ background: '#F0FDF4', padding: '1.5rem', borderRadius: '16px', border: '1px solid #BBF7D0' }}>
                                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#166534', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{t('perPerson')}</span>
                                    <strong style={{ fontSize: '1.75rem', color: '#166534' }}>
                                        {currencySymbol}{Math.round(convertedPerPerson).toLocaleString()}
                                    </strong>
                                </div>
                            </div>



                            <div className="flex flex-col gap-4">
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <TrendingUp size={18} /> {t('dayWiseForecast')} ({targetCurrency})
                                </h4>
                                {details.dayWise.map((day, idx) => {
                                    // Calculate day-specific scaling
                                    const dayIndividualBase = day.total * INDIVIDUAL_RATIO;
                                    const daySharedBase = day.total * SHARED_RATIO;
                                    const perPersonDayIndividual = dayIndividualBase / initialTravelers;
                                    const currentDayTotal = daySharedBase + (perPersonDayIndividual * numTravelers);

                                    const dayVal = convertValue(currentDayTotal, targetCurrency);
                                    return (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                            <span style={{ fontWeight: '800' }}>{t('day')} {day.day}</span>
                                            <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{currencySymbol}{Math.round(dayVal).toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Currency Converter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card"
                            style={{ padding: '2rem', background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)' }}
                        >
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <ArrowRightLeft size={28} color="var(--primary)" /> {t('currencyConverter')}
                            </h2>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('amount')}</label>
                                    <input
                                        type="number"
                                        value={convertAmount}
                                        onChange={(e) => setConvertAmount(e.target.value)}
                                        className="input-field"
                                        style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'flex-end' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('from')}</label>
                                        <select
                                            value={convertFrom}
                                            onChange={(e) => setConvertFrom(e.target.value)}
                                            className="input-field"
                                            style={{ padding: '0.75rem' }}
                                        >
                                            {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ paddingBottom: '0.75rem' }}>
                                        <RefreshCcw size={20} color="var(--text-light)" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('to')}</label>
                                        <select
                                            value={convertTo}
                                            onChange={(e) => setConvertTo(e.target.value)}
                                            className="input-field"
                                            style={{ padding: '0.75rem' }}
                                        >
                                            {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'var(--primary-light)', borderRadius: '16px', textAlign: 'center' }}>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('convertedAmount')}</span>
                                    <strong style={{ fontSize: '2rem', color: 'var(--primary)' }}>
                                        {Math.round(convertAmount * (rates[convertTo] / rates[convertFrom])).toLocaleString()} {convertTo}
                                    </strong>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: '#FFFBEB', borderRadius: '12px', border: '1px solid #FEF3C7', marginTop: '1rem' }}>
                                    <Info size={16} color="#B45309" />
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#92400E' }}>
                                        {t('ratesDisclaimer') || 'Rates are updated in real-time. Please note that actual bank rates may vary.'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BudgetCurrencyPage;
