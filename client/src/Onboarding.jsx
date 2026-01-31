import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const Onboarding = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);

    // Get prefilled data from location state (from Destination Discovery)
    const prefilledData = location.state?.prefilledData || {};

    const [formData, setFormData] = useState({
        destination: prefilledData.destination || '',
        startDate: prefilledData.startDate || '',
        endDate: prefilledData.endDate || '',
        partners: '',
        mood: '',
        budget: prefilledData.budget || 2,
        budgetSplit: 'equal',
        preferences: [],
        constraints: [],
        safety: [],
        travelerCount: prefilledData.travelers || 1
    });

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

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleSelection = (field, item) => {
        setFormData(prev => {
            const current = prev[field];
            if (current.includes(item)) {
                return { ...prev, [field]: current.filter(i => i !== item) };
            } else {
                return { ...prev, [field]: [...current, item] };
            }
        });
    };

    const handleGenerate = async () => {
        if (!formData.destination || !formData.startDate || !formData.endDate) {
            alert(t('fillBasicsAlert'));
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5005/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, language })
            });

            const data = await response.json();

            if (data.success) {
                navigate('/trip', { state: { plan: data.plan } });
            } else {
                alert("Failed to generate plan. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Is the server running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <header className="text-center" style={{ marginBottom: '3rem' }}>
                <h2>{t('letPlanTrip')}</h2>
                <p>{t('onboardingSub')}</p>
            </header>

            <div className="input-container">
                {/* Card 1: Destination */}
                <InputCard number="1" title={t('whereTo')} subtitle={t('whereToSub')}>
                    <input
                        type="text"
                        placeholder={t('destPlaceholder')}
                        className="input-field"
                        value={formData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                    />
                </InputCard>

                {/* Card 2: Dates */}
                <InputCard number="2" title={t('whenGoing')} subtitle={t('whenGoingSub')}>
                    <div className="flex gap-4" style={{ flexDirection: 'column' }}>
                        <div className="w-full">
                            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>{t('startDate')}</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>{t('endDate')}</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                            />
                        </div>
                    </div>
                </InputCard>

                {/* Card 3: Partners */}
                <InputCard number="3" title={t('whoComing')} subtitle={t('whoComingSub')}>
                    <div className="selection-grid" style={{ marginBottom: '1.5rem' }}>
                        {['Solo', 'Couple', 'Friends', 'Family', 'Seniors', 'Girls Trip'].map(type => (
                            <SelectableCard
                                key={type}
                                label={type}
                                selected={formData.partners === type}
                                onClick={() => handleInputChange('partners', type)}
                            />
                        ))}
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                            {t('exactTravelerCount') || 'Or enter exact number of travelers'}
                        </label>
                        <input
                            type="number"
                            min="1"
                            className="input-field"
                            style={{ maxWidth: '120px' }}
                            value={formData.travelerCount || 1}
                            onChange={(e) => handleInputChange('travelerCount', parseInt(e.target.value) || 1)}
                        />
                    </div>
                </InputCard>

                {/* Card 4: Mood */}
                <InputCard number="4" title={t('vibe')} subtitle={t('vibeSub')}>
                    <div className="selection-grid">
                        {[
                            { label: 'Chill 😌', value: 'chill' },
                            { label: 'Adventure 🏔️', value: 'adventure' },
                            { label: 'Party 🎉', value: 'party' },
                            { label: 'Romantic ❤️', value: 'romantic' },
                            { label: 'Exploration 🌍', value: 'exploration' }
                        ].map(mood => (
                            <SelectableCard
                                key={mood.value}
                                label={mood.label}
                                selected={formData.mood === mood.value}
                                onClick={() => handleInputChange('mood', mood.value)}
                            />
                        ))}
                    </div>
                </InputCard>

                {/* Card 5: Budget */}
                <InputCard number="5" title={t('budgetPref')} subtitle={t('budgetSub')}>
                    <div style={{ padding: '0 1rem' }}>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="1"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                        />
                        <div className="flex justify-between" style={{ marginTop: '1rem', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                            <span style={{ color: formData.budget === 1 ? 'var(--primary)' : '' }}>$ {t('low')}</span>
                            <span style={{ color: formData.budget === 2 ? 'var(--primary)' : '' }}>$$ {t('medium')}</span>
                            <span style={{ color: formData.budget === 3 ? 'var(--primary)' : '' }}>$$$ {t('premium')}</span>
                        </div>
                    </div>
                </InputCard>

                {/* Card 6: Interests */}
                <InputCard number="6" title={t('interests')} subtitle={t('interestsSub')}>
                    <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['Foodie 🍜', 'Shopping 🛍️', 'Nature 🌿', 'History 🏛️', 'Nightlife 🌃', 'Photography 📸', 'Art 🎨', 'Hidden Gems 💎'].map(pref => (
                            <FilterChip
                                key={pref}
                                label={pref}
                                selected={formData.preferences.includes(pref)}
                                onClick={() => toggleSelection('preferences', pref)}
                            />
                        ))}
                    </div>
                </InputCard>

                {/* Card 7: Constraints */}
                <InputCard number="7" title={t('constraints')} subtitle={t('constraintsSub')}>
                    <div className="flex flex-col gap-2">
                        {['Limited Walking', 'No Early Mornings', 'Avoid Crowds', 'Dietary Restrictions'].map(item => (
                            <CheckboxItem
                                key={item}
                                label={item}
                                checked={formData.constraints.includes(item)}
                                onChange={() => toggleSelection('constraints', item)}
                            />
                        ))}
                    </div>
                </InputCard>

                {/* Card 8: Safety & Comfort */}
                <InputCard number="8" title={t('safetyComfort')} subtitle={t('safetyComfortSub')}>
                    <div className="flex flex-col gap-2">
                        {['Prefer safe areas only', 'Women-friendly places', 'Emergency contacts needed'].map(item => (
                            <CheckboxItem
                                key={item}
                                label={item}
                                checked={formData.safety.includes(item)}
                                onChange={() => toggleSelection('safety', item)}
                            />
                        ))}
                    </div>
                </InputCard>

                <div className="flex justify-center" style={{ marginTop: '3rem' }}>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                        onClick={handleGenerate}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} /> {t('generating')}
                            </>
                        ) : (
                            `✨ ${t('generatePlan')}`
                        )}
                    </button>
                </div>
            </div >
        </div >
    );
};

const InputCard = ({ number, title, subtitle, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="card"
        style={{ marginBottom: '2rem' }}
    >
        <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
            <div className="form-step-number">{number}</div>
            <div>
                <h3>{title}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{subtitle}</p>
            </div>
        </div>
        <div style={{ marginLeft: '3.5rem' }}>{children}</div>
    </motion.div>
);

const SelectableCard = ({ label, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`selection-card ${selected ? 'selected' : ''}`}
    >
        {label}
    </div>
);

const FilterChip = ({ label, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`chip ${selected ? 'selected' : ''}`}
    >
        {label}
    </div>
);

const CheckboxItem = ({ label, checked, onChange }) => (
    <div
        onClick={onChange}
        className={`checkbox-row ${checked ? 'checked' : ''}`}
    >
        <div className="custom-checkbox">
            {checked && <Check size={14} strokeWidth={4} />}
        </div>
        <span>{label}</span>
    </div>
);

export default Onboarding;

