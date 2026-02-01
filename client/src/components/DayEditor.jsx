import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, MapPin, Clock, DollarSign, Search, Loader, Check } from 'lucide-react';

const DayEditor = ({ day, dayNumber, onSave, onClose, budget, preferences }) => {
    // Parse existing day slots into an array if activities array doesn't exist
    const initializeActivities = () => {
        if (day?.activities) return day.activities;

        const slots = [
            { key: 'wakeup', label: 'Morning Routine' },
            { key: 'breakfast', label: 'Breakfast' },
            { key: 'morning', label: 'Morning' },
            { key: 'lunch', label: 'Lunch' },
            { key: 'afternoon', label: 'Afternoon' },
            { key: 'evening', label: 'Evening' },
            { key: 'dinner', label: 'Dinner' }
        ];

        return slots
            .map(slot => day[slot.key] ? { ...day[slot.key], _originalSlot: slot.key } : null)
            .filter(Boolean);
    };

    const [activities, setActivities] = useState(initializeActivities());
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [generatingActivity, setGeneratingActivity] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');

    // Debounced location search
    useEffect(() => {
        if (searchQuery.length < 3) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoadingSuggestions(true);
            try {
                // Get proximity from first activity if available
                const proximity = activities[0]?.coords
                    ? `${activities[0].coords.lng},${activities[0].coords.lat}`
                    : '';

                const response = await fetch(
                    `/api/location-autocomplete?query=${encodeURIComponent(searchQuery)}&proximity=${proximity}`
                );
                const data = await response.json();

                if (data.success) {
                    setSuggestions(data.suggestions);
                }
            } catch (error) {
                console.error('Location search failed:', error);
            } finally {
                setLoadingSuggestions(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, activities]);

    const handleAddActivity = async (location) => {
        setGeneratingActivity(true);
        setSuggestions([]);
        setSearchQuery('');

        try {
            const response = await fetch('/api/generate-activity-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location,
                    timeSlot: selectedTimeSlot,
                    budget,
                    preferences
                })
            });

            const data = await response.json();

            if (data.success) {
                setActivities([...activities, data.activity]);
            }
        } catch (error) {
            console.error('Activity generation failed:', error);
        } finally {
            setGeneratingActivity(false);
        }
    };

    const handleDeleteActivity = (index) => {
        setActivities(activities.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({ ...day, activities });
    };

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
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '2rem'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    maxWidth: '900px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>
                        Edit Day {dayNumber}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            display: 'flex'
                        }}
                    >
                        <X size={24} color="#64748b" />
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
                    {/* Add Activity Section */}
                    <div style={{
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        background: '#f8fafc',
                        borderRadius: '16px',
                        border: '2px dashed #cbd5e1'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', color: '#475569' }}>
                            <Plus size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Add New Activity
                        </h3>

                        {/* Time Slot Selector */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }}>
                                Time Slot
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {['morning', 'afternoon', 'evening'].map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedTimeSlot(slot)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            border: selectedTimeSlot === slot ? '2px solid #6366f1' : '1px solid #e2e8f0',
                                            background: selectedTimeSlot === slot ? '#eef2ff' : 'white',
                                            color: selectedTimeSlot === slot ? '#6366f1' : '#64748b',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Search */}
                        <div style={{ position: 'relative', zIndex: 20 }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for a location or activity..."
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.95rem'
                                    }}
                                />
                                {loadingSuggestions && (
                                    <Loader size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} className="spin" />
                                )}
                            </div>

                            {/* Suggestions Dropdown */}
                            {suggestions.length > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    marginTop: '0.5rem',
                                    background: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    border: '1px solid #e2e8f0',
                                    maxHeight: '300px',
                                    overflow: 'auto',
                                    zIndex: 10
                                }}>
                                    {suggestions.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAddActivity(suggestion)}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                border: 'none',
                                                borderBottom: idx < suggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                                                background: 'none',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem'
                                            }}
                                        >
                                            <MapPin size={16} color="#6366f1" />
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.95rem' }}>
                                                    {suggestion.name}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                    {suggestion.fullName}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {generatingActivity && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: '#eef2ff',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                color: '#6366f1'
                            }}>
                                <Loader size={18} className="spin" />
                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Generating activity details...</span>
                            </div>
                        )}
                    </div>

                    {/* Activities List */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#475569' }}>
                            Activities ({activities.length})
                        </h3>

                        {activities.length === 0 ? (
                            <div style={{
                                padding: '3rem',
                                textAlign: 'center',
                                color: '#94a3b8',
                                background: '#f8fafc',
                                borderRadius: '12px'
                            }}>
                                No activities yet. Add some using the search above!
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {activities.map((activity, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            padding: '1.5rem',
                                            background: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '16px',
                                            position: 'relative'
                                        }}
                                    >
                                        <button
                                            onClick={() => handleDeleteActivity(idx)}
                                            style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                right: '1rem',
                                                background: '#fee2e2',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '0.5rem',
                                                cursor: 'pointer',
                                                display: 'flex'
                                            }}
                                        >
                                            <Trash2 size={16} color="#dc2626" />
                                        </button>

                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#1e293b', paddingRight: '3rem' }}>
                                            {activity.title}
                                        </h4>
                                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#64748b' }}>
                                            {activity.description}
                                        </p>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1' }}>
                                                <Clock size={14} />
                                                <span>{activity.time} • {activity.duration}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                                                <DollarSign size={14} />
                                                <span>{activity.cost}</span>
                                            </div>
                                            {activity.coords && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                                                    <MapPin size={14} />
                                                    <span>Located</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            background: 'white',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: '#6366f1',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Check size={18} />
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DayEditor;
