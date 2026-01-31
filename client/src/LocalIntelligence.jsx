import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Bus, User, Star, Phone, CheckCircle, Leaf, DollarSign } from 'lucide-react';
import './LocalIntelligence.css';

const LocalIntelligence = ({ data }) => {
    const [activeTab, setActiveTab] = useState('food');

    if (!data) return null;

    const showContact = (name) => {
        // Dummy phone number generator based on name length to ensure it's "stable" for the demo
        const dummyNum = `+1 555-${name.length.toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000)}`;
        alert(`📞 Contact for ${name}:\n${dummyNum}`);
    };

    const renderFood = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intel-content">
            <h4 style={{ marginBottom: '1rem' }}>🍛 Local Specialties</h4>
            <div className="flex flex-wrap gap-2 mb-4">
                {data.food.specialties.map(item => (
                    <span key={item} className="chip badge-primary">{item}</span>
                ))}
            </div>

            <h4 style={{ marginBottom: '1rem' }}>🍽️ Recommended Spots</h4>
            <div className="intel-grid">
                {data.food.restaurants.map((rest, i) => (
                    <div key={i} className="intel-card">
                        <div className="flex justify-between items-start">
                            <strong>{rest.name}</strong>
                            <div className="flex gap-2">
                                <button onClick={() => showContact(rest.name)} className="icon-btn-small" title="Call Restaurant">
                                    <Phone size={14} />
                                </button>
                                <span className="text-sm text-green-600 font-bold">{rest.price}</span>
                            </div>
                        </div>
                        <p className="text-grey text-sm">{rest.type}</p>
                        <div className="flex gap-1 mt-2">
                            {rest.tags.map(t => <span key={t} className="tag tag-xs">{t}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderTransport = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intel-content">
            <div className="intel-grid">
                <div className="intel-card">
                    <h4>🚌 Routes</h4>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                        {data.transport.routes.map(r => <li key={r}>{r}</li>)}
                    </ul>
                </div>
                <div className="intel-card">
                    <h4>🎫 Passes</h4>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                        {data.transport.passes.map(p => <li key={p}>{p}</li>)}
                    </ul>
                </div>
            </div>
            <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>📞 Key Contacts</h4>
            <div className="flex gap-4">
                {data.transport.contacts.map(c => (
                    <div key={c.name} className="contact-pill">
                        <Phone size={14} /> <strong>{c.type}:</strong> {c.name}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderGuides = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intel-content">
            <div className="intel-grid">
                {data.guides.map((guide, i) => (
                    <div key={i} className="intel-card flex items-center gap-3">
                        <div className="avatar-placeholder"><User size={20} /></div>
                        <div>
                            <div className="flex items-center gap-2">
                                <strong>{guide.name}</strong>
                                <span className="flex items-center text-xs text-yellow-500 font-bold">
                                    <Star size={12} fill="currentColor" /> {guide.rating}
                                </span>
                            </div>
                            <p className="text-sm text-grey">{guide.specialty}</p>
                            <p className="text-xs text-grey mt-1">🗣️ {guide.languages.join(', ')}</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <button onClick={() => showContact(guide.name)} className="icon-btn-small" title="Contact Guide">
                                <Phone size={16} className="text-blue-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="card local-intel-container" style={{ padding: '0' }}>
            <div className="intel-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <h3 style={{ margin: 0 }}>🧠 Local Intelligence</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Insider tips for {data.destination || 'your trip'}</p>
            </div>

            <div className="intel-tabs">
                <button className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`} onClick={() => setActiveTab('food')}>
                    <Utensils size={16} /> Food
                </button>
                <button className={`tab-btn ${activeTab === 'transport' ? 'active' : ''}`} onClick={() => setActiveTab('transport')}>
                    <Bus size={16} /> Transport
                </button>
                <button className={`tab-btn ${activeTab === 'guides' ? 'active' : ''}`} onClick={() => setActiveTab('guides')}>
                    <User size={16} /> Guides
                </button>
            </div>

            <div className="intel-body" style={{ padding: '1.5rem' }}>
                {activeTab === 'food' && renderFood()}
                {activeTab === 'transport' && renderTransport()}
                {activeTab === 'guides' && renderGuides()}
            </div>
        </div>
    );
};

export default LocalIntelligence;
