import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Compass, MapPin, Calendar, DollarSign, Users, Heart,
    Mountain, Palmtree, Building2, Utensils, Camera,
    Waves, Snowflake, Sun, Cloud, ArrowRight, ArrowLeft,
    Sparkles, Globe, Clock, ChevronRight
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

const DestinationDiscovery = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({
        vibe: null,
        climate: null,
        activities: [],
        pace: null,
        budget: null,
        duration: null,
        travelStyle: null,
        cuisine: null,
        season: null
    });

    const questions = [
        {
            id: 'vibe',
            title: "What's your travel vibe?",
            icon: Heart,
            options: [
                { value: 'adventure', label: 'Adventure & Thrill', icon: Mountain, color: '#EF4444' },
                { value: 'relaxation', label: 'Relaxation & Wellness', icon: Palmtree, color: '#10B981' },
                { value: 'culture', label: 'Culture & History', icon: Building2, color: '#8B5CF6' },
                { value: 'nature', label: 'Nature & Wildlife', icon: Waves, color: '#3B82F6' }
            ]
        },
        {
            id: 'climate',
            title: "What's your ideal climate?",
            icon: Sun,
            options: [
                { value: 'tropical', label: 'Tropical & Warm', icon: Sun, color: '#F59E0B' },
                { value: 'temperate', label: 'Mild & Pleasant', icon: Cloud, color: '#06B6D4' },
                { value: 'cold', label: 'Cool & Crisp', icon: Snowflake, color: '#6366F1' },
                { value: 'any', label: 'I\'m Flexible!', icon: Globe, color: '#8B5CF6' }
            ]
        },
        {
            id: 'activities',
            title: "What activities excite you? (Choose all that apply)",
            icon: Camera,
            multiple: true,
            options: [
                { value: 'hiking', label: 'Hiking & Trekking', icon: Mountain },
                { value: 'beach', label: 'Beach & Water Sports', icon: Waves },
                { value: 'food', label: 'Food & Culinary Tours', icon: Utensils },
                { value: 'photography', label: 'Photography & Sightseeing', icon: Camera },
                { value: 'shopping', label: 'Shopping & Markets', icon: Building2 },
                { value: 'nightlife', label: 'Nightlife & Entertainment', icon: Sparkles }
            ]
        },
        {
            id: 'pace',
            title: "What's your preferred travel pace?",
            icon: Clock,
            options: [
                { value: 'fast', label: 'Fast-Paced - See Everything!', color: '#EF4444' },
                { value: 'moderate', label: 'Balanced - Mix of Both', color: '#F59E0B' },
                { value: 'slow', label: 'Slow Travel - Deep Immersion', color: '#10B981' }
            ]
        },
        {
            id: 'budget',
            title: "What's your budget range per day?",
            icon: DollarSign,
            options: [
                { value: 1, label: 'Budget ($50-100/day)', color: '#10B981' },
                { value: 2, label: 'Moderate ($100-250/day)', color: '#F59E0B' },
                { value: 3, label: 'Luxury ($250+/day)', color: '#8B5CF6' }
            ]
        },
        {
            id: 'duration',
            title: "How long do you want to travel?",
            icon: Calendar,
            options: [
                { value: 'weekend', label: '2-3 Days (Weekend)', days: 3 },
                { value: 'week', label: '5-7 Days (Week)', days: 7 },
                { value: 'extended', label: '10-14 Days (Extended)', days: 14 },
                { value: 'flexible', label: 'Flexible / Not Sure', days: 7 }
            ]
        }
    ];

    const currentQuestion = questions[step];

    const handleAnswer = (value) => {
        if (currentQuestion.multiple) {
            const current = answers[currentQuestion.id] || [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            setAnswers({ ...answers, [currentQuestion.id]: updated });
        } else {
            setAnswers({ ...answers, [currentQuestion.id]: value });
            // Auto-advance for single choice
            setTimeout(() => {
                if (step < questions.length - 1) {
                    setStep(step + 1);
                }
            }, 300);
        }
    };

    const getDestinationSuggestions = () => {
        const { vibe, climate, activities, budget } = answers;

        const destinations = [
            {
                name: 'Bali, Indonesia',
                match: ['relaxation', 'tropical', 'beach', 'food'],
                budgetFit: [1, 2],
                description: 'Tropical paradise with stunning beaches, rice terraces, and spiritual temples',
                bestFor: 'Beach lovers, wellness seekers, and culture enthusiasts',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop'
            },
            {
                name: 'Tokyo, Japan',
                match: ['culture', 'temperate', 'food', 'photography', 'shopping'],
                budgetFit: [2, 3],
                description: 'Ultra-modern metropolis blending ancient traditions with cutting-edge technology',
                bestFor: 'Food lovers, tech enthusiasts, and culture explorers',
                image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop'
            },
            {
                name: 'Patagonia, Argentina',
                match: ['adventure', 'cold', 'hiking', 'nature'],
                budgetFit: [2, 3],
                description: 'Breathtaking landscapes with glaciers, mountains, and pristine wilderness',
                bestFor: 'Adventure seekers, hikers, and nature photographers',
                image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop'
            },
            {
                name: 'Barcelona, Spain',
                match: ['culture', 'temperate', 'food', 'beach', 'nightlife'],
                budgetFit: [2, 3],
                description: 'Vibrant coastal city with stunning architecture, beaches, and world-class cuisine',
                bestFor: 'Art lovers, foodies, and beach enthusiasts',
                image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop'
            },
            {
                name: 'Chiang Mai, Thailand',
                match: ['culture', 'tropical', 'food', 'nature'],
                budgetFit: [1, 2],
                description: 'Ancient city surrounded by mountains, temples, and lush jungles',
                bestFor: 'Budget travelers, digital nomads, and culture seekers',
                image: 'https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800&auto=format&fit=crop'
            },
            {
                name: 'Iceland',
                match: ['adventure', 'cold', 'nature', 'photography'],
                budgetFit: [2, 3],
                description: 'Land of fire and ice with waterfalls, glaciers, and Northern Lights',
                bestFor: 'Adventure lovers, photographers, and nature enthusiasts',
                image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&auto=format&fit=crop'
            },
            {
                name: 'Lisbon, Portugal',
                match: ['culture', 'temperate', 'food', 'photography'],
                budgetFit: [1, 2],
                description: 'Charming coastal capital with colorful streets, historic trams, and amazing food',
                bestFor: 'Budget-conscious travelers, foodies, and history buffs',
                image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop'
            },
            {
                name: 'New Zealand',
                match: ['adventure', 'temperate', 'hiking', 'nature'],
                budgetFit: [2, 3],
                description: 'Stunning landscapes from mountains to beaches, perfect for outdoor adventures',
                bestFor: 'Adventure seekers, Lord of the Rings fans, and nature lovers',
                image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&auto=format&fit=crop'
            },
            {
                name: 'Morocco',
                match: ['culture', 'any', 'food', 'shopping', 'photography'],
                budgetFit: [1, 2],
                description: 'Exotic blend of Arab, Berber, and European cultures with vibrant markets',
                bestFor: 'Culture enthusiasts, foodies, and market explorers',
                image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&auto=format&fit=crop'
            },
            {
                name: 'Costa Rica',
                match: ['adventure', 'tropical', 'nature', 'beach'],
                budgetFit: [2],
                description: 'Eco-paradise with rainforests, volcanoes, and pristine beaches',
                bestFor: 'Nature lovers, adventure seekers, and eco-tourists',
                image: 'https://images.unsplash.com/photo-1621894468089-e2a1e8c1a7c8?w=800&auto=format&fit=crop'
            }
        ];

        // Score each destination
        const scored = destinations.map(dest => {
            let score = 0;

            // Match vibe
            if (dest.match.includes(vibe)) score += 3;

            // Match climate
            if (dest.match.includes(climate) || climate === 'any') score += 2;

            // Match activities
            const activityMatches = (activities || []).filter(a => dest.match.includes(a)).length;
            score += activityMatches * 2;

            // Match budget
            if (dest.budgetFit.includes(budget)) score += 2;

            return { ...dest, score };
        });

        // Sort by score and return top 3
        return scored.sort((a, b) => b.score - a.score).slice(0, 3);
    };

    const handleComplete = () => {
        const suggestions = getDestinationSuggestions();
        navigate('/destination-results', { state: { answers, suggestions } });
    };

    const progress = ((step + 1) / questions.length) * 100;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ maxWidth: '900px', width: '100%' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}
                >
                    <Compass size={48} style={{ marginBottom: '1rem' }} />
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
                        Discover Your Perfect Destination
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '0.5rem' }}>
                        Answer a few questions and we'll find your ideal travel spot
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    height: '8px',
                    marginBottom: '2rem',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        style={{
                            height: '100%',
                            background: 'white',
                            borderRadius: '10px'
                        }}
                    />
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '3rem',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            {React.createElement(currentQuestion.icon, { size: 32, color: '#667eea' })}
                            <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#1F2937' }}>
                                {currentQuestion.title}
                            </h2>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: currentQuestion.multiple ? 'repeat(auto-fit, minmax(200px, 1fr))' : 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1rem',
                            marginBottom: '2rem'
                        }}>
                            {currentQuestion.options.map((option) => {
                                const isSelected = currentQuestion.multiple
                                    ? (answers[currentQuestion.id] || []).includes(option.value)
                                    : answers[currentQuestion.id] === option.value;

                                return (
                                    <motion.button
                                        key={option.value}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswer(option.value)}
                                        style={{
                                            padding: '1.5rem',
                                            borderRadius: '15px',
                                            border: isSelected ? '3px solid #667eea' : '2px solid #E5E7EB',
                                            background: isSelected ? '#F3F4F6' : 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s',
                                            position: 'relative'
                                        }}
                                    >
                                        {option.icon && React.createElement(option.icon, {
                                            size: 32,
                                            color: option.color || '#667eea'
                                        })}
                                        <span style={{
                                            fontWeight: isSelected ? 'bold' : '600',
                                            color: '#1F2937',
                                            textAlign: 'center'
                                        }}>
                                            {option.label}
                                        </span>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    background: '#667eea',
                                                    borderRadius: '50%',
                                                    width: '24px',
                                                    height: '24px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                ✓
                                            </motion.div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Navigation Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                            <button
                                onClick={() => setStep(Math.max(0, step - 1))}
                                disabled={step === 0}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: step === 0 ? '#E5E7EB' : '#667eea',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: step === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    opacity: step === 0 ? 0.5 : 1
                                }}
                            >
                                <ArrowLeft size={20} /> Back
                            </button>

                            {step === questions.length - 1 ? (
                                <button
                                    onClick={handleComplete}
                                    style={{
                                        padding: '0.75rem 2rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    <Sparkles size={20} /> See My Destinations
                                </button>
                            ) : (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    disabled={currentQuestion.multiple && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: '#667eea',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        opacity: (currentQuestion.multiple && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0)) ? 0.5 : 1
                                    }}
                                >
                                    Next <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Step Indicator */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '2rem'
                }}>
                    {questions.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: index <= step ? 'white' : 'rgba(255,255,255,0.3)',
                                transition: 'all 0.3s'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DestinationDiscovery;
