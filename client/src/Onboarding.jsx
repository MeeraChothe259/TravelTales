import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Smile, Wallet, Heart, AlertTriangle, Shield, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate();
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

    return (
        <div className="onboarding-container">
            <header className="section-header">
                <h1>Let's Plan Your Trip ✈️</h1>
                <p>Tell us a bit about your travel plans so AI can work its magic.</p>
            </header>

            <div className="max-w-3xl mx-auto">
                {/* Card 1: Destination */}
                <InputCard
                    number="1"
                    title="Where to?"
                    subtitle="City, Region, or Country"
                >
                    <input
                        type="text"
                        placeholder="e.g., Kyoto, Japan"
                        className="input-field"
                        value={formData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                    />
                </InputCard>

                {/* Card 2: Travel Dates */}
                <InputCard
                    number="2"
                    title="When are you going?"
                    subtitle="We'll check for weekends, festivals, & peak seasons."
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Start Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">End Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                            />
                        </div>
                    </div>
                </InputCard>

                {/* Card 3: Travel Partners */}
                <InputCard
                    number="3"
                    title="Who's coming with you?"
                    subtitle="This helps us suggest safe & fun activities."
                >
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
                <InputCard
                    number="4"
                    title="What's the vibe?"
                    subtitle="Personalize your itinerary style."
                >
                    <div className="selection-grid">
                        {[
                            { label: 'Chill 😌', value: 'chill' },
                            { label: 'Adventure 🏔️', value: 'adventure' },
                            { label: 'Spiritual 🛕', value: 'spiritual' },
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
                <InputCard
                    number="5"
                    title="Budget Preference"
                    subtitle="Are we saving or splurging?"
                >
                    <div className="px-2 mb-6">
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="1"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                        // The CSS for this is now handled by input[type=range] gloablly
                        />
                        <div className="flex justify-between mt-3 text-sm font-bold text-gray-600">
                            <span className={formData.budget === 1 ? "text-indigo-600" : ""}>$ Low</span>
                            <span className={formData.budget === 2 ? "text-indigo-600" : ""}>$$ Medium</span>
                            <span className={formData.budget === 3 ? "text-indigo-600" : ""}>$$$ Premium</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-sm font-medium text-gray-700">Split Bill?</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleInputChange('budgetSplit', 'equal')}
                                className={`split-btn ${formData.budgetSplit === 'equal' ? 'active' : ''}`}
                            >
                                Equal
                            </button>
                            <button
                                onClick={() => handleInputChange('budgetSplit', 'custom')}
                                className={`split-btn ${formData.budgetSplit === 'custom' ? 'active' : ''}`}
                            >
                                Custom
                            </button>
                        </div>
                    </div>
                </InputCard>

                {/* Card 6: Preferences */}
                <InputCard
                    number="6"
                    title="Interests"
                    subtitle="Select all that apply."
                >
                    <div className="flex flex-wrap gap-2">
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
                <InputCard
                    number="7"
                    title="Constraints"
                    subtitle="Any limitations we should know about?"
                >
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

                {/* Card 8: Safety */}
                <InputCard
                    number="8"
                    title="Safety & Comfort"
                    subtitle="Prioritize your peace of mind."
                >
                    <div className="flex flex-col gap-2">
                        {['Safe Areas Only', 'Women-Friendly', 'Near Medical Facilities', 'Need Emergency Contacts'].map(item => (
                            <CheckboxItem
                                key={item}
                                label={item}
                                checked={formData.safety.includes(item)}
                                onChange={() => toggleSelection('safety', item)}
                            />
                        ))}
                    </div>
                </InputCard>

                <div className="pt-8 flex justify-center pb-12">
                    <button
                        className="btn btn-primary"
                        style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                        onClick={() => console.log('Generating Plan...', formData)}
                    >
                        ✨ Generate My Plan
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
        transition={{ duration: 0.5 }}
        className="form-card"
    >
        <div className="card-header">
            <div className="step-number">{number}</div>
            <div>
                <h3>{title}</h3>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
        <div className="input-group">
            {children}
        </div>
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
    <button
        onClick={onClick}
        className={`chip ${selected ? 'selected' : ''}`}
    >
        {label}
    </button>
);

const CheckboxItem = ({ label, checked, onChange }) => (
    <div
        onClick={onChange}
        className={`checkbox-item ${checked ? 'checked' : ''}`}
    >
        <div className="checkbox-box">
            {checked && <Check size={14} color="white" strokeWidth={4} />}
        </div>
        <span>{label}</span>
    </div>
);

export default Onboarding;
