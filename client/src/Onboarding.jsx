import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        partners: '',
        mood: '',
        budget: 2,
        budgetSplit: 'equal',
        preferences: [],
        constraints: [],
        safety: []
    });

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
            alert("Please fill in the basics (Destination & Dates)!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
                <h2>Let's Plan Your Trip ✈️</h2>
                <p>Tell us a bit about your travel plans so AI can work its magic.</p>
            </header>

            <div className="input-container">
                {/* Card 1: Destination */}
                <InputCard number="1" title="Where to?" subtitle="City, Region, or Country">
                    <input
                        type="text"
                        placeholder="e.g., Kyoto, Japan"
                        className="input-field"
                        value={formData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                    />
                </InputCard>

                {/* Card 2: Dates */}
                <InputCard number="2" title="When are you going?" subtitle="We'll check for weekends & festivals.">
                    <div className="flex gap-4" style={{ flexDirection: 'column' }}>
                        <div className="w-full">
                            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>Start Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>End Date</label>
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
                <InputCard number="3" title="Who's coming with you?" subtitle="Helps suggest activities.">
                    <div className="selection-grid">
                        {['Solo', 'Couple', 'Friends', 'Family', 'Seniors', 'Girls Trip'].map(type => (
                            <SelectableCard
                                key={type}
                                label={type}
                                selected={formData.partners === type}
                                onClick={() => handleInputChange('partners', type)}
                            />
                        ))}
                    </div>
                </InputCard>

                {/* Card 4: Mood */}
                <InputCard number="4" title="What's the vibe?" subtitle="Personalize your style.">
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
                <InputCard number="5" title="Budget Preference" subtitle="Saving or Splurging?">
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
                            <span style={{ color: formData.budget === 1 ? 'var(--primary)' : '' }}>$ Low</span>
                            <span style={{ color: formData.budget === 2 ? 'var(--primary)' : '' }}>$$ Medium</span>
                            <span style={{ color: formData.budget === 3 ? 'var(--primary)' : '' }}>$$$ Premium</span>
                        </div>
                    </div>
                </InputCard>

                {/* Card 6: Interests */}
                <InputCard number="6" title="Interests" subtitle="Select all that apply.">
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
                <InputCard number="7" title="Constraints" subtitle="Any limitations?">
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
<<<<<<< HEAD
                <InputCard number="8" title="Safety & Comfort" subtitle="Optional but Powerful preferences.">
                    <div className="flex flex-col gap-2">
                        {[
                            'Prefer safe areas only',
                            'Women-friendly places',
                            'Emergency contacts needed'
                        ].map(item => (
=======
                <InputCard number="8" title="Safety & Comfort (Optional but Powerful)" subtitle="Your well-being matters.">
                    <div className="flex flex-col gap-2">
                        {['Prefer safe areas only', 'Women-friendly places', 'Emergency contacts needed'].map(item => (
>>>>>>> 632e7e0839e54373d54c1f10184d36216076e3be
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
                                <Loader2 className="animate-spin" size={20} /> Generating...
                            </>
                        ) : (
                            '✨ Generate My Plan'
                        )}
                    </button>
                </div>
            </div>
        </div>
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
