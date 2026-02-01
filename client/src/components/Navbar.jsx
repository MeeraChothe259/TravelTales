import React from 'react';
import { Plane, Globe, Search, ChevronDown, User, LogOut, Bookmark, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useCurrency } from '../CurrencyContext';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ children }) => {
    const navigate = useNavigate();
    const { t, setLanguage, language } = useLanguage();
    const {
        countries,
        selectedCountry,
        handleSelectCountry,
        currencySymbol
    } = useCurrency();
    const { user, isAuthenticated, logout } = useAuth();

    const [showCountryPicker, setShowCountryPicker] = React.useState(false);
    const [countrySearch, setCountrySearch] = React.useState('');

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase())
    );

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'ru', name: 'Русский' }
    ];

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center w-full">
                <Link to="/" className="logo">
                    <Plane size={28} />
                    {t('appName')}
                </Link>

                <div className="flex items-center gap-4">
                    {/* Country Picker */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowCountryPicker(!showCountryPicker)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: '#F1F5F9',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '50px',
                                border: '1px solid #E2E8F0',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: 'var(--text-main)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {selectedCountry ? (
                                <>
                                    <img src={selectedCountry.flag} alt="" style={{ width: '18px', borderRadius: '2px' }} />
                                    <span style={{ fontSize: '0.75rem' }}>{selectedCountry.currency}</span>
                                </>
                            ) : (
                                <>
                                    <Globe size={16} color="var(--primary)" />
                                    <span>Select Country</span>
                                </>
                            )}
                            <ChevronDown size={14} style={{ opacity: 0.5 }} />
                        </button>

                        <AnimatePresence>
                            {showCountryPicker && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={{
                                        position: 'absolute',
                                        top: '120%',
                                        right: 0,
                                        width: '240px',
                                        background: 'white',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                        border: '1px solid #E2E8F0',
                                        zIndex: 1000,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ padding: '0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                                        <div style={{ position: 'relative' }}>
                                            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                            <input
                                                type="text"
                                                placeholder="Search country..."
                                                autoFocus
                                                value={countrySearch}
                                                onChange={(e) => setCountrySearch(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                                                    fontSize: '0.85rem',
                                                    border: '1px solid #E2E8F0',
                                                    borderRadius: '8px',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ maxHeight: '250px', overflowY: 'auto', padding: '0.5rem' }}>
                                        {filteredCountries.slice(0, 30).map(c => (
                                            <div
                                                key={c.code}
                                                onClick={() => {
                                                    handleSelectCountry(c);
                                                    setShowCountryPicker(false);
                                                    setCountrySearch('');
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    padding: '0.6rem 0.75rem',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    backgroundColor: selectedCountry?.code === c.code ? '#F1F5F9' : 'transparent'
                                                }}
                                                className="country-item-hover"
                                            >
                                                <img src={c.flag} alt="" style={{ width: '20px', borderRadius: '2px' }} />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: 1.2 }}>{c.name}</span>
                                                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{c.currency}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredCountries.length === 0 && (
                                            <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>No countries found</div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="language-switcher" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F1F5F9', padding: '0.4rem 0.8rem', borderRadius: '50px', border: '1px solid #E2E8F0' }}>
                        <Globe size={16} color="var(--primary)" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                outline: 'none',
                                color: 'var(--text-main)',
                                paddingRight: '0.5rem'
                            }}
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Auth Section */}
                    {isAuthenticated ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link
                                to="/saved-itineraries"
                                style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: 'var(--primary)',
                                    textDecoration: 'none',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '50px',
                                    background: 'rgba(52, 211, 153, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                <Bookmark size={14} /> {t('savedItineraries') || 'Saved'}
                            </Link>
                            <Link
                                to="/feedback"
                                style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: '#6366f1',
                                    textDecoration: 'none',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '50px',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                <MessageSquare size={14} /> Feedback
                            </Link>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '0.8rem',
                                    fontWeight: '800',
                                    boxShadow: '0 2px 10px rgba(16, 185, 129, 0.2)'
                                }}>
                                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || <User size={14} />}
                                </div>
                                <button
                                    onClick={logout}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        fontSize: '0.8rem',
                                        color: '#ef4444',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    <LogOut size={14} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1.25rem',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                            }}
                        >
                            Login
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
