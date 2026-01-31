import React from 'react';
import { Plane, Globe } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Navbar = ({ children }) => {
    const navigate = useNavigate();
    const { t, setLanguage, language } = useLanguage();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'zh', name: '中文' },
        { code: 'ar', name: 'العربية' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'de', name: 'Deutsch' },
        { code: 'pt', name: 'Português' },
        { code: 'ja', name: '日本語' },
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
                    {children}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
